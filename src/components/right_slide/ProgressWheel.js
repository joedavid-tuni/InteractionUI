import './ProgressWheel.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ProgressWheel = () => {
  const height = useSelector((state) => state.config.treeView.height);
  const tree = useSelector((state) => state.rightSlide.tree);
  const [percentage, setPercentage] = useState(0);
  let total = 0;
  let completed = 0;

  useEffect(() => {
    calculateCompleted(tree);
    if (total == 0) {
      setPercentage(0);
    }
    else {
      setPercentage(Math.round(completed / total * 100));
    }
  }, [tree])


  const calculateCompleted = (t) => {

    for (let e of t) {
      total += 1
      if (e.state === "completed") {
        // If key found, update the state
        // console.log("YIPEEE! Key found 1")
        completed += 1;
      }
      if (e.items.length > 0) {
        // Recursive function (Calls itself if there are sub elements)
        calculateCompleted(e.items);
      }
    }

  }

  return (
    <div className="progress-wheel-container" style={{
      height: (100 - height) + "%"
    }}>
      <svg className="progress-wheel-svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="rgb(0, 0, 0)" stroke="rgba(255,255,255,0.3)" />
        <path style={{ strokeDasharray: (2.512 * percentage) + ", 251.2" }} strokeLinecap="round" strokeWidth="5" stroke="rgba(255, 235, 255,0.4)" fill="none"
          d="M50 10
                a 40 40 0 0 1 0 80
                a 40 40 0 0 1 0 -80">
        </path>
        <text x="50" y="50" textAnchor="middle" dy="7" fontSize="20" fill="rgba(255,255,255,0.3)">{percentage + "%"}</text>
      </svg>
    </div>
  )
}

export default ProgressWheel;