import {Link, useLocation} from "react-router-dom";
import type {MenuItem} from "./Nav.tsx";


interface NavItemProps {
    item: MenuItem;
    active: boolean;
}

function NavItem({item, active}: NavItemProps) {
    const location = useLocation();

    if (item.icon) {
        return (
            <li className={`c-nav__item ${active ? 'c-nav__item--active' : ''}`} key={item.path}>
                <Link to={item.path} state={{prevPath: location.pathname}}>
                    <i className={`bi bi-${item.icon}`}></i>
                </Link>
            </li>
        )
    }

    return (
        <li className={`c-nav__item ${active ? 'c-nav__item--active' : ''}`} key={item.path}>
            <Link to={item.path} state={{prevPath: location.pathname}}>{item.name}</Link>
        </li>
    )
}

export default NavItem