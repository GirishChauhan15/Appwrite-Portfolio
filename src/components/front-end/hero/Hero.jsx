import React, { useEffect, useState } from "react";
import { images } from "../../../conf/images";
import { useDispatch } from "react-redux";
import { theme as themeInfo } from "../../../store/authSlice";
import styles from "./Hero.module.css";

function Hero() {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    dispatch(themeInfo(theme));
  }, [theme, setTheme]);

  return (
    <>
      <div className={styles.theme_container}>
        <button
          className={styles.theme}
          onClick={() => {
            setTheme((prev) => (prev === "light" ? "dark" : "light"));
          }}
        >
          {theme === "light" ? (
            <img
              className={styles.theme_icon}
              src={images.theme_1}
              alt="Theme icon"
            />
          ) : (
            <img
              className={styles.theme_icon}
              src={images.theme_2}
              alt="Dark mode"
            />
          )}
        </button>
      </div>
      <section className={`${styles.hero} container col-rev`}>
        <div className={`${styles.hero_content} row`}>
          <p className={styles.hero_content_title}>
            <span className={styles.hero_title_span}>Hey there! </span>
            <br />
            I'm Girish Chauhan,
          </p>
          <p className={styles.hero_content_text}>Front End Web Developer.</p>
          <a href="#contact" className={styles.hero_content_text_btn}>
            Contact Me
          </a>
        </div>
        <div className={styles.hero_img}>
          <div className={styles.hero_img_shapes}>
            <img
              className={styles.owner}
              src={images.avatar}
              alt="girish chauhan"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;