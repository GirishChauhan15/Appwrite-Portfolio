import React, { useState } from "react";
import { Button, Input } from "../index";
import { useForm } from "react-hook-form";
import service from "../../../appwrite/config";
import { useSelector } from "react-redux";
import styles from "./SkillFrom.module.css";
import { useNavigate } from "react-router-dom";
import { images } from "../../../conf/images";

function SkillFrom({ skill }) {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      info: skill?.info || "",
      slug: skill?.$id || "",
      icon: "",
      exp: skill?.exp || "",
    },
  });
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();

  const submit = async (data) => {
    setErrors("");
    setLoading(true)
    if (skill) {
      const file = data?.icon[0]
        ? await service.createIcon(data?.icon[0])
        : null;
      if (file) {
        await service.deleteIcon(skill.icon);
      }
      const createSkill = await service
        .updateSkill(skill.$id, {
          ...data,
          icon: file ? file.$id : undefined,
        })
        .catch(async (error) => {
          setErrors(error);
          await service.deleteIcon(file.$id);
        }).finally(()=> setLoading(false));
      if (createSkill) {
        navigate(`/skill/${skill.$id}`);
      }
    } else {
      const file = data?.icon[0]
        ? await service.createIcon(data.icon[0])
        : null;

      if (file) {
        const createSkill = await service
          .createSkill({
            ...data,
            userID: userData.$id,
            icon: file.$id ? file.$id : undefined,
          })
          .catch(async (error) => {
            setErrors(error.message);
            service.deleteIcon(file.$id);
          }).finally(()=> setLoading(false));
        if (createSkill) {
          navigate(`/skill/${data.slug}`);
        }
      }
    }
  };
  return (
    <>
      {loading && (
        <div className="wrapper_gif">
          <img className="loading_gif" src={images.loader} alt="Loading..." />
        </div>
      )}
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        {skill ? <h2>Update Your Skill</h2> : <h2>New Skill Form</h2>}
        <br />
        <Input
          label="Skill Title:"
          className={styles.inputBox}
          {...register("info", { required: true })}
        />
        <Input
          label="Skill Id:"
          className={styles.inputBox}
          {...register("slug", { required: true })}
        />
        <Input
          label="Experience (Years/Months):"
          className={styles.inputBox}
          {...register("exp", { required: true })}
        />
        <Input
          label="Upload Image:"
          className={styles.inputBox}
          type="file"
          {...register("icon", { required: !skill })}
        />
        {skill?.icon && (
          <>
          <p>Preview Image:</p>
          <img
            src={service.getSkillFile(skill.icon)}
            className={styles.preview}
            alt={skill.info}
            />
            </>
        )}
        {errors && <div className={styles.error}>{errors}</div>}
        <Button className={`${styles.formBtn}  ${skill ? styles.up : styles.sub}`} type="submit">
        {skill ? "Update Skill" : "Submit Skill"}
        </Button>
      </form>
    </>
  );
}

export default SkillFrom;