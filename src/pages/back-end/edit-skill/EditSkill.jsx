import React, { useEffect, useState } from "react";
import { SkillFrom } from "../../../components/back-end";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../../appwrite/config";
import { images } from "../../../conf/images";

function EditSkill() {
  const { skillId } = useParams();
  const [skill, setSkill] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSkill = async () => {
    await service
      .getSkill(skillId)
      .then((data) => setSkill(data))
      .catch(() => navigate("/admin"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSkill();
  }, [skillId]);

  return (
    <>
      {loading && (
        <img className="loading_gif" src={images.loader} alt="Loading..." />
      )}
      {skill?.$id && (
        <SkillFrom skill={skill} />
      )}
    </>
  );
}

export default EditSkill;
