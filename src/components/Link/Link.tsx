import { ReactNode } from 'react';

type LinkProps = {
    href: string;
    children: ReactNode
}

const Link = ({ children, href }: LinkProps) => {
    const anchor = '#' + href;

    return (
        <a href={anchor}>
            {children}
        </a>
    )
}

export default Link;