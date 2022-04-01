import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Buffer } from "buffer";
import { Image } from "../utils";
import { toast } from "react-toastify";
import { setAvatarApi } from "../api";
import { useNavigate } from "react-router-dom";

const SetAvatar = () => {
  const navigate = useNavigate();
  const avatarApi = "https://api.multiavatar.com/";
  const [avatars, setAvatars] = useState([]);
  const [selectAvatar, setSelectAvatar] = useState(null);

  const setProfileAvatar = async () => {
    if (selectAvatar === null) {
      toast.error("Please select a profile picture", toastProps);
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      const { data } = await setAvatarApi(user._id, {
        image: avatars[selectAvatar],
      });
      if (data.isSet) {
        user.isAvatarImage = true;
        user.avatarImage = data.image;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Something wrong! please try again later", toastProps);
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

  const avatartImageLoader = async () => {
    let data = [];
    for (let i = 0; i < 5; i++) {
      let image = await axios.get(
        `${avatarApi}/${Math.round(Math.random() * 10000)}`
      );
      const buffer = new Buffer(image?.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
  };

  useEffect(() => {
    avatartImageLoader();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.isAvatarImage) {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <div className="title">
        <h1>Please pick an avatar for your profile picture</h1>
      </div>
      <div className="avatars">
        {avatars?.map((avatar, i) => (
          <div
            key={i}
            className={`avatar ${selectAvatar === i ? "selected" : ""}`}
          >
            <Image
              src={`data:image/svg+xml;base64,${avatar}`}
              alt="avatar"
              onClick={() => setSelectAvatar(i)}
            />
          </div>
        ))}
      </div>
      <div className="submit-btn" onClick={setProfileAvatar}>
        Select as profile picture
      </div>
    </Container>
  );
};

export default SetAvatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .title {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;
