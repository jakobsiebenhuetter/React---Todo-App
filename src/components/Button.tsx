
const buttonVariants = {
    primary: ' bg-emerald-500 text-white hover:bg-emerald-600  hover:cursor-pointer ',
    secondary: ' bg-slate-200 text-slate-800 hover:bg-slate-300 hover:cursor-pointer ',
    danger: ' bg-rose-500 text-white hover:bg-rose-600  hover:cursor-pointer ',
}

export default function Button({children, variant = '', classes = '',  ...props}) {

    let classNames = '';
    if(classes) {
        classNames += classes;
    }

    if(variant) {
        classNames += buttonVariants[variant];
    }
  
    return (
        <button {...props} className={classNames}>{children}</button>
    );
};