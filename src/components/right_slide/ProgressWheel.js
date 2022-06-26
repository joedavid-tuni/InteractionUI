import './ProgressWheel.css';
import { useSelector } from 'react-redux';

const ProgressWheel = () => {
  const height = useSelector((state) => state.config.treeView.height);
  const percentage = 83;

  return (     
    <div className="progress-wheel-container" style={{
      height: (100 - height) + "%"
    }}>
      <svg className="progress-wheel-svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="rgb(50, 160, 255)"/>
        <path style={{strokeDasharray: (2.512 * percentage) + ", 251.2"}} strokeLinecap="round" strokeWidth="5" stroke="rgb(165, 235, 255)" fill="none"
              d="M50 10
                a 40 40 0 0 1 0 80
                a 40 40 0 0 1 0 -80">
        </path>
        <text x="50" y="50" textAnchor="middle" dy="7" fontSize="20">{percentage + "%"}</text>
      </svg>
    </div>
  )
}

export default ProgressWheel;