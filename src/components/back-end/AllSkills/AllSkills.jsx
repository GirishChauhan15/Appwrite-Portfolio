import React, { useEffect, useState } from "react";
import service from "../../../appwrite/config";
import styles from "./AllSkills.module.css";
import { Link } from "react-router-dom";
import { images } from "../../../conf/images";
function AllSkills() {
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true)

  const fetchSkills = async () => {
    setErrors("");
    await service
      .getSkills()
      .then((data) => {
        setSkills(data.documents)
        if(data.documents?.length === 0){
          throw new Error('No Skill info available.')
        }
      })
      .catch((error) => setErrors(error.message))
      .finally(()=>{setLoading(false)})
  };

  useEffect(() => {
    fetchSkills();
  }, []);
  
  return (
    <>
    {loading && <img className="loading_gif" src={images.loader} alt="Loading..." />}
    {errors && <p className="error">{errors}</p>}
    <div className={styles.skills_wrapper}>
      {skills?.map((skill) => (
        <Link
        to={`/skill/${skill.$id}`}
        className={styles.skills_info} key={skill.info}>
        <div className={`${styles.skills_container} ${styles.row}`}>
          <h4 className={styles.skill_name}>{skill.info}</h4>
          <div className={styles.img_wrap}>
            <img
              className={styles.skill_img}
              src={service.getSkillFile(skill.icon)}
              alt={skill.info}
              />
          </div>
        </div>
        <p className={styles.skill_Expr}>{skill.exp}</p>
      </Link>
      ))}
    </div>
      </>
  );
}

export default AllSkills;
