import React, { useState, useContext } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import "./contactform.css";
import { MainContext } from "../../context/MainContext";
import Alert from "@mui/material/Alert";

export default function ContactForm(props) {
  const [status, setStatus] = useState();
  const [user] = useContext(MainContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const injectedData = {};
    const data = {};
    const inputs = e.target.elements;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }

    Object.assign(data, injectedData);

    fetch(FORM_ENDPOINT, {
      method: "POST",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((response) => {
        // It's likely a spam/bot request, so bypass it to validate via captcha

        if (response.status === 422) {
          Object.keys(injectedData).forEach((key) => {
            const el = document.createElement("input");

            el.type = "hidden";

            el.name = key;

            el.value = injectedData[key];

            e.target.appendChild(el);
          });

          e.target.submit();

          throw new Error("Please finish the captcha challenge");
        }

        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        // return response.json();
        return response;
      })

      .then(() =>
        setStatus(
          <Alert severity="success">
            your message has been sent. We will get back to you!
          </Alert>
        )
      )

      .catch((err) => setStatus(err.toString()));
  };

  if (status) {
    return (
      <>
        <Header />
        <div className="msg">
          <div className="text-2xl">Thank you!</div>

          <div className="text-md">{status}</div>
        </div>
        <Footer />
      </>
    );
  }

  // const FORM_ENDPOINT = "https://public.herotofu.com/v1/89e2a010-00fd-11ed-bc36-e1ea9ccadd33";
  const FORM_ENDPOINT = "http://localhost:8080/postemail";

  return (
    <>
      <Header />

      <form
        action={FORM_ENDPOINT}
        onSubmit={handleSubmit}
        method="POST"
        target="_blank"
        className="contact-form"
      >
        <div className="mb-3 pt-0">
          <input
            type="text"
            value={user.username}
            placeholder="Your name"
            name="name"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>

        <div className="mb-3 pt-0">
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            name="email"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>

        <div className="mb-3 pt-0">
          <textarea
            placeholder="Your message"
            name="message"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>

        <div className="mb-3 pt-0">
          <button
            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            Send a message
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
}
