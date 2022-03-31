import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Image } from "../utils";
import { toast } from "react-toastify";
import { loginApi } from "../api";
import Swal from "sweetalert2";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { data } = await loginApi(formData);
      if (data.status === true) {
        Swal.fire({
          title: "Success",
          text: `${data.message}`,
          icon: "success",
          timer: 3500,
          confirmButtonText: "Ok",
          footer: "You will be redireting to home page",
        });
        setTimeout(() => {
          navigate("/");
        }, 4500);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        Swal.fire({
          title: "Error!",
          text: `${data.error}`,
          icon: "error",
          timer: 3500,
          confirmButtonText: "Ok",
        });
      }
    }
  };
  //
  const toastProps = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleValidation = () => {
    const { email, password } = formData;
    if (!password || password.length < 6) {
      toast("Password is required and should be 6 characters long", toastProps);
      return false;
    } else if (!email) {
      toast("Email is required", toastProps);
      return false;
    } else {
      return true;
    }
  };
  //
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <Image />
            <h1>MYNO</h1>
          </div>
          {[
            {
              type: "text/email",
              placeholder: "Email or username",
              name: "email",
              value: email,
            },
            {
              type: "password",
              placeholder: "Password",
              name: "password",
              value: password,
            },
          ].map((input, i) => (
            <input
              key={i}
              type={input.type}
              onChange={handleChange}
              placeholder={input.placeholder}
              name={input.name}
              value={input.value}
            />
          ))}

          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register here</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default SignIn;
