import './TreeElement.css';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

// List of possible states for the element
const states = [
  // {name: "initial", backgroundColor: "#004", isBlinking: false},
  {name: "initial", backgroundColor: "rgba(0, 0, 0, 0)", isBlinking: false},
  {name: "in focus", backgroundColor: "#004", isBlinking: true},
  {name: "performing", backgroundColor: "rgba(255, 162, 51, 0.45)", isBlinking: true},
  {name: "newly completed", backgroundColor: "rgba(0, 255, 50, 0.45)", isBlinking: true},
  {name: "completed", backgroundColor: "rgba(0, 255, 50, 0.45)", isBlinking: false},
  {name: "planned", backgroundColor: "rgba(0, 255, 50, 0.2)", isBlinking: false}
];

const TreeElement = (props) => {
  // Listen to blinking state change.
  const blinkingState = useSelector((state) => state.blinking.blinkingState);

  const [element, setElement] = useState(<div />);
  const [isOpen, setIsOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("rgba(0, 0, 0, 0)");

  // When we receive the state through props, set the background color
  useEffect(() => {
    for (let state of states) {
      if (state.name == props.element.state) {
        setBackgroundColor(state.backgroundColor);
      }
    }
  }, [props.element.state]);

  useEffect(() => {
    let tempEement;
    let e = props.element;
    let bg = backgroundColor;

    // Set the background to 100% transparent when blinking period is in the transparent state
    if (!blinkingState) {
      for (let state of states) {
        if (state.name == props.element.state) {
          if (state.isBlinking == true) {
            bg = "rgba(0, 0, 0, 0)";
          }
        }
      }
    }

    if (e.items === undefined) {   
      // If there are no child elements
      tempEement = (
        <li>
          <div style={{ backgroundColor: bg }}className="treeview-animated-element4">
            {e.name}
          </div>
        </li>
      );
    } else {      
      // Create element with their clildren
      let tempElements =  e.items.map(e2 => <TreeElement key={e2.key} element={e2} />);
      
      // Assign classes for open state
      let class1 = "closed";
      let class2 = "fas fa-angle-right";
      let class3 = "nested";
      if (isOpen) {
        // Assign classes for closed state
        class1 += " open";
        class2 += " down";
        class3 += " active";
      }
      tempEement = (
        <li className="treeview-animated-items">
          <a onClick={toggleElement} // Add click handler --> open and close element
            style={{ backgroundColor: bg }} 
            className={class1}>
            <i className={class2}></i>
            <span>
              {e.name}
            </span>
          </a>        
          <ul className={class3}>{tempElements}</ul>
        </li>
      );
    }
    // Set the jsx element of this react element to the element that we created above
    setElement(tempEement);
  }, [props.element.items, isOpen, backgroundColor, blinkingState]);

  // Toggle open and close
  const toggleElement = () => {
    setIsOpen((prevState) => {
      return !prevState
    });
  };

  return (
    <>
      {element}
    </>
  )
}

export default TreeElement;