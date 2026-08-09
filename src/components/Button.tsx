import { ButtonHTMLAttributes  } from "react";

type TButtonVariants = 'primary' | 'secondary' | 'danger' | 'disabled';

type TButtonAnimations = 'scale';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: TButtonVariants,
    animation?: TButtonAnimations,
    classes?: string,
}

const buttonVariants = {
  primary: ' bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 hover:cursor-pointer ',
  secondary: ' bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400/70 hover:cursor-pointer ',
  danger: ' bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 hover:cursor-pointer ',
  disabled: ' bg-slate-300 text-slate-500 opacity-60 cursor-not-allowed pointer-events-none '
};

const buttonAnimation = {
    scale: ' hover:scale-105 active:scale-95 '
}

export default function Button({children, variant, animation, classes,  ...props}: IButtonProps) {

    let classNames = '';
    if(classes) {
        classNames += classes;
    }

    if(variant) {
        classNames += buttonVariants[variant];
    }

    if(animation) {
        classNames += buttonAnimation[animation];
    }
  
    return (
        <button {...props} className={classNames}>{children}</button>
    );
};