import React, { useEffect, useState } from "react";
import service from "../../../appwrite/config";
import styles from "./AllProjects.module.css";
import { Link } from "react-router-dom";
import { images } from "../../../conf/images";

function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const fetchProjects = async () => {
    setErrors("");
    try {
      const projectInfo = await service.getProjects();
      if (projectInfo?.documents.length > 0) {
        const info = projectInfo.documents?.sort(
          (a, b) =>
            Number(String(b.$id).substring(b.$id.length - 1, b.$id.length)) -
            Number(String(a.$id).substring(a.$id.length - 1, a.$id.length))
        );
        setProjects(info);
      } else {
        setProjects([]);
        throw new Error("No project data available.");
      }
    } catch (error) {
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      {loading && (
        <img className="loading_gif" src={images.loader} alt="Loading..." />
      )}
      {errors && <div className="error">{errors}</div>}
      <div className={styles.wrapper}>
        {projects?.length > 0 && (
          <div className={styles.container}>
            {projects?.map((project) => (
              <div key={project.$id} className={styles.project}>
                <Link to={`/project/${project.$id}`}>
                  <div>
                    <img
                      className={styles.project_image}
                      src={service.getFilePreview(project.image)}
                      alt={project.title}
                    />
                  </div>
                  <div>
                    <h4 className={styles.title}>{project.title}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AllProjects;
