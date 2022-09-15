import './TreesDropDown.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { leftDrawerActions } from '../../store/leftdrawer_slice';
import WSContext from '../../store/ws-context';
import config from '../../config/config.json'
import { getIDofProcessPlanOfProductionTask, getCurrentProductionTasksQuery } from '../../utils/SPARQLQueryBuilder';
import { pnml } from '../../config/case';
import PnmlImporter from '../../utils/pm4js/importer/importer';
import { PetriNetTransition, PetriNetArc, PetriNetPlace } from '../../utils/pm4js/petri_net';


const TreesDropDown = () => {
  const height = useSelector((state) => state.config.treeView.height);
  const dispatch = useDispatch();
  const productionTask = useSelector((state) => state.leftSlide.productionTask);
  const [productionTasksList, setProductionTasksList] = useState([])
  const [treeOptions, setTreeOptions] = useState();
  // const [selectedId, setSelectedId] = useState(1);
  const [isReady, , socket] = useContext(WSContext);
  const [error, setError] = useState(null);

  const fetchProductionTasks = async () => {
    let currentTasks = [];
    const url = new URL("http://" + config.MainPlatform.IP + ":" + config.MainPlatform.OperatorFuseki + "/ds/query");
    const params = { 'query': getCurrentProductionTasksQuery() }
    url.search = new URLSearchParams(params).toString();
    const options = {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      // body: params
    }
    // console.log(getCurrentProductionTasksQuery());
    const response = await fetch(url, options);
    // console.log("DEBUg", response)
    const data = await response.json();
    // console.log("DEBUg", data.results)
    if (data.results.bindings.length == 0) {
      setProductionTasksList([{ id: 1, task: "No Tasks" }]);
    }
    else {
      data.results.bindings.map((task) => {
        currentTasks.push({
          id: task.id.value,
          task: task.task1.value.split('#').slice(-1)[0]
        })
        // console.log("list debug", currentTasks)
        currentTasks.unshift({
          id: "123456",
          task: "None Selected"
        })
        setProductionTasksList(currentTasks);
      })
    }
  }

  useEffect(() => {
    // if (productionTasksList.title == "None") {
    //   setTreeOptions(<></>)
    // } else {
    // console.log("Debug chaning options")
    setTreeOptions(
      // TODO:
      productionTasksList.map(tree => <option key={tree.id} className="tree-option-left" value={tree.id}>{tree.task}</option>
      )
    );
    console.log(treeOptions)
    // }
  }, [productionTasksList])

  useEffect(() => {
    if (isReady) {
      // setTreeList([{ id: Math.random(),title: "None"}])
      setError(null);
      fetchProductionTasks();
    }
  }, [isReady, socket])

  function createObj(PNObj) {
    let tempArr = [];
    let tempArr2 = [];
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

  // TODO: fetch the proces plan for the production task and set productionTasksList
  useEffect(() => {
    // fetch ID/name from KB
    console.log("Fetching plans for productionTask " , productionTask)

    const sendRequest = async () => {

      // 1. fetch process plan id from KB

      console.log("Fetching ID of production Task", getIDofProcessPlanOfProductionTask(productionTask.task))
      const url = new URL("http://" + config.MainPlatform.IP + ":" + config.MainPlatform.OperatorFuseki + "/ds/query");
      const params = { 'query': getIDofProcessPlanOfProductionTask(productionTask.task) }
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
      const data = await response.json();
      console.log(data)
      const id = data.results.bindings[0].ppid.value; //directly grab the first element as you are expectuing one UID





      // fetch plan from rest server

      const response2 = await fetch('http://127.0.0.1:3005/' + id, {
        method: 'GET',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      });

      const data2 = await response2.text();
      let t = [];

      console.log(data2);

      let acceptingPetriNet = PnmlImporter.apply(data2);
      console.log(acceptingPetriNet.im.getEnabledTransitions());
      console.log(acceptingPetriNet.im.getEnabledTransitions()[0].getPostMarking());
      let enabledTransitions = acceptingPetriNet.im.getEnabledTransitions();

      for (const transition of enabledTransitions) {
        t.push(createObj(transition));
      }

      dispatch(leftDrawerActions.setProcessPlan(t));

      // console.log(response);

      // TODO: Transform proces plan to tree
    }

    // fetch plan from rest server
    if (productionTask.task != "None Selected") {
      sendRequest();
      
    }

    else{
      dispatch(leftDrawerActions.setProcessPlan([]))
    }


  }, [productionTask])





  // TODO: chnage production task
  const onSelectChange = (e) => {
    // console.log("Selected ID", e.target.value, "production task ", productionTask, "List", productionTasksList)
    // dispatch(leftDrawerActions.setProductionTask({id: e.target.value, task: e.target.value}))
    let temp = productionTasksList.reduce((prevValue, currValue) => {
      if (currValue.id == e.target.value) {
        return currValue;
      }
    })
    if (temp == undefined) {
      temp = { id: "123456", task: "None Selected" }
    }

    // console.log("Setting production Task" , temp)

    dispatch(leftDrawerActions.setProductionTask(temp));
    // console.log("Production Task" , productionTask)

  }


  return (
    <div className="trees-dropdown-container-left" >
      <select onChange={onSelectChange} value={productionTask.id} className="trees-dropdown-left" name="trees">
        {treeOptions}
      </select>
    </div>
  )
}

export default TreesDropDown;