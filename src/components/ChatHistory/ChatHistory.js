import React, { useState, useContext, useEffect } from "react";
import Chat from "../Chat/Chat";
import { FaAngleLeft } from "react-icons/fa";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./chatHistory.css";
import { axiosPublic } from "../../util/axiosConfig";
import "./chatHistory.css";
import { MainContext } from "../../context/MainContext";

export default function ChatHistory(props) {
  const { user, setUser } = useContext(MainContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [matchUsers, setMatchUsers] = useState([]);

  const getChats = async () => {
    const resp = await axiosPublic.get("/getChats", {
      withCredentials: true,
    });
    // console.log(resp.data);
    setChats(resp.data);
  };
  const getMatchUsers = async () => {
    const resp = await axiosPublic.get("/getMatchedUsers", {
      withCredentials: true,
    });
    await setMatchUsers(resp.data);
  };

  const findUsers = () => {
    const usersNames = chats.map((chat) => {
      const roomName = chat.roomId;
      const indexOfCurrentUser = roomName.split("-").indexOf("karol");

      console.log(
        "index,",
        roomName.split("-").splice(indexOfCurrentUser, 1).join("")
      );
    });
  };

  useEffect(() => {
    getChats();
    getMatchUsers();
    findUsers();
  }, []);

  return (
    <>
      <Header />
      <div className="chats-container">
        {chats.map((chat) => {
          return (
            <>
              <div className="chat-card">
                <p>{chat.roomId}</p>
                <p>{chat.chat[chat.chat.length - 1].msg}</p>
              </div>
            </>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
