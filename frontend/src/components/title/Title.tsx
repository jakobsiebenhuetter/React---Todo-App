import './Title.css';

export default function Title({text}: {text: string}) {
    return (
        <div className='flex items-center justify-between  m-3.5'>
            <h2 className='font-mono font-bold text-xl sm:text-2xl uppercase tracking-wide text-slate-700'>{text}</h2>
        </div>
    );
}