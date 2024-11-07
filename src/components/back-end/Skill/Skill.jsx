import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../../appwrite/config";
import styles from "./Skill.module.css";
import { images } from "../../../conf/images";
import { useSelector } from "react-redux";

function Skill() {
  const { skillId } = useParams();
  const [skill, setSkill] = useState({});
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector(state=>state.userData)
  const navigate = useNavigate();

  const fetchSkill = async () => {
    setErrors("");
    await service
      .getSkill(skillId)
      .then((data) => setSkill(data))
      .catch((error) => setErrors(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSkill();
  }, [skillId]);

  const editHandler = () => {
    navigate(`/edit-skill/${skillId}`);
  };
  const handleDelete = async () => {
    try {
      const deleteSkillDoc = await service.deleteSkill(skillId);
      if (deleteSkillDoc) {
        const deleteIconImg = await service.deleteIcon(skill.icon);
        if (deleteIconImg) {
          navigate("/admin");
        }
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <>
      {loading && <img className="loading_gif" src={images.loader} alt="Loading..." />}
      {errors && <p className={styles.error}>{errors}</p>}
      {skill?.$id && (
        <div className={styles.wrapper}>
          { userInfo?.$id === skill.userID && <div className={styles.btns}>
            <button onClick={editHandler} className={styles.edit}>
              Edit
            </button>
            <button onClick={handleDelete} className={styles.delete}>
              Delete
            </button>
          </div>}
          <div className={styles.img_container}>
            <img
              className={styles.skill_image}
              src={service.getSkillFile(skill?.icon)}
              alt={skill.title}
            />
          </div>
          <div>
            <h4 className={styles.info}>{skill.info}</h4>
            <p className={styles.exp}>{skill.exp}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Skill;
