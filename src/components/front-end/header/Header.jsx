import React from "react";
import { images } from "../../../conf/images";
import { Link } from "react-router-dom";
import styles from './Header.module.css'

function Header() {
  return (
    <section className={styles.header_section}>
      <header className={`${styles.header} container `}>
        <a href="#about_me">
          <img src={images.logo} className={styles.logo} alt="Logo" />
        </a>
        <nav>
          <ul className={styles.nav_items}>
            <li className={styles.nav_item}>
              <Link
                target="_blank"
                to={"https://github.com/GirishChauhan15"}
              >
                <img className={styles.icons} src={images.github} alt="github" />
              </Link>
            </li>
            <li 
            className={styles.nav_item}
            >
              <Link
                target="_blank"
                to={"https://www.linkedin.com/in/girish-chauhan/"}
              >
                <img className={styles.icons} src={images.linkedIn} alt="linkedin" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </section>
  );
}

export default Header;