import PrimitiveTask from "./PrimitveTask";
import './PrimitiveTasks.css'



const PrimitiveTasks = (props) => {


    return (
        <div className="tasks-container">
            {props.tasks.map((taskItem) => {
                return <PrimitiveTask
                    name={taskItem.Name}
                    role1={taskItem.Role_1}
                    role2={taskItem.Role_2}
                    description={taskItem.Description}
                    modality={taskItem.Modality}>
                </PrimitiveTask>
            })
            }
        </div >
    )

}

export default PrimitiveTasks;