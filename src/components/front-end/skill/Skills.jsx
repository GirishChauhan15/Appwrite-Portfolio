import React, { useEffect, useState } from "react";
import service from "../../../appwrite/config";
import { images } from "../../../conf/images";
import styles from './Skills.module.css'

function Skills() {
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    setErrors("");
    await service
      .getSkills()
      .then((data) => {
        setSkills(data.documents);
        if(data?.documents?.length === 0){
          throw new Error('No skill info available.')
        }
      })
      .catch((error) => setErrors(error.message))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSkills();
  }, []);
  
  return (
    <>
      <section className={`${styles.skills} container`}>
        <h3 className={styles.skills_title}>Skills</h3>
          
          {loading && (
            <img className="loading_gif" src={images.loader} alt="Loading..." />
          )}
          {errors && <p className="error">{errors}</p>}
        <div className={styles.skills_content}>
          {skills?.length > 0 &&
            skills?.map((skill) => (
              <div className={styles.skills_info} key={skill?.info}>
                <div className={`${styles.skills_container} row`}>
                  <h4 className={styles.skill_name}>{skill?.info}</h4>
                  <img
                    className={styles.skill_img}
                    src={service.getSkillFile(skill?.icon)}
                    alt={skill?.info}
                  />
                </div>
                <p className={styles.skill_Expr}>{skill.exp}</p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default Skills;