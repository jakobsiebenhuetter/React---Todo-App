
export default function Button({children, disabled,  ...props}) {
    let classes = 'bg-amber-400';
    if(disabled) {
        classes = " bg-amber-950";
    }

    // className={`${classes}`}
    return (
        <button {...props} >{children}</button>
    );
};