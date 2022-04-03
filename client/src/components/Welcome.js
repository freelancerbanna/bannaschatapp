import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Image } from "../utils";

const Welcome = () => {
  const robot =
    "https://raw.githubusercontent.com/koolkishan/chat-app-react-nodejs/master/public/src/assets/robot.gif";

  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserName(JSON.parse(localStorage.getItem("user")).username);
    }
  }, []);

  return (
    <Container>
      <Image src={robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default Welcome;
