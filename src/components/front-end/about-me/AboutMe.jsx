import React from "react";
import { useSelector } from "react-redux";
import { images } from "../../../conf/images";
import { Link } from "react-router-dom";
import styles from "./AboutMe.module.css";
function AboutMe() {
  const themeInfo = useSelector((state) => state.theme);
  return (
    <section id="about_me" className={`${styles.about_me} container col-rev`}>
      <div className={styles.about_me_one}>
        <h3 className={styles.about_me_title}>About Me</h3>
        <p>
          Hi! I'm Girish Chauhan, a front-end web developer with a passion for
          creating beautiful and intuitive digital experiences. My journey into
          web development started in college when I stumbled upon a blog that
          piqued my curiosity about how websites come to life. Intrigued, I
          began diving into HTML and CSS, spending countless late nights
          experimenting and learning.
        </p>
        <br />
        <p>
          When I'm not coding, you can find me exploring the latest design
          trends, tinkering with new technologies, or enjoying a good book. I
          believe that the best web experiences come from a deep understanding
          of users’ needs, and I’m committed to delivering that in every project
          I undertake.
        </p>
        <br />
        <hr className={styles.about_me_hr} />
      </div>
      <div className={styles.about_me_two}>
        <Link
          target="_blank"
          to="https://www.freepik.com/free-vector/programming-concept-illustration_7441053.htm#fromView=search&page=1&position=49&uuid=4eb82263-df03-4d40-a6ec-dd15246d3f1b"
        >
          {themeInfo === "light" ? (
            <img
              className={styles.about_me_img}
              src={images.theme_2_img}
              alt="Coder"
            />
          ) : (
            <img
              className={styles.about_me_img}
              src={images.theme_1_img}
              alt="Coder"
            />
          )}
        </Link>
      </div>
    </section>
  );
}

export default AboutMe;