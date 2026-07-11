import { useState } from "react";

export default function UpdateTaskItem(props) {

    const [newText, setText] = useState(props.text);
    
    function handleChange(event) {
        setText(event.target.value);
    }

    return(
        <div id="update-task">
            <input type="text" placeholder="Neue Aufgabe hinzufügen..." value={newText} onChange={handleChange}/>
            <button onClick={() => props.updateTaskText(props.haveId, newText)}>+ = ich bin nur zum updaten da :-)</button>
        </div>
    )
}