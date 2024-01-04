import { NavLink } from "react-router-dom"
import style from './navbar.module.css'

const Navbar = () => {
  return (
    <nav className={style.navbar}>
        <NavLink className={style.navbar__logo}>
            Mini <span className={style.navbar__span}>Blog</span>
        </NavLink>
        <ul className={style.links_style}>
            <li className={style.link_style}>
                <NavLink to="/" className={({isActive}) => isActive ? style.active : ""}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/login" className={({isActive}) => isActive ? style.active : ""}>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to="/register" className={({isActive}) => isActive ? style.active : ""}>
                    Registro
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" className={({isActive}) => isActive ? style.active : ""}>
                    Sobre
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
