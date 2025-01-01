import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../../appwrite/config";
import styles from "./Project.module.css";
import { Link } from "react-router-dom";
import { images } from "../../../conf/images";
import { useSelector } from "react-redux";

function Project() {
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const projectId = useParams();
  const userInfo = useSelector(state=>state.userData)
  
  const fetchProject = async () => {
    setErrors("");
    try {
      const info = await service.getProject(projectId.projectId);
      if (info?.$id) {
        setProjects(info);
      } else {
        throw new Error("No posts yet");
      }
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const handleDelete = async () => {
    try {
      const projectDelete = await service.deleteProject(projectId.projectId);
      if (projectDelete) {
        const fileDelete = await service.deleteFile(projects.image);
        if (fileDelete) {
          navigate("/admin");
        }
      }
    } catch (error) {
      navigate('/admin')     
    }
  };

  const editHandler = () => {
    navigate(`/edit-project/${projectId.projectId}`);
  };

  return (
    <>
      {loading && <img className="loading_gif" src={images.loader} alt="Loading..." />}
      {errors && <p className={styles.error}>{errors}</p>}
      {projects?.$id && (
        <div className={styles.wrapper}>
          {userInfo?.$id === projects.userID  && <div className={styles.btns}>
            <button onClick={editHandler} className={styles.edit}>
              Edit
            </button>
            <button onClick={handleDelete} className={styles.delete}>
              Delete
            </button>
          </div>}
          <div>
            <img
              className={styles.project_image}
              src={service.getFilePreview(projects.image)}
              alt={projects.title}
            />
          </div>
          <div>
            <h4 className={styles.title}>{projects.title}</h4>
            <p className={styles.content}>{projects.content}</p>
            <div className={styles.row}>
            {projects?.viewProject === 'false' && <button className={styles.view_btn} style={{cursor:"not-allowed", backgroundColor:"#313131"}} disabled>View project</button>}
            {projects?.viewProject !== 'false' && <Link
                target="_blank"
                to={projects.viewProject}
                className={styles.view_btn}
              >
                View project
              </Link> }
              {projects?.viewCode === 'false' && <button className={styles.view_btn} style={{cursor:"not-allowed", backgroundColor:"#313131"}} disabled>View code</button>}
              {projects?.viewCode !== 'false' && <Link
                target="_blank"
                to={projects.viewCode}
                className={styles.view_btn}
              >
                View code
              </Link> }
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Project;
