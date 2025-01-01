import React, { useEffect, useState } from "react";
import service from "../../../appwrite/config";
import { images } from "../../../conf/images";
import { Link } from "react-router-dom";
import styles from './Projects.module.css'

function Projects() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const fetchProjects = async () => {
    try {
      setErrors("");
      const project = await service.getProjects();
      if (project?.documents?.length === 0) {
        setPosts([])
        throw new Error('No project data available.')
      } else {
        const info = project.documents?.sort(
          (a, b) =>
            Number(String(b.$id).substring(b.$id.length - 1, b.$id.length)) -
            Number(String(a.$id).substring(a.$id.length - 1, a.$id.length))
        );
        setPosts(info);
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
    <section className={`${styles.projects} container`}>
      <div className={`${styles.projects_one} row`}>
        <h3 className={styles.projects_title}>Projects</h3>
        <a href="#contact" className={styles.projects_btn}>
          Contact Me
        </a>
      </div>
      {loading && (
        <img className="loading_gif" src={images.loader} alt="Loading..." />
      )}
      {errors && <p className="error">{errors}</p>}

      {posts?.length > 0 && (
        <div className={styles.projects_two}>
          {posts?.map((post) => (
            <div key={post.$id} className={styles.project}>
              <div>
                <img
                  className={styles.project_two_img}
                  src={service.getFilePreview(post.image)}
                  alt={post.title}
                />
              </div>
              <div>
                <h4 className={styles.project_two_title}>{post.title}</h4>
                <p className={styles.project_two_content}>{post.content}</p>
                <div className={`${styles.project_btns} ${styles.row_project}`}>
                  {post?.viewProject === 'false' && <button className={styles.project_two_btn} style={{cursor:"not-allowed", backgroundColor:"#313131"}} disabled>View project</button>}
                  {post?.viewProject !== 'false' && <Link
                    target="_blank"
                    to={post.viewProject}
                    className={styles.project_two_btn}
                  >
                    View project
                  </Link>}

                  {post?.viewCode === 'false' && <button className={styles.project_two_btn} style={{cursor:"not-allowed", backgroundColor:"#313131"}} disabled>View code</button> }
                  {post?.viewCode !== 'false' && <Link
                    target="_blank"
                    to={post.viewCode}
                    className={styles.project_two_btn}
                  >
                    View code
                  </Link>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;