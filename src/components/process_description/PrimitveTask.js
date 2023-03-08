
import './PrimitiveTask.css'

const PrimitiveTask = (props) => {


    return (
        <div className="card">
                <a>{"Name: " + props.name}</a>
                <a>{"Operator Role: " + props.role1}</a>
                <a>{"Robot Role: " +props.role2}</a>
                <a>{"Description: " +props.description}</a>
                <a>{"Modality: " +props.modality}</a>
        </div>
    )

}

export default PrimitiveTask;