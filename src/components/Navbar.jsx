import { NavLink } from "react-router-dom"
import style from './navbar.module.css'

import { useAuthentication } from "../hooks/useAuthentication"

import {useAuthValue} from "../context/AuthContext"

const Navbar = () => {
    const {user} = useAuthValue();
    const {logout} = useAuthentication();

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
            {!user && (
            <>
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
            </>
            )}
            {user && (
                <>
                    <li>
                <NavLink to="/posts/create" className={({isActive}) => isActive ? style.active : ""}>
                    Novo Post
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard" className={({isActive}) => isActive ? style.active : ""}>
                    Dashboard
                </NavLink>
            </li>
                </>
                )}
            <li>
                <NavLink to="/about" className={({isActive}) => isActive ? style.active : ""}>
                    Sobre
                </NavLink>
            </li>
            {user && (
                <>
                <button onClick={logout}>Sair</button>
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar
