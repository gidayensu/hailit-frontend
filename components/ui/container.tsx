export default function Container ({children, className, onClickFunc}: {children?: React.ReactNode, className?: string, onClickFunc?: ()=>void}) {
    return (
        <div className={`${className} border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100 `} onClick={onClickFunc}>
            {children}
        </div>
    )
}