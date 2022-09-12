import './TreesDropDown.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rightDrawerActions } from '../../store/rightdrawer_slice';
import WSContext from '../../store/ws-context';
import config from '../../config/config.json'
import { getBasicSelectWithIDQuery } from '../../utils/SPARQLQueryBuilder';
import { pnml } from '../../config/case';
import PnmlImporter from '../../utils/pm4js/importer/importer';
import { PetriNetTransition, PetriNetArc, PetriNetPlace } from '../../utils/pm4js/petri_net';


const TreesDropDown = () => {
  const height = useSelector((state) => state.config.treeView.height);
  const dispatch = useDispatch();
  const [treeList, setTreeList] = useState();
  const [treeOptions, setTreeOptions] = useState();
  const [selectedId, setSelectedId] = useState(1);
  const [isReady, , socket] = useContext(WSContext);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (isReady) {
      console.log("[Product WorkPlan] Fetching ... ");

      setError(null); //TODO: take care of errors in this block later

      const sendRequest = async () => {
        const url = new URL("http://" + config.KBEPlatform.IP + ":" + config.KBEPlatform.KBPort + "/ds/query");
        const params = { 'query': getBasicSelectWithIDQuery('*', '?s', 'a', 'camo:ProductWorkPlan'), 'default-graph-uri': encodeURI(config.KBEPlatform.KBGraphURI) }
        url.search = new URLSearchParams(params).toString();
        const options = {
          method: 'POST',
          // mode: 'no-cors',
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          // body: params
        }
        const response = await fetch(url, options);
        console.log("response", response)
        const data = await response.json();
        console.log("results", data.results)
        const workplans = data.results.bindings.map((workplan) => {
          return {
            id: workplan.id.value,  // replace by proper ID from KB
            title: workplan.s.value.split('#').slice(-1)[0].replaceAll('_', ' ') // TODO: outsource this to a utility function
          }
        })
        workplans.unshift({
          id: Math.random(),
          title: "Select Work Plan"
        })
        setTreeList(workplans)

      }

      sendRequest();

    }
    // Deprected websocket approach
    //   const msgObj = {
    //     type: 'agent_communication',
    //     value: {
    //       sender: 'operator',
    //       receiver: 'NXAgent',
    //       context: 'product workplan',
    //     }
    //   };
    //   socket.send(JSON.stringify(msgObj));
    // }

    // else {
    //   console.log("[Product WorkPlan] Socket Not Ready")
    // }
    // const tree = [
    //   {id: "1", title: "Tree #1"},
    //   {id: "2", title: "Tree #2"},
    //   {id: "3", title: "Tree #3"}
    // ]

    // setTreeList (tree);
  }, [isReady, socket])

  useEffect(() => {
    if (treeList == undefined) {
      setTreeOptions(<></>)
    } else {
      setTreeOptions(
        treeList.map(tree => <option key={tree.id} className="tree-option" value={tree.id}>{tree.title}</option>
        )
      );
    }
  }, [treeList])

  const onSelectChange = (e) => {
    console.log("Selected ID", e.target.value)
    setSelectedId(e.target.value);
  }

  useEffect(() => {
    // Based on the selected Product Workplan, send request for production plan in PNML, 
    // parse it and update the tree

    const parser = new DOMParser();
    setError(null);

    const fetchProductionTasks = () => {
      let t = [];
      fetch('http://127.0.0.1:3005/' + selectedId, {
        method: 'GET',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
      }).then((response) => {
        if (response.ok) {
          return response.text()
        }
        throw new Error('Error fetching')
      }).then((response) => {
        // console.log(response);

        let acceptingPetriNet = PnmlImporter.apply(response);
        console.log(acceptingPetriNet.im.getEnabledTransitions());
        console.log(acceptingPetriNet.im.getEnabledTransitions()[0].getPostMarking());
        let enabledTransitions = acceptingPetriNet.im.getEnabledTransitions();

        let tempArr = [];
        let tempArr2 = [];

        function createObj(PNObj) {
          if (PNObj instanceof PetriNetTransition) {
            let outArcs = PNObj.outArcs; 
            let noOutArcs = Object.entries(outArcs).length;

            for (const [index, [arcKey,]] of Object.entries(Object.entries(outArcs))) {
              let term = createObj(outArcs[arcKey]);

              let obj = { name: PNObj.label, key: PNObj.name, state: "initial" }

              if ((parseInt(index) + 1) == noOutArcs) { // no more parallel arcs

                if (term != null) tempArr2.push(term);

                let ret;

                if (noOutArcs > 1) { // if this was a transition with multiple branches
                  ret = { ...obj, items: [...tempArr, ...tempArr2] };
                }
                else {
                  ret = { ...obj, items: tempArr2 }
                }
                tempArr2 = [];
                return ret;
              }

              else {  // more parallel arcs to traverse
                tempArr.push(term);
              }
            }
          }

          else if (PNObj instanceof PetriNetArc) {
            let term = false;
            let connNode = PNObj.target;
            term = createObj(connNode);
            return term;
          }

          else if (PNObj instanceof PetriNetPlace) {
            let term = false;
            let outArcs = PNObj.outArcs;
            let noOutArcs = Object.entries(outArcs).length;

            if (noOutArcs > 0) { // not terminal place
              for (const arcKey of Object.keys(outArcs)) {
                term = createObj(outArcs[arcKey]);
                return term;
              }
            }

            else {
              return null;
            }
          }
        }

        for (const transition of enabledTransitions) {
          t.push(createObj(transition));
        }

        dispatch(rightDrawerActions.setTree(t));

      }).catch(error => console.log(error))
    }
    fetchProductionTasks();

    dispatch(rightDrawerActions.setTree([]));
  }, [selectedId])

  const onRequestCollaborationHandler = () => {
      
    const msgObj = {
        type: 'agent_communication',
        value: {
          sender: 'Operator',
          receiver: 'Robot',
          communicativeAct: "REQUEST",
          context: 'Request Collaborative Assembly',
          payload: selectedId
        }
      };
      socket.send(JSON.stringify(msgObj));
    

  }

  return (
    <div className="trees-dropdown-container" style={{
      height: (100 - height) + "%"
    }}>
      <select onChange={onSelectChange} value={selectedId} className="trees-dropdown" name="trees">
        {treeOptions}
      </select>
      <button className="button" onClick={onRequestCollaborationHandler}>Request Collaborative Assembly</button>
    </div>
  )
}

export default TreesDropDown;