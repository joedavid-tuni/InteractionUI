import PrimitiveTask from "./PrimitveTask";
import './PrimitiveTasks.css'



const PrimitiveTasks = (props) => {


    return (
        <div className="tasks-container">
            {props.tasks.map((taskItem) => {
                return <PrimitiveTask
                    name={taskItem.name}
                    role1={taskItem.operatorRole}
                    role2={taskItem.robotRole}
                    description={taskItem.description}
                    modality={taskItem.modality}>
                </PrimitiveTask>
            })
            }
        </div >
    )

}

export default PrimitiveTasks;