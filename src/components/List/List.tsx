import { ReactNode } from 'react';

type ListProps = {
    children: ReactNode
}

const List = ({ children }: ListProps) => {
    return (
        <ul>
            {children}
        </ul>
    )
}

export default List;