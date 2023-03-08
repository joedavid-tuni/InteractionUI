import { useContext, useEffect, useState } from 'react';
import './ReceiverButton.css';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Radius from '../Radius';
import config from '../../config/config.json'
import { getCurrentProductionTasksQuery } from '../../utils/SPARQLQueryBuilder';

let index = 0;

const ReceiverButton = (props) => {
  const radius = useSelector((state) => state.config.radius.receiverButton);
  const ref = useRef(null);
  // const receiverOptions = ["Receiver 1", "Receiver 2", "Receiver 3"];
  let currentTasks = [];
  const [receiverIndex, setReceiverIndex] = useState(0);
  const [productionTaskList, setProductionTaskList] = useState([]);
  const [productionTask, setProductionTask] = useState({ id: 1, task: "Press to Fetch" });
  // const pn = useContext(PSContext)
  const fetchProductionTasks = async () => {
    currentTasks = [];
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
    // console.log(response)
    const data = await response.json();
    // console.log(data.results)
    if (data.results.bindings.length == 0) {
      setProductionTaskList([{ id: 1, task: "No Tasks" }]);
    }
    else {
      data.results.bindings.map((task) => {
        currentTasks.push({
          id: task.id.value,
          task: task.task1.value.split('#').slice(-1)[0],
          desc: task.desc.value.split('#').slice(-1)[0]
        })
        setProductionTaskList(currentTasks);
      })
    }
  }
  useEffect(() => {
    fetchProductionTasks();

  }, [props.protocol])

  const taskButtonClickHandler = () => {
    fetchProductionTasks();
    setProductionTask(productionTaskList[index % productionTaskList.length] ? productionTaskList[index % productionTaskList.length] : "None");
    props.changeCurrentTask(productionTaskList[index % productionTaskList.length]);
    ++index;
  }

  return (
    <div onClick={taskButtonClickHandler} className="receiver-button-container">
      <div ref={ref} className="receiver-button">
        <div className="receiver-button-text">{productionTask.desc}</div>
        <Radius radius={radius} parentElement={ref.current}></Radius>
      </div>
    </div>
  )
}

export default ReceiverButton;