import React from "react";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import "./chat.css";
import { axiosPublic } from "../../util/axiosConfig";

// const socket = io.connect("https://meet-up-dog.herokuapp.com");
const socket = io.connect("http://localhost:8080");

export default function Chat({ roomId, username }) {
  const [room, setRoom] = useState(roomId);

  // Messages States
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  socket.emit("join_room", room);

  const sendMessage = (e) => {
    e.preventDefault();
    setConversation([...conversation, { sent: true, message: message }]);

    socket.emit("send_message", { message, room });
  };

  // useEffect(() => {
  socket.on("receive_message", (data) => {
    setConversation([...conversation, { sent: false, message: data.message }]);
  });
  // sendConversation();
  // }, []);

  useEffect(() => {
    console.log(conversation);
    // const chat = conversation;
    socket.emit("save", {
      conversation: conversation,
      room: room,
      username: username,
    });
  }, [conversation]);

  return (
    <div>
      <h2>Chat {roomId}</h2>
      <Form className="d-flex flex-column m-2 justify-content-center">
        <Form.Group className="d-flex flex-column  w-100 messages-box">
          {conversation.map((con) =>
            con.sent ? (
              <div className="message-box message-sent">
                <p>{con.message}</p>
              </div>
            ) : (
              <div className="message-box message-received">
                <p>{con.message}</p>
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
            variant="primary"
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
  );
}
