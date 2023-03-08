import './LeftSlide.css';
import LeftArrow2 from './LeftArrow2';
import TreeView from './TreeView';
import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateButton from './UpdateButton';
import TreesDropDown from './TreesDropDown'
import { processDescriptionActions } from '../../store/processdescriptiondrawer_slice';
import { messageDrawerActions } from '../../store/messagedrawer_slice';
import { getProcessDescrptionQuery } from '../../utils/SPARQLQueryBuilder';
import { fetchFromEntServer, fetchQuery } from '../../utils/FetchUtlis';
import WSContext from '../../store/ws-context';
import config from '../../config/config.json'
import { getPartOfProcessTask } from '../../utils/SPARQLQueryBuilder';

const dummySentences = [{ id: 5, text: "Some other sentences" }, { id: 6, text: "This is for the second set of sentences" }, { id: 7, text: "Blah-blah-blah" }]
const dummySentences2 = [{ id: 1, text: "This is a random sentence for the bulleted list." }, { id: 2, text: "This is another sentence for the bulleted list" }, { id: 3, text: "Short sentence" }, { id: 4, text: "This is meant to be a longer sentence, that is going to be displayed in the bulleted list, which can be found in the left slide in section." }
]

const LeftSlide = () => {
  const defaultWidth = useSelector((state) => state.config.leftSlideDefaultWidth);
  const isOpen = useSelector((state) => state.leftSlide.isOpen);
  const processPlanName = useSelector((state) => state.leftSlide.processPlanName)
  const productionTask = useSelector((state) => state.leftSlide.productionTask);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startW, setStartW] = useState(0);
  const [imgPath, setImgPath] = useState("./img_unavailable.jpg");
  const [sentences, setSentences] = useState([{ id: 0, text: "List not available" }]);
  const [, , socket] = useContext(WSContext)
  // Resize slide with drag bars

  useEffect(() => {
    setWidth(defaultWidth);
  }, [defaultWidth])

  useEffect(() => {
    
    console.log("Debug Production Task " )
    console.log(productionTask  )

    if(productionTask.task === "AssembleEnginerBlockFrame"){
      setImgPath("./EngineBlockFrame.jpg")
    }
    else if (productionTask.task =="AssembleRockerArm"){
      setImgPath("./RockerArm.jpg")
    }
    else if (productionTask.task =="AssembleRockerArmShaft"){
      setImgPath("./RockerArmShaft.jpg")
    }

  }, [productionTask])

  if (isDragging) {
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('mouseup', closeDragElement);
  }

  const dragMouseDown = (e) => {
    setIsDragging(true);

    e = e || window.event;
    e.preventDefault();

    setStartX(e.clientX);
    setStartW(width);
  }

  function elementDrag(e) {
    if (!isDragging) return;
    let minW = 100;
    let maxW = 500;
    let w = 0;

    w = startW + e.clientX - startX;

    if (w < minW) { w = minW }
    if (w > maxW) { w = maxW }

    e = e || window.event;
    e.preventDefault();

    setWidth(w);
  }

  function closeDragElement() {
    setIsDragging(false);
    document.removeEventListener('mousemove', elementDrag);
    document.removeEventListener('mouseup', closeDragElement);
  }
  let taskItems = [{
    name: "Pick",
    operatorRole: "Bystander",
    robotRole: "Executor",
    description: "Pick the part to be assembled in the product",
    modality: "Independent"
  },
  {
    name: "Pick",
    operatorRole: "Bystander",
    robotRole: "Executor",
    description: "Pick the part to be assembled in the product",
    modality: "Independent"
  },
  {
    name: "Pick",
    operatorRole: "Bystander",
    robotRole: "Executor",
    description: "Pick the part to be assembled in the product",
    modality: "Independent"
  },]

  useEffect(async ()=>{
    // todo: Query the isPerformedOnProductComponent for the [dependency]
    // only .jpg files
    const url = new URL("http://" + config.MainPlatform.IP + ":" + config.MainPlatform.OperatorFuseki + "/ds/query");
    const params = { 'query': getPartOfProcessTask(processPlanName) }
    url.search = new URLSearchParams(params).toString();
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    }
    const response = await fetch(url, options);
    const data = await response.json();
    let part = data.results.bindings[0].part.value.split('#').slice(-1)[0]; //directly grab the first element as you are expectuing one part
    console.log("Debug----- part" , part);
    if(/\d/.test(part)){
      part = part.replace(/[0-9]/g,'');
    }
    console.log("DEBUG=================================" , part);
    setImgPath("./"+part+".jpg")



  },[processPlanName])

  const update = () => {
  

    dispatch(processDescriptionActions.open())

    // TODO: fetch the process description and do the necessary transformation
    // no point in going to rest server as you need to parse the SHACL graph in Jena (Java vs JS)
    // console.log("Debug" + processPlanName)
    // const query = getProcessDescrptionQuery(processPlanName)
    // console.log(query)

    // const data = fetchQuery(query).then(data => {
    //   console.log(data.results);
    //   console.log(data.results.bindings[0].shape.value)
    //   const filePath = data.results.bindings[0].shape.value;

    //   // fetchFromEntServer("processDescription", filePath)


    // });
    console.log("Trying to send socket message")
    socket.send(JSON.stringify({
      type: "process_description",
      value: {
        processName: processPlanName,
      }
    }));


    dispatch(processDescriptionActions.setProcessDescription(taskItems))
  }

  return (
    <div
      className="left-slide"
      style={{
        left: isOpen ? "0px" : (width * -1) + "px",
        width: width + "px",
        overflow: isOpen ? "visible" : "hidden",
        transition: isDragging ? "0s" : "0.4s"
      }}>
      <div
        onMouseDown={dragMouseDown}
        className="left-drag-bar"
        style={{ display: isOpen ? "inline-block" : "none" }}>
      </div>

      <div className="image-container">
        <img className="img" src={imgPath}></img>
      </div>

      {/* <div className="ul-list-container">
        <ul className="ul-list">
          {sentences.map(sentence =>
            <li key={sentence.id}>{sentence.text}</li>
          )}
        </ul>
      </div> */}

      
      <TreeView></TreeView>
      <LeftArrow2></LeftArrow2>
      <UpdateButton update={update}></UpdateButton>
    </div>
  )
}

export default LeftSlide;