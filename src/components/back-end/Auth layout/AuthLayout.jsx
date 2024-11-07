import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Container} from "../index";
import { images } from "../../../conf/images";

function AuthLayout({authenticate= true, children}) {
  const [loading, setLoading] = useState(true);
  const status = useSelector((state) => state.status);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (authenticate && status !== authenticate) {
      navigate("/login");
    } else if (!authenticate && status !== authenticate) {
      navigate("/admin");
    }
    setTimeout(() => {
        
        setLoading(false);
    }, 1000);
  }, [navigate, authenticate, status]);

  return (
    <Container>
    {loading ? <img className="loading_gif" src={images.loader} alt="Loading..." /> : <> {children} </>}
    </Container>
);
}

export default AuthLayout;
