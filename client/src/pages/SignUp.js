import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Image } from "../utils";
import { toast } from "react-toastify";
import { registerApi } from "../api";
import Swal from "sweetalert2";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const { username, email, password, cpassword } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { data } = await registerApi({ ...formData, cpassword });
      if (data.status === true) {
        Swal.fire({
          title: "Success",
          text: `${data.message}`,
          icon: "success",
          timer: 3500,
          confirmButtonText: "Ok",
          footer: "You will be redireting to login page",
        });
        setTimeout(() => {
          navigate("/login");
        }, 4500);
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
    const { username, email, password, cpassword } = formData;
    if (password !== cpassword) {
      toast("Password should be matched", toastProps);
      return false;
    } else if (!username || username.length < 3) {
      toast(
        "Username is required should be at least 3 characters long",
        toastProps
      );
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
              type: "text",
              placeholder: "Username",
              name: "username",
              value: username,
            },
            {
              type: "email",
              placeholder: "Email",
              name: "email",
              value: email,
            },
            {
              type: "password",
              placeholder: "Password",
              name: "password",
              value: password,
            },
            {
              type: "password",
              placeholder: "Repeat password",
              name: "cpassword",
              value: cpassword,
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

          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login here</Link>
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

export default SignUp;
