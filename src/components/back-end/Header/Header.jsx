import React from "react";
import {LogoutBtn} from "../index";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import {images} from "../../../conf/images";

function Header() {
  const userData = useSelector((state) => state.status);
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Admin",
      url: "/admin",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !userData,
    },
    {
      name: "Add Project",
      url: "/add-project",
      active: userData,
    },
    {
      name: "Add Skill",
      url: "/add-skill",
      active : userData,
    }
  ];

  return (
    <header>
      <nav className={styles.navbar}>
        <div>
          <img className={styles.logo} src={images.logo} alt="Logo" />
        </div>
        <div>
          <ul className={styles.navItems}>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.active} ${styles.navButton}`
                          : `${styles.navButton}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {userData && (
              <li className={styles.navButton}>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
