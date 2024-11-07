import React from "react";
import { Link } from "react-router-dom";
import styles from "./Error_404.module.css";
import { images } from "../../../conf/images";

function Error_404() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2 className={styles.title}>
          Oops! <br /> Page Not Found
        </h2>
        <p className={styles.content}>
          It seems we can't find the page you're looking for.
          <br />
          Don’t worry, it happens to the best of us! Here are some helpful links
          to get you back on track.
        </p>
        <div className={styles.link_wrap}>
          <Link className={styles.link} to={"/"}>
            Home
          </Link>
          <Link className={styles.link} to={"/admin"}>
            Admin
          </Link>
        </div>
      </div>
      <div className={styles.image}>
        <Link
          to={
            "https://www.freepik.com/free-vector/404-error-with-portals-concept-illustration_20602755.htm#fromView=keyword&page=1&position=7&uuid=88be625d-1897-476d-adbe-d6044a60237b"
          }
          target="_blank"
        >
          <img src={images.error} alt="Error Image" />
        </Link>
      </div>
    </div>
  );
}

export default Error_404;
