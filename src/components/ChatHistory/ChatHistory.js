import React, { useState, useContext, useEffect } from "react";
import Chat from "../Chat/Chat";
import { FaAngleLeft } from "react-icons/fa";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./chatHistory.css";
import { axiosPublic } from "../../util/axiosConfig";
import "./chatHistory.css";
import { MainContext } from "../../context/MainContext";
import SyncLoader from "react-spinners/SyncLoader";
import Alert from "@mui/material/Alert";

const override = {
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  margin: "20rem auto",
  borderColor: "black",
};

export default function ChatHistory(props) {
  const [user, setUser, loading, setLoading, selectedUser, setSelectedUser] =
    useContext(MainContext);
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

  const findUser = (room) => {
    const roomName = room.split("-");
    const indexOfCurrentUser = roomName.indexOf(user?.username.toLowerCase());
    roomName.splice(indexOfCurrentUser, 1);
    const searchedUserName = roomName.join("");
    return matchUsers?.find(
      (user) => user.username.toLowerCase() === searchedUserName
    );
  };

  const displayTime = (time) => {
    let resTime = "";
    const now = new Date();
    const sentAt = new Date(time);
    let diff = now - sentAt;
    if (diff > 3600e3 * 24) {
      resTime =
        Math.floor(diff / 3600e3 / 24) <= 1
          ? ` yesterday`
          : ` ${Math.floor(diff / 3600e3 / 24)} days ago`;
      return resTime;
    }
    if (diff > 3600e3) {
      resTime =
        Math.floor(diff / 3600e3) > 1
          ? ` ${Math.floor(diff / 3600e3)} hours ago`
          : ` ${Math.floor(diff / 3600e3)} hour ago`;
      return resTime;
    }
    if (diff > 60e3) {
      resTime = ` ${Math.floor(diff / 60e3)} minutes ago`;
      return resTime;
    }
    return resTime;
  };

  const sortedChats = chats.sort((a, b) => {
    const aTime = new Date(a.sentAt);
    const bTime = new Date(b.sentAt);
    if (aTime < bTime) return 1;
    return -1;
  });
  useEffect(() => {
    setLoading(true)
    getChats();
    getMatchUsers();

    setTimeout(() => setLoading(false), 200);
  }, []);

  console.log('chats-length', chats.length)

  return (
    <>
      {loading ? (
        <SyncLoader
          loading={loading}
          cssOverride={override}
          size={15}
          />
        
      ) : (
        <>
          {chats.length === 0 ? (
            <>
              <Header />
              <div className="alert-no-chats">
                <Alert severity="warning">you have no chats yet!</Alert>
              </div>
              <Footer />
            </>
          ) : (
            <>
              {isChatOpen ? (
                <Chat />

              ) : (
                <>
                  <Header />
                  <br />
                  <div className="chats-container">
                    {chats.map((chat) => {
                      const user = findUser(chat.roomId);
                      return (
                        <div
                          key={user?.username}
                          className="chat-card"
                          onClick={() => {
                            setIsChatOpen(true);
                            setSelectedUser(user);
                          }}
                        >
                          <img src={user?.userImage} alt="" />
                          <aside>
                            <p className="name">{user?.username}</p>
                            <p className="message">
                              {chat.chat[chat.chat.length - 1].msg
                                .split(" ")
                                .splice(0, 3)
                                .join(" ")}
                            </p>
                          </aside>
                          <span>{displayTime(chat.sentAt)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <Footer />
                </>
              )}
            </>
          )}

        </>
      )}
    </>

  );
}
