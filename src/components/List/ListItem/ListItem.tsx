import { ReactNode } from 'react';

type ListItemProps = {
    children: ReactNode
}

const ListItem = ({ children }: ListItemProps) => {
    return (
        <li>
            {children}
        </li>
    )
}

export default ListItem;