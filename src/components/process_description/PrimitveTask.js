
import './PrimitiveTask.css'

const PrimitiveTask = (props) => {


    return (
        <div className="card">
                <a>{"Name: " + props.name}</a>
                <a>{"Role 1: " + props.role1}</a>
                <a>{"Role 2: " +props.role2}</a>
                <a>{"Description: " +props.description}</a>
                <a>{"Modality: " +props.modality}</a>
        </div>
    )

}

export default PrimitiveTask;