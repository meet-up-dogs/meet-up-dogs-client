import React from "react";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import "./chat.css";
import { axiosPublic } from "../../util/axiosConfig";
import { MainContext } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Header from "../Header/Header.js";

// const socket = io.connect("https://meet-up-dog.herokuapp.com");
const socket = io.connect("http://localhost:8080");

export default function Chat() {
  const [user, setUser, loading, setLoading, selectedUser, setSelectedUser] =
    useContext(MainContext);

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
  };
  return (
    <>
      <Header />
      <div className="chat">
       
        <Form className="d-flex flex-column m-2 justify-content-center">
        <div
          className="back-btn"
          onClick={() => {
            console.log("naaaaaaaaavi");
            if (document.location.pathname === "/chatHistory") {
              document.location.reload();
            } else {
              navigate("/chatHistory");
            }
          }}
        >
          <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
        </div>
        <h2 className="chat-title">Chat {room}</h2>
          <Form.Group className="d-flex flex-column  w-100 messages-box">
            {conversation?.map((con) =>
              con.sentBy === user.username ? (
                <div className="message-box message-sent">
                  <p>{con.msg}</p>
                </div>
              ) : (
                <div className="message-box message-received">
                  <p>{con.msg}</p>
                </div>
              )
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Your Message:</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="submit"
              className="mt-5"
              id="chat-btn"
              onClick={sendMessage}
            >
              send
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  )
}
