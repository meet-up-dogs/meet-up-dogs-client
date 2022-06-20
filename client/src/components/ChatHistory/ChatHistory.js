import React, { useState } from "react";
import Chat from "../Chat/Chat";
import { FaAngleLeft } from "react-icons/fa";

const users = [
  { username: "Evi" },
  { username: "Farid" },
  { username: "user" },
];

const logedninUser = "Karol";

export default function ChatHistory() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [roomId, setRoomId] = useState("");

  function roomIdHandle(user) {
    const room = [
      logedninUser.toLocaleLowerCase(),
      user.username.toLocaleLowerCase(),
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
      {isChatOpen ? (
        <p className="close-chat" onClick={closeChat}>
          <FaAngleLeft />
        </p>
      ) : null}
      <div>
        {!isChatOpen
          ? users.map((user) => (
              <p key={user.username} onClick={() => roomIdHandle(user)}>
                {user.username}
              </p>
            ))
          : null}
      </div>
      <div> {isChatOpen ? <Chat roomId={roomId} /> : null}</div>
    </>
  );
}
