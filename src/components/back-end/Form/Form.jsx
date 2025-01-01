import React, { useState } from "react";
import { Input, Button } from "../index";
import service from "../../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styles from "./Form.module.css";
import { images } from "../../../conf/images";

function Form({ project }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: project?.title || "",
      slug: project?.$id || "",
      content: project?.content || "",
      image: "",
      viewProject: project?.viewProject || "",
      viewCode: project?.viewCode || "",
    },
  });
  const userData = useSelector((state) => state.userData);
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (data) => {
    setLoading(true);

    if (project) {
      const file = data?.image[0]
        ? await service.uploadFile(data?.image[0])
        : null;
      if (file) {
        await service.deleteFile(project.image);
      }
      const dbPost = await service
        .updateProject(project.$id, {
          ...data,
          image: file ? file.$id : undefined,
        })
        .catch(async (error) => {
          setError(error);
          await service.deleteFile(file.$id);
        })
        .finally(() => setLoading(false));
      if (dbPost) {
        navigate(`/project/${project.$id}`);
      }
    } else {
      const file = data?.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.image = fileId;
        const dbPost = await service
          .createProject({
            ...data,
            userID: userData.$id,
          })
          .catch(async (error) => {
            setError(error.message);
            await service.deleteFile(file.$id);
          })
          .finally(() => setLoading(false));
        if (dbPost) {
          navigate(`/project/${data?.slug}`);
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
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        {project ? <h2>Update Your Project</h2> : <h2>New Project Form</h2>}
        <br />
        <Input
          label={"Project Title:"}
          className={styles.inputBox}
          type="text"
          {...register("title", { required: true })}
        />
        <Input
          label={"Project Id:"}
          className={styles.inputBox}
          type="text"
          placeholder="project-id-`Number`"
          {...register("slug", { required: true })}
        />
        <Input
          label={"Project Description:"}
          className={styles.inputBox}
          type="text"
          {...register("content", { required: true })}
        />
        <Input
          label={"Upload Image:"}
          className={styles.inputBox}
          type="file"
          {...register("image", { required: !project })}
        />
        {project?.image && (
          <>
            <p>Preview Image:</p>
            <img
              src={service.getFilePreview(project.image)}
              alt={project.title}
            />
          </>
        )}
        <Input
          label={"Preview Project:"}
          className={styles.inputBox}
          type="text"
          placeholder="No url use `false`"
          {...register("viewProject", { required: true })}
        />
        <Input
          label={"View Code:"}
          className={styles.inputBox}
          type="text"
          placeholder="No url use `false`"
          {...register("viewCode", { required: true })}
        />
        {errors && <p className={styles.error}>{errors}</p>}
        <Button className={`${styles.formBtn}  ${project ? styles.up : styles.sub}`} type="submit">
          {project ? "Update Project" : "Submit Project"}
        </Button>
      </form>
    </>
  );
}

export default Form;