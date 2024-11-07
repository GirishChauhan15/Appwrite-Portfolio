import React, { useState } from "react";
import { Input, Button } from '../index'
import { useForm } from "react-hook-form";
import service from "../../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { images } from "../../../conf/images";

function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const submit = async (data) => {
    setLoading(true)
    setError("");
    try {
      const session = await service.login(data);
      if (session) {
        const user = await service.getCurrentUser();
        if (user) {
          dispatch(login(user));
          navigate("/admin");
        } else {
          dispatch(logout());
        }
      }
    } catch (error) {
      if(String(error.message) === 'Creation of a session is prohibited when a session is active.'){
        window.location.reload(false)
      } else {
        setError(error.message);
        dispatch(logout());
      }
    } finally{
      setLoading(false)
    }
  };

  return (
    <>
    {loading && (
        <div className="wrapper_gif">
          <img className="loading_gif" src={images.loader} alt="Loading..." />
        </div>
      )}
      <div className={`${styles.container} ${styles.wrapper}`}>
        <h2>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <Input
            className={styles.inputBox}
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
                    value
                  ) || "Please enter a valid email",
              },
            })}
          />
          <Input
            className={styles.inputBox}
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" className={styles.submitBtn}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
