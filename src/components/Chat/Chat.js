import React from "react";
// import { Button, Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import "./chat.css";
import { axiosPublic } from "../../util/axiosConfig";
import { MainContext } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../Header/Header.js";
import ScrollToBottom from "react-scroll-to-bottom";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import SendIcon from "@mui/icons-material/Send";
// const socket = io.connect("https://meet-up-dogs.herokuapp.com");
const socket = io.connect("http://localhost:8080");

export default function Chat() {
  const [
    user,
    setUser,
    loading,
    setLoading,
    selectedUser,
    setSelectedUser,
    notifications,
    setNotifications,
  ] = useContext(MainContext);

  const navigate = useNavigate();
  const room = [
    user.username.toLocaleLowerCase(),
    selectedUser.username.toLocaleLowerCase(),
  ]
    .sort()
    .join("-");

  // Messages States
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  socket.emit("join_room", room);

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("send_message", {
      message,
      room,
      username: user.username,
    });
    console.log("send_message");
    setTimeout(getChat, 200);
    // getChat();
  };

  socket.on("receive_message", (data) => {
    getChat();
  });

  useEffect(() => {
    getChat();
  }, []);

  const getChat = async () => {
    const resp = await axiosPublic.post("getChatHistory", {
      room: room,
      username: user.username,
    });

    setConversation(resp.data.chat);
    console.log(resp.data.chat);
  };

  const clearNotifications = async () => {
    const resp = await axiosPublic.post("/clearNotifications", {
      username: user.username,
    });
  };
  useEffect(() => {
    if (notifications.includes(selectedUser.username)) {
      clearNotifications();
    }
  }, []);
  return (
    <>
      <Header conversation={conversation} />
      <div className="chat">
        <FormControl>
          <div className="chat-label">
            <div
              className="back-btn"
              onClick={() => {
                if (document.location.pathname === "/chatHistory") {
                  document.location.reload();
                } else {
                  navigate("/chatHistory");
                }
              }}
            >
              <ArrowBackIcon />
            </div>
            <figure>
              <img src={selectedUser.userImage} alt="" />
            </figure>
            <div>
              <h2 className="chat-title"> {selectedUser.username}</h2>
              <h5 className="chat-last-msg"> Last message sent:</h5>
            </div>
            <VideocamOutlinedIcon />
            <CallOutlinedIcon />
          </div>
          <FormLabel className=" messages-box">
            {conversation?.map((con) =>
              con.sentBy === user.username ? (
                <>
                  <div className="message-box  message-sent">
                    <p>{con.msg}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="message-box message-received">
                    <p>{con.msg}</p>
                  </div>
                </>
              )
            )}
          </FormLabel>
          <FormLabel className="send-section">
            <TextField
              color="success"
              id="outlined-multiline-flexible"
              multiline
              rows={3}
              label="Type here..."
              placeholder="Type here..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <SendIcon
              className="send-icon"
              variant="success"
              type="submit"
              id="chat-btn"
              onClick={sendMessage}
            />
          </FormLabel>
        </FormControl>
      </div>
    </>
  );
}
