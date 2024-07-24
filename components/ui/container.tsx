import { forwardRef } from 'react';

interface ContainerProps {
    children?: React.ReactNode;
    className?: string;
    onClickFunc?: () => void;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, className, onClickFunc }, ref) => {
    return (
        <div
            className={`${className} border border-slate-300 bg-white dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark dark:text-slate-100 overflow-hidden`}
            onClick={onClickFunc}
            ref={ref}
        >
            {children}
        </div>
    );
});

Container.displayName = 'Container';
export default Container;
