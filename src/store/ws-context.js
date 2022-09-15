import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { rightDrawerActions } from "../store/rightdrawer_slice";
import { canvasActions } from "../store/canvas_slice";
import { messageDrawerActions } from "../store/messagedrawer_slice";
import { workplanActions } from './workplan-slice';
import fetchScreenParams from '../utils/screenparams';
import config from '../config/config.json'
import { leftDrawerActions } from './leftdrawer_slice';



const WSContext = React.createContext(false, null, () => { });

const socket = new WebSocket("ws://127.0.0.1:" + config.MainPlatform.ServerPort);

export const WSContextProvider = (props) => {

    console.log("WSContextProvider Ran")

    // const socket = useContext(WSContext);

    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState(null);

    const ws = useRef(null);

    const tree = useSelector((state) => state.rightSlide.tree);
    const dispatch = useDispatch();
    console.log("May be creating new socket object");
    // const socket = useMemo(() => new WebSocket("ws://127.0.0.1:" + config.MainPlatform.ServerPort), []);
    ws.current = socket;

    useEffect(() => {
        console.log("WSContext UseEFFECT ran for OnOpen, onClose and onError events")

        socket.onopen = e => {
            console.log("[open] Connection established with Server");

            const msgObj = {
                type: 'identification',
                value: {
                    sender: 'InteractionUI',
                    receiver: 'Server',
                    context: 'Store my connection',
                    payload: ''
                }
            };
            socket.send(JSON.stringify(msgObj));

            // socket.send("InteractionUI")
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

    }, []);

    useEffect(() => {
        console.log("WSContext UseEFFECT Ran for OnMessage events")
        socket.onmessage = event => {
            let msgOBJ = JSON.parse(event.data);

            switch (msgOBJ.type) {

                case "requestScreenParams":
                    // socket.send(fetchScreenParams());
                    console.log("Received request for screen params but not sending temporarily")
                    break;

                case "tree-status-change":
                    // console.log("Tree Status change message received");
                    const updateTreeElement = (t, key, state) => {
                        let element;
                        // Loop through each element in the tree
                        for (let e of t) {
                            if (e.key == key) {
                                // If key found, update the state
                                // console.log("YIPEEE! Key found 1")
                                return e.state = state;
                            }
                            if (e.items.length > 0) {
                                // Recursive function (Calls itself if there are sub elements)
                                element = updateTreeElement(e.items, key, state);
                                if (!element == undefined) {
                                    // If key found, update the state
                                    // console.log("YIPEEE! Key found 2")
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

                    console.log(tempTree);

                    // Update the original tree with the tempTree
                    dispatch(rightDrawerActions.setTree(tempTree));

                    break;
                case "left-drawer-populate":
                    // only accept the production task names/id here, 
                    // its much easier for the MR model to then fetch the processes and
                    // syntatically make it compatible in JS notation than to do the 
                    // pre-preprocessing in JAVA by the agent (i guess, lets see 13.09)

                    let prodTask = msgOBJ.productionTask;

                    dispatch(leftDrawerActions.setProductionTask(prodTask));


                    
                    break;
                case "canvas-polygon-drawing":
                    console.log("Received Canvas Message");
                    dispatch(canvasActions.handleInput(msgOBJ.values));

                    break;
                case "configData":
                    // setConfig2(msgOBJ); // Configure UI via socket
                    break;
                case "im-message":
                    console.log("Interaction Message Receieved", msgOBJ)
                    dispatch(messageDrawerActions.setImData(msgOBJ));
                    dispatch(messageDrawerActions.open());
                    break;


            }
            // console.log("Message Received: ", msgOBJ); //intentionally at the end
        };
    }, [tree])



    const ret = [isOpen, msg, ws.current];

    return <WSContext.Provider value={ret}> {props.children} </WSContext.Provider>
}


export default WSContext;