import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { baseURL, getAllUserApi } from "../api";
import { Contacts, MessageArea, Welcome } from "../components";

import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  const allUserCall = async () => {
    const { data } = await getAllUserApi(currentUser?._id);
    if (data) {
      setContacts(data);
    }
  };

  useEffect(() => {
    allUserCall();
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(baseURL);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChangeChat}
        />
        {currentChat !== undefined ? (
          <MessageArea
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        ) : (
          <Welcome currentUser={currentUser} />
        )}
      </div>
    </Container>
  );
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
