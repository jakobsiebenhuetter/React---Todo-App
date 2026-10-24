import type { ReactNode } from "react";
import {createPortal} from "react-dom";
import Button from "./Button";
import React from "react";

interface IConfirmModalProps {
    children: ReactNode;
    onClose: (e: React.MouseEvent) => void;
    onConfirm: (e: React.MouseEvent) => void;
}

export default function ConfirmModal({children, onClose, onConfirm}: IConfirmModalProps) {
    return (
        createPortal(
            <>
            <div onClick={onClose} className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex flex-col justify-center items-center"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 flex flex-col gap-4">
                <div>
                    {children}
                </div>
                <div className="flex gap-4 justify-end">
                    <Button variant="primary" className="rounded p-3.5 w-[60px]" onClick={onConfirm}>Ja</Button>
                    <Button variant="secondary" className="rounded p-3.5 w-[120px]" onClick={onClose}>Abbrechen</Button>
                </div>
            </div>
            </>
        , document.querySelector('body')!)
    );
}