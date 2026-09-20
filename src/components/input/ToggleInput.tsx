import {useState} from 'react';
import './ToggleInput.css';
import Button from '../Button';

type FieldType = "text" | "textarea" | "datepicker";

interface ToggleInputProps {
    text: string;
    className?: string;
    type?: FieldType;
}

export default function InputToggle({text, ...props}: ToggleInputProps) {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(text);
    
    const textField = <span id='toggle-input' {...props} onDoubleClick={toggleEdit}>{value}</span>;
    let element;

    if(!props.type) {
        props.type = "text";
    }

    if(props.type === "text") {
        element = <input id='toggle-input' {...props} type="text" autoFocus onDoubleClick={toggleEdit} value={value} onChange={(e) => handleText(e.target.value)} onBlur={handleBlur}/>
    } else if(props.type === "textarea") {
        element = <textarea id='toggle-input' {...props} autoFocus onDoubleClick={toggleEdit} value={value} onChange={(e) => handleText(e.target.value)} onBlur={handleBlur}/>;
    }

    function handleText(text: string) {
        setValue(prevText => {
            console.log('Previous text:', prevText);
            return text});
        
    }

    function toggleEdit() {
        setEdit(!edit);
        console.log('Edit mode:', !edit);
    }

    function handleBlur() {
        setEdit(false);
        console.log('onBlur:', false);
    }

    return ( 
    <>
        <div className="toggle-input-container">
            {
                edit ? element : textField
            }
            <Button variant="secondary" className="p-2 rounded-full w-10 h-10" onClick={toggleEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Bearbeiten"><path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/><path d="M3 22h18"/></svg>
            </Button>
        </div>
    </>
    );
}
