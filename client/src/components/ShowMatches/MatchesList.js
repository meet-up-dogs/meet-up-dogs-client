import { useEffect } from "react";
import axios from "axios";
import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import "./matchList.css"

const MatchList = (props) => {
  const [matchUser,setMatchUser] = useState({})
  const getMatchedUsers = async () => {
    const resp = await axios.get("http://localhost:4000/getMatchedUsers", {
      withCredentials: true,
    });
    setMatchUser(resp.data)
    console.log(resp.data);
  };

  useEffect(() => {
    getMatchedUsers();
  }, []);

  const Users = [
    {
      name: "alex",
      city: "Berlin",
      languages: "En"
    },
    {
      name: "Joe",
      city: "Hamburg",
      languages: "En"
    },
    {
      name: "Mark",
      city: "Berlin",
      languages: "De"
    }, {
      name: "John",
      city: "Frankfurt",
      languages: "En"
    }

  ]


  return (
    <>
      <Header
        user={props.user}
        login={props.login}
        handleChange={props.handleChange}
      />
      <main className="matchedList">
      {matchUser.map((user)=>{
        return(
          <p>{user.name}</p>
        )
      })}


      </main>

      <Footer />
    </>
  );
};

export default MatchList;
