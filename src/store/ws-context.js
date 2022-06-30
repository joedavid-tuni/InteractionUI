import React, { useContext, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { rightDrawerActions } from "../store/rightdrawer_slice";
import { canvasActions } from "../store/canvas_slice";
import { messageDrawerActions } from "../store/messagedrawer_slice";
import { workplanActions } from './workplan-slice';
import fetchScreenParams from '../utils/screenparams';


const WSContext = React.createContext(false, null, () => { });

console.log("Context Ran")

export const WSContextProvider = (props) => {

    // const socket = useContext(WSContext);

    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState(null);

    const ws = useRef(null);

    const tree = useSelector((state) => state.rightSlide.tree);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Running UseEFFECT")
        const socket = new WebSocket("ws://127.0.0.1:8887");



        socket.onopen = e => {
            console.log("[open] Connection established with Server");
            setIsOpen(true);
        };

        socket.onclose = event => {
            if (event.wasClean) {
                alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                alert('[close] Connection died');
            }
            setIsOpen(false);
        };

        socket.onerror = error => {
            alert(`[error] ${error.message}`);
        };

        socket.onmessage = event => {
            let msgOBJ = JSON.parse(event.data);
            console.log("Message Received")

            switch (msgOBJ.type) {
                case "requestScreenParams":
                    socket.send(fetchScreenParams());

                    return;
                case "tree-status-change":
                    const updateTreeElement = (t, key, state) => {
                        let element;
                        // Loop through each element in the tree
                        for (let e of t) {
                            if (e.key === key) {
                                // If key found, update the state
                                return e.state = state;
                            }
                            if (!e.items === undefined) {
                                // Recursive function (Calls itself if there are sub elements)
                                element = updateTreeElement(e.items, key, state);
                                if (!element === undefined) {
                                    // If key found, update the state
                                    return element.state = state;
                                }
                            }
                        }
                    }

                    // Create a copy of the current tree
                    let tempTree = JSON.parse(JSON.stringify(tree));

                    // Update a single element in the tempTree
                    // msgOBJ.key = The unique key of the element to be updated
                    // msgOBJ.state = The updated version of the selected element
                    updateTreeElement(tempTree, msgOBJ.key, msgOBJ.state);

                    // Update the original tree with the tempTree
                    dispatch(rightDrawerActions.setTree(tempTree));

                    return;
                case "canvas-polygon-drawing":
                    console.log("Received Canvas Message");
                    dispatch(canvasActions.handleInput(msgOBJ.values));

                    return;
                case "configData":
                    // setConfig2(msgOBJ); // Configure UI via socket
                    return;
                case "im-message":
                    dispatch(messageDrawerActions.setImData(msgOBJ));
                    dispatch(messageDrawerActions.open());
                    return;

                case "workplans":
                    dispatch(workplanActions.setWorkplan(msgOBJ.values))

            }
            console.log(msgOBJ)
        };

        ws.current = socket;



        // return () => {
        //     socket.close();
        // };

    }, [])



    const ret = [isOpen, msg, ws.current];

    return <WSContext.Provider value={ret}> {props.children} </WSContext.Provider>
}


export default WSContext;