import React from 'react'
import styles from "./Admin.module.css";
import {AllProjects ,Container, AllSkills} from "../../../components/back-end/index";
import { useSelector } from "react-redux";

function Admin() {
  const authStatus = useSelector((state) => state.status);
  return (
    <>
      <Container>
        {authStatus ? (
          <div className={styles.wrapper}>
            <h2>Projects</h2>
            <AllProjects />
            <h2>Skills</h2>
            <AllSkills />
          </div>
        ) : (
          <h1 className={styles.login}>Login Required</h1>
        )}
      </Container>
    </>
  );
}

export default Admin;
