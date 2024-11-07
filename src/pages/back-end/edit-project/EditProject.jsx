import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Form} from "../../../components/back-end/index";
import service from "../../../appwrite/config";
import { images } from "../../../conf/images";
function EditProject() {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const { projectId } = useParams();
  
  const fetchProject = async () => {
    try {
      const projectInfo = await service.getProject(projectId);
      if (projectInfo) {
        setProject(projectInfo);
      }
    } catch (error) {
      navigate('/admin')
    }finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);
  
  return (
    <>
    {loading && <img className="loading_gif" src={images.loader} alt="Loading..." />}
      {project?.$id &&
        <Form project={project} /> }
    </>
  );
}

export default EditProject;
