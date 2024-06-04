export default function Container ({children, className}: {children: React.ReactNode, className: string}) {
    return (
        <div className={`${className} border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100 `}>
            {children}
        </div>
    )
}