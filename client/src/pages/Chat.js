import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllUserApi } from "../api";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const currentUserSet = async () => {
    const loggeInUser = await JSON.parse(localStorage.getItem("user"));
    setCurrentUser(loggeInUser);
  };

  const getAllUserSet = async () => {
    // const getAlluser = await getAllUserApi(currentUser._id);
    // if (getAlluser) {
    //   setContacts(getAlluser);
    // }
    console.log(currentUser._id);
  };

  useEffect(() => {
    currentUserSet();
  }, []);

  useEffect(() => {
    getAllUserSet();
  }, [currentUser]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      currentUserSet();
    }
  }, []);

  return <Container>Chat</Container>;
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
