import {useState, useRef} from 'react';
import './ToggleInput.css';
import Button from '../Button';

type FieldType = "text" | "textarea";

interface ToggleInputProps {
    text: string;
    placeholder?: string;
    className?: string;
    type?: FieldType;
    onChange: (value: string) => void;
    onSubmit?: () => void;
}

export default function ToggleInput({text, ...props}: ToggleInputProps) {
    const [edit, setEdit] = useState({
        active: false,
        triggeredByButton: false,
    });
    const [value, setValue] = useState(text);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    let element;
    let textValue = value;
    let className = props.className || '';
  
    
    function handleText(text: string) {
        props.onChange(text)
 

        setValue(prevText => {
            console.log('Previous text:', prevText);
            return text
        });  
    }
    
    function toggleEdit() {
        setEdit((prevEdit) => {
            let active = !prevEdit.active;
            if(prevEdit.triggeredByButton) {
                active = !active;
                prevEdit.triggeredByButton = false;
            } 
            return {...prevEdit, active: active, triggeredByButton: prevEdit.triggeredByButton};
        })
    }

    function handleBlur(e) {
        if(e.relatedTarget === buttonRef.current) {
            setEdit({
                active: false,
                triggeredByButton: true,
            });
        } else {
            setEdit({
                active: false,
                triggeredByButton: false,
            });
        }
    }

    if(!value && props.placeholder) {
        textValue = props.placeholder;
        className = props.className + '  text-gray-400 italic opacity-50';
    }
     
    if(!props.type) {
        props.type = "text";
    }

    const textField = <span id='toggle-input' className={className}  onDoubleClick={toggleEdit}>{textValue}</span>;
    
    if (props.type === "text") {
        element = <input id='toggle-input' type="text" autoFocus onDoubleClick={toggleEdit} value={value} onChange={(e) => handleText(e.target.value)} onBlur={handleBlur}/>
    } else if(props.type === "textarea") {
        element = <textarea id='toggle-input' autoFocus onDoubleClick={toggleEdit} value={value} onChange={(e) => handleText(e.target.value)} onBlur={handleBlur}/>;
    }

    return ( 
    <>
        <div className="toggle-input-container">
            {
                edit.active ? element : textField
            }
            <Button ref={buttonRef} variant="secondary" className="btn p-2 m-2 rounded-full w-10 h-10" onClick={toggleEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Bearbeiten"><path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/><path d="M3 22h18"/></svg>
            </Button>
        </div>
    </>
    );
}
