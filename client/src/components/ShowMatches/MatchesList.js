import { useEffect , useState} from "react";
import axios from "axios";
import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import "./matchList.css"

const MatchList = (props) => {
  const [matchUser,setMatchUser] = useState([])
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
        <ul>
      {matchUser.map((user)=>{
        return(
          <>
          <li>{user.username}</li>
          <li>{user.dogBreed}</li>
          <img src={user.userImage} alt="userPhoto" style={{width: "50px" , height: "50px"}}/>
          </>
        )
      })}

</ul>

      </main>

      <Footer />
    </>
  );
};

export default MatchList;
