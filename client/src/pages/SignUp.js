import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpasswrod: "",
  });
  const { username, email, password, cpasswrod } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
  };
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
              name: "passwrod",
              value: password,
            },
            {
              type: "password",
              placeholder: "Repeat password",
              name: "cpasswrod",
              value: cpassword,
            },
          ].map((input, i) => (
            <>
              <input
                key={i}
                type={input.type}
                onChange={handleChange}
                placeholder={input.placeholder}
                name={input.name}
                value={input.value}
              />
              <button type="submit">Create User</button>
              <span>
                Already have an account? <Link to="/login">Login her</Link>
              </span>
            </>
          ))}
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div``;

export default SignUp;
