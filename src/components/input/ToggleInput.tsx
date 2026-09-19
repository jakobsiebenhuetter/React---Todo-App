import {useState} from 'react';
import './ToggleInput.css';


export default function InputToggle({text, ...props}) {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(text);

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
        {edit && <input id='toggle-input' {...props} type="text" onDoubleClick={toggleEdit} value={value} onChange={(e) => handleText(e.target.value)} onBlur={handleBlur}/> }
        {!edit && <span id='toggle-input' {...props} onDoubleClick={toggleEdit}>{value}</span>} 
    </>
    );
}