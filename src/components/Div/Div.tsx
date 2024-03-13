import { ReactNode } from 'react';

type DivProps = {
    children: ReactNode;
    className?: string
}

const Div = ({ children, className }: DivProps) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Div;