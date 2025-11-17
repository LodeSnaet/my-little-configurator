import {router} from "../../main.tsx";
import NavItem from "./NavItem.tsx";
import {Link, useLocation} from "react-router-dom";

export interface MenuItem {
    path: string;
    name: string;
    active: boolean;
    icon?: string;
}

function Nav() {
    const {pathname} = useLocation();
    let navItem: MenuItem[] = [];
    let iconItem: MenuItem[] = [];

    router.filter(route => !(route.path === '*') && (route.isNav)).map((route) => {
            const finalPath = route.index ? '/' : (route.path || '');
            const nameStr = route.index
                ? 'Home'
                : (finalPath.replace(/^\//, '') || 'Home').replace(/^\w/, c => c.toUpperCase());
            const isActive = pathname === finalPath ||
                pathname.startsWith(`${finalPath}/`);

            if (!route.icon) {
                navItem.push({
                    path: finalPath,
                    name: nameStr,
                    active: isActive
                });
            } else {
                iconItem.push({
                    path: finalPath,
                    name: nameStr,
                    active: isActive,
                    icon: route.icon
                })
            }

        }
    );

    return (
        <nav className={"c-nav"}>
            <Link to={'/'}>
                <svg width="57" height="21" viewBox="0 0 57 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M7.30141 0.931216C3.59229 5.39017 0.0359505 10.9197 0.000289525 15.0528C-0.0135995 16.6079 0.47139 17.9655 1.63469 18.9938C3.30888 20.4747 5.15349 20.9969 6.98909 21C9.67155 21.0038 12.3352 19.896 14.4208 19.0418C17.9333 17.6039 56.7598 0.344066 56.7598 0.344066C57.1344 0.151936 57.0642 -0.0874569 56.5954 0.0320481C56.4062 0.0804649 14.3266 11.7539 14.3266 11.7539C13.5296 11.9847 12.7059 12.1054 11.8776 12.1128C8.64376 12.1324 5.76611 10.2949 5.78938 6.42268C5.79839 4.90754 6.25147 3.08038 7.30141 0.931216Z"
                          fill="black" />
                </svg>
            </Link>

            <div className={"c-nav__menu"}>
                <ul>
                    {navItem.map((item, i) => (
                        <NavItem item={item} active={item.active} key={i} />
                    ))}
                </ul>
                <hr />
                <ul>
                    {iconItem.map((item, i) => (
                        <NavItem item={item} active={item.active} key={i} />
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
