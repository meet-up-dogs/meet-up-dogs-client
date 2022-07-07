import React, { useState, useContext } from "react";
import Chat from "../Chat/Chat";
import { FaAngleLeft } from "react-icons/fa";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./chatHistory.css";

import { MainContext } from "../../context/MainContext";

export default function ChatHistory(props) {
  const { user, setUser } = useContext(MainContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [roomId, setRoomId] = useState("");

  function roomIdHandle(user) {
    const room = [
      user.toLocaleLowerCase(),
      props.user.username.toLocaleLowerCase(),
    ]
      .sort()
      .join("-");
    setRoomId(room);
    setIsChatOpen(true);
    return room;
  }

  function closeChat() {
    setIsChatOpen(false);
  }
  return (
    <>
      <Header
        user={props.user}
        login={props.login}
        handleChange={props.handleChange}
      />
      {isChatOpen ? (
        <p className="close-chat" onClick={closeChat}>
          <FaAngleLeft />
        </p>
      ) : null}
      <div className="chathistory">
        {/* {!isChatOpen
          ? users.map((user) => (
              <p key={user.username} onClick={() => roomIdHandle(user)}>
                {user.username}
              </p>
            ))
          : null} */}
      </div>
      <div> {isChatOpen ? <Chat roomId={roomId} /> : null}</div>
      <Footer />
    </>
  );
}
