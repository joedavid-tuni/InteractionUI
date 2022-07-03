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

const dummyTree1 = [
  {
    name: "Mail", key: "1", state: "initial", items: [
      { name: "Offers", key: "2", state: "attention needed" },
      { name: "Contacts", key: "3", state: "completed" },
      {
        name: "Calendar", key: "4", state: "current", items: [
          { name: "Deadlines", key: "5", state: "not started" },
          { name: "Meetings", key: "6", state: "initial" },
          { name: "Workouts", key: "7", state: "initial" },
          { name: "Events", key: "8", state: "initial" }
        ]
      }
    ]
  },
  {
    name: "Inbox", key: "9", state: "completed", items: [
      { name: "Admin", key: "10", state: "initial" },
      { name: "Corporate", key: "11", state: "initial" },
      { name: "Finance", key: "12", state: "initial" },
      { name: "Other", key: "13", state: "initial" }
    ]
  },
  {
    name: "Favourites", key: "14", state: "not started", items: [
      { name: "Restaurants", key: "15", state: "initial" },
      { name: "Places", key: "16", state: "initial" },
      { name: "Games", key: "17", state: "initial" },
      { name: "Coctails", key: "18", state: "initial" },
      { name: "Food", key: "19", state: "initial" }
    ]
  },
  { name: "Notes", key: "20", state: "current" },
  { name: "Settings", key: "21", state: "initial" },
  { name: "Devices", key: "22", state: "attention needed" },
  { name: "Deleted Items", key: "23", state: "initial" }
];
const dummyTree2 = [
  { name: "tree 2 item 1", key: "24", state: "initial" },
  {
    name: "Inbox", key: "25", state: "completed", items: [
      { name: "Admin", key: "26", state: "initial" },
      { name: "Corporate", key: "27", state: "initial" },
      { name: "Finance", key: "28", state: "initial" },
      { name: "Other", key: "29", state: "initial" }
    ]
  }
];
const dummyTree3 = [
  { name: "Tree 3 item 1", key: "30", state: "initial" },
  {
    name: "dummy item", key: "31", state: "completed", items: [
      { name: "Admin", key: "32", state: "initial" },
      { name: "Corporate", key: "33", state: "initial" },
      { name: "Finance", key: "34", state: "initial" },
      { name: "Other", key: "35", state: "initial" }
    ]
  }
];
const expectedTree = [
  {
    name: "EngineBlock", key: "30", state: "initial", items: [
      {
        name: "AssembleRods", key: "32", state: "attention needed", items: [
          { name: "Assemble Rocker Arm Shaft", key: "32", state: "attention needed" }]
      },
      {
        name: "Assemble Engine Block Frame", key: "22", state: "attention needed", items: [
          { name: "Assemble Rocker Arm Shaft", key: "32", state: "attention needed" }]
      },
      {
        name: "AssembleRockerArm", key: "12", state: "attention needed", items: [
          { name: "Assemble Rocker Arm Shaft", key: "32", state: "attention needed" }]
      }

    ]
  }
]

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
        console.log(response)
        const data = await response.json();
        console.log(data.results)
        const workplans = data.results.bindings.map((workplan) => {
          return {
            id: workplan.id.value,  // replace by proper ID from KB
            title: workplan.s.value.split('#').slice(-1)[0].replaceAll('_', ' ') // TODO: outsource this to a utility function
          }
        })
        setTreeList(workplans)

      }

      sendRequest();

    }
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

  // const loadTreeList = () => {
  //   setTimeout(() => {

  //   }, 1000);
  // }

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
    //Load new tree here based on selectedID

    let xmlDoc;
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

        let enabledTransition;
        let tempArr = [];
        let tempArr2 = [];
        let tempObj = {};
        let visitedNodes = [];

        function createObj(PNObj) {

          // enabledTransition = PNObj.label;
          let term = false;

          // APPROACH:  BACKWARD PROPOGATION, TRYING BY TYPE OF VALUE RETURNED
          // if (PNObj instanceof PetriNetTransition) {

          //   console.log("Transition Block", PNObj.label, PNObj.name);
          //   let outArcs = PNObj.outArcs;

          // for (const arcKey of Object.keys(outArcs)) {
          //   term = createObj(outArcs[arcKey]);
          //   if ((term == true) && (typeof term == "boolean")) {
          //     term = { name: PNObj.label, key: PNObj.name, state: "initial" };
          //     if (enabledTransition != PNObj.label) {

          //       return term;
          //     }
          //     else {
          //       tempObj.push(term);
          //       continue;
          //     }
          //   }
          //   else if (term.constructor == Array) {
          //     term = { name: PNObj.label, key: PNObj.name, state: "initial", items: term }
          //     if (enabledTransition != PNObj.label) {
          //       return term;
          //     }
          //     else {
          //       tempObj.push(term);
          //       continue;
          //     }
          //   }
          //   else if ((typeof term == "object") && (term.constructor != Array)) {
          //     term = [term]
          //     if (enabledTransition != PNObj.label) {

          //       return term;
          //     }
          //     else {
          //       tempObj.push(term);
          //       continue;
          //     }
          //   }

          // }

          //   // APPROACH:  BACKWARD PROPOGATION, TRYING BY TYPE RETURNING VISTED OBJECT
          //   let outArcs = PNObj?.outArcs; // going to be undefined for PetriNet Arcs
          //   let noOutArcs = 0;
          //   if (outArcs != null) {
          //     noOutArcs = Object.entries(outArcs).length;
          //   }

          //   //maybe reset tempArr here?

          //   for (const [index, [arcKey, arcValue]] of Object.entries(Object.entries(outArcs))) {
          //     if (PNObj instanceof PetriNetTransition) {

          //       console.log("Transition Block", PNObj.label, PNObj.name);

          //       // if (visitedNodes.includes(PNObj.name)) {
          //       //   continue;

          //       // }

          //       // else { //not visited before

          //       visitedNodes = visitedNodes.push(PNObj.label);
          //       term = createObj(outArcs[arcKey]);
          //       let obj = { name: PNObj.label, key: PNObj.name, state: "initial" }

          //       if (index + 1 == noOutArcs) { // no more parallel arcs
          //         // let ret = tempArr.push(obj);
          //         // tempArr = []
          //         return { ...obj, items: term };
          //       }

          //       else {  // more parallel arcs to traverse
          //         tempArr.push(obj);
          //         continue;

          //       }


          //       // return { obj, items: terms };

          //       // if (visitedNodes.includes(term.key)) {
          //       //   tempObj = {...tempObj, items: { name: PNObj.label, key: PNObj.name, state: "initial" }}
          //       //   return tempObj;
          //       // }
          //       // else {
          //       //   continue;
          //       // }

          //       // }

          //     }

          //     else if (PNObj instanceof PetriNetArc) {
          //       let term = false;
          //       console.log("Arc Block:", PNObj.toString());
          //       let connNode = PNObj.target;
          //       term = createObj(connNode);
          //       return term;
          //     }

          //     else if (PNObj instanceof PetriNetPlace) {
          //       let term = false;
          //       console.log("Place Block", PNObj.name);

          //       if (Object.keys(outArcs).length > 0) {

          //         for (const arcKey of Object.keys(outArcs)) {
          //           term = createObj(outArcs[arcKey]);
          //           return term;
          //         }

          //       }

          //       else {
          //         // terminal place
          //         term = {};
          //         return null;
          //       }
          //     }
          //     return term;
          //   }
          // }
        }
        //APPROACH: not taking into account that you are passing a transition first
        function createObj2(PNObj) {
          if (PNObj instanceof PetriNetTransition) {
            let outArcs = PNObj.outArcs; // going to be undefined for PetriNet Arcs
            let noOutArcs = Object.entries(outArcs).length;

            for (const [index, [arcKey,]] of Object.entries(Object.entries(outArcs))) {
              let term = createObj2(outArcs[arcKey]);

              let obj = { name: PNObj.label, key: PNObj.name, state: "initial" }

              if ((parseInt(index) + 1) == noOutArcs) { // no more parallel arcs
                // let ret = tempArr.push(obj);
                // tempArr = []
                if (term != null) tempArr2.push(term);
                // if(tempArr.length>0){
                //   tempArr2 = [...tempArr, ...tempArr2]
                // }

                let ret;
                if (noOutArcs > 1) { // if this was a transition with multiple branches
                  ret = { ...obj, items: [...tempArr, ...tempArr2] }; // 1st fallback:{ name: PNObj.label, key: PNObj.name, state: "initial", items: [] }
                }
                else {

                  ret = { ...obj, items: tempArr2 }

                }
                tempArr2 = [];                             //2nd fallback: { , items: name: PNObj.label, key: PNObj.name, state: "initial", items: null }
                return ret;
              }

              else {  // more parallel arcs to traverse
                tempArr.push(term);
              }


            }


          }

          else if (PNObj instanceof PetriNetArc) {
            let term = false;
            console.log("Arc Block:", PNObj.toString());
            let connNode = PNObj.target;
            term = createObj2(connNode);
            return term;

          }

          else if (PNObj instanceof PetriNetPlace) {
            let term = false;
            let outArcs = PNObj.outArcs; // going to be undefined for PetriNet Arcs
            let noOutArcs = Object.entries(outArcs).length;

            if (noOutArcs > 0) { // not terminal place

              for (const arcKey of Object.keys(outArcs)) {
                term = createObj2(outArcs[arcKey]);
                return term;
              }

            }

            else {
              // terminal place
              term = {};
              return null;
            }
          }
        }
        const expectedTree = [
          {
            name: "EngineBlock", key: "30", state: "initial", items: [
              {
                name: "AssembleRods", key: "32", state: "attention needed", items: [
                  { name: "Assemble Rocker Arm Shaft", key: "32", state: "attention needed" }]
              },
              {
                name: "Assemble Engine Block Frame", key: "22", state: "attention needed", items: [
                  { name: "Assemble Rocker Arm Shaft", key: "32", state: "attention needed" }]
              },
              {
                name: "AssembleRockerArm", key: "12", state: "attention needed", items: [
                  { name: "Assemble Rocker Arm Shaft", key: "32", state: "attention needed" }]
              }

            ]
          }
        ]

        for (const transition of enabledTransitions) {
          enabledTransition = transition.label;
          t.push(createObj2(transition));
          // createObj2(transition)
        }
        console.log(t);

        dispatch(rightDrawerActions.setTree(t));
        // console.log(acceptingPetriNet.im.getEnabledTransitions());

        // xmlDoc = parser.parseFromString(response, "text/xml");
        // console.log(xmlDoc);
        // let arrP = [...xmlDoc.getElementsByTagName("place")];
        // let arrT = [...xmlDoc.getElementsByTagName("transition")];
        // let arrA = [...xmlDoc.getElementsByTagName("arc")];

        // // finding the place with the intial marking
        // let arrTemp= arrP.filter((place)=>{
        //   let children = [...place.children]
        //   for (const child of children){
        //     if (child.localName  =='initialMarking'){ // && child.xxxValue == 1
        //       return true;
        //     }
        //   }


        // })
        // console.log(arrTemp);

      }).catch(error => console.log(error))
    }
    fetchProductionTasks();


    // console.log(response.text());S




    // if (selectedId == 1) { t = dummyTree1; }
    // if (selectedId == 2) { t = dummyTree2; }
    // if (selectedId == 3) { t = dummyTree3; }



    // dispatch(rightDrawerActions.setTree([]));
  }, [selectedId])

  return (
    <div className="trees-dropdown-container" style={{
      height: (100 - height) + "%"
    }}>
      <select onChange={onSelectChange} value={selectedId} className="trees-dropdown" name="trees">
        {treeOptions}
      </select>
    </div>
  )
}

export default TreesDropDown;