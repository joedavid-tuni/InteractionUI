import './TreesDropDown.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rightDrawerActions } from '../../store/rightdrawer_slice';
import WSContext from '../../store/ws-context';
import config from '../../config/config.json'
import { getBasicSelectQuery } from '../../utils/SPARQLQueryBuilder';

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

const TreesDropDown = () => {
  const height = useSelector((state) => state.config.treeView.height);
  const dispatch = useDispatch();
  const [treeList, setTreeList] = useState();
  const [treeOptions, setTreeOptions] = useState();
  const [selectedId, setSelectedId] = useState(1);
  const [isReady, , socket] = useContext(WSContext);

  useEffect(() => {
    // This is where we fetch the list of trees
    if (isReady) {
      console.log("[Product WorkPlan] Fetching ... ");
      console.log(getBasicSelectQuery())

      const sendRequest = async () => {
        const url = new URL("http://" + config.KBEPlatform.IP + ":" + config.KBEPlatform.KBPort + "/ds/query");
        const params = { 'query': getBasicSelectQuery('*', '?s', 'a', 'camo:ProductWorkPlan'), 'default-graph-uri': encodeURI(config.KBEPlatform.KBGraphURI) }
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
        console.log(data.results.bindings)
        const workplans = data.results.bindings.map((workplan) => {
          return {
            id: Math.random(),  // replace by proper ID from KB
            title: workplan.s.value.split('#').slice(-1)[0].replaceAll('_', ' ')
          }
        })
        console.log(workplans);
        setTreeList (workplans)
        
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
    setSelectedId(e.target.value);
  }

  useEffect(() => {
    //Load new tree here based on selectedID
    setTimeout(() => {
      let t = [];

      if (selectedId == 1) { t = dummyTree1; }
      if (selectedId == 2) { t = dummyTree2; }
      if (selectedId == 3) { t = dummyTree3; }

      dispatch(rightDrawerActions.setTree(t));
    }, 1000);

    dispatch(rightDrawerActions.setTree([]));
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