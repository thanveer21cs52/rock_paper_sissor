import React from 'react'
import "./multiple.css"
import bang from "../public/bang.png";
import vs from "../public/vs.png";
import { Link, useNavigate } from "react-router-dom";
import {useEffect,useState} from "react"
import useSound from "use-sound";
import io from "socket.io-client"
import paper from "../public/paper.png";
import sissor from "../public/sissor.png";
import stone from "../public/stone.png";
import rpaper from "../public/rpaper.png";
import rstone from "../public/rstone.png";
import rsissor from "../public/rsissor.png";
import rounds from "../sounds/round.mp3";
import wrong from "../sounds/wrong.mp3";
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
const socket = io.connect(SOCKET_URL);



function Multiple() {
  const navigate = useNavigate();
 const [user,setuser]=useState("")  
 const [opponent,setopponent]=useState("") 
 const [name,setname]=useState("")
 const[flimg,setflimg]=useState(stone)
 const [rimg,setrimg]=useState(rstone)
 const [frimg,setfrimg]=useState(rstone)
 const [limg,setlimg]=useState(stone)
  const[rnum,setrnum]=useState(0)
  const[lnum,setlnum]=useState(0)
  const[check,setcheck]=useState(false)
  const[shake,setshake]=useState(false)
  const [lcount, setlcount] = useState(0);
  const [rcount, setrcount] = useState(0);
  const [lfcount, setlfcount] = useState(2);
  const [rfcount, setrfcount] = useState(2);
  const [round, setround] = useState(1);
  const [detail,setdetail]=useState(false)
  const [playSound] = useSound(rounds);
  const [losesound] = useSound(wrong);

  const ldic=[stone,paper,sissor] 
  const rdic=[rstone,rpaper,rsissor]
 
  const[room,setroom]=useState("")
  const joinroom=()=>{
    if(room!==""){
      socket.emit("join_room",{name,room})
    }
  }
  const submitmessage=(value)=>{
    setlnum(value)
    socket.emit("message_sent",{value,room})
   }
   useEffect(()=>{
    socket.on("room_details",(data)=>{
      console.log(data)
      console.log(name)
      setdetail(data.roomfull)
      data.user1===name?setuser(data.user1):setopponent(data.user1)
      data.user2===name?setuser(data.user2):setopponent(data.user2)
    })
   },[name])
 
   useEffect(() => {
    socket.on("receive_message", (data) => {
      setrnum(data.data.value);
      setshake(data.data.shake);
    });
    socket.on("start_game", (data) => {
      console.log(data);
      setshake(data.shake);
      console.log(data.shake);
    });

    return () => {
      // Clean up socket listeners when component unmounts
      socket.off("receive_message");
      socket.off("start_game");
    };
  }, [shake]); // Added shake to the dependency array

  useEffect(() => {
    if (shake==true && detail==true) {
      setcheck(true)
      start();
    }
  }, [shake]); // Added shake to the dependency array

function start() {
    freeze();
    console.log(".....***898989*....");

    setTimeout(() => {
      counts();
      console.log(".....****....");
    }, 1000);
  }
  function freeze() {
   setcheck(true)
   setlimg(stone)
   setrimg(rstone)
    
  }
  function start(l,r) {
    freeze();
    console.log(".....***898989*....");

    setTimeout(() => {
      setcheck(false)
      counts(l,r);
      console.log(".....****....");
    }, 1000);
  }
  function counts(l,r) {
   
    setlimg(ldic[lnum]);
    setrimg(rdic[rnum]);

    if (
      (lnum === 0 && rnum === 2) ||
      (lnum === 1 && rnum === 0) ||
      (lnum === 2 && rnum === 1)
    ) {
      if (lcount === 2) {
        setlfcount((prev) => prev + 1);
        setTimeout(() => {
          playSound();
          setlcount((prev) => prev + 1);
        }, 900);
        setround(round + 1);
      } else {
        setlcount((prev) => prev + 1);
        setround(round + 1);
      }
      setcheck(false)
    } else if (lnum !== rnum) {
      if (rcount === 2) {
        setrfcount((prev) => prev + 1);
        setTimeout(() => {
          losesound();
          setrcount((prev) => prev + 1);
        }, 900);
        setround(round + 1);
      } else {
        setrcount((prev) => prev + 1);
        setround(round + 1);
      }
      setcheck(false)
    }
  }




  return (
    <div className="App">
      <div id={detail ? "hidden" : "show"}>
        <div>
          <input
            onChange={(e) => {
              setname(e.target.value);
            }}
            placeholder="enter your name"
          />
        </div>
        <div>
          <input
            onChange={(e) => {
              setroom(e.target.value);
            }}
            placeholder="enter your room"
          />
        </div>
        <div>
          <button onClick={joinroom}>join room</button>
        </div>
      </div>
      {lcount === 3 || rcount === 3 ? (
        navigate("/popup", {
          replace: true,
          state: { lcount, rcount, page: "multiple" },
        })
      ) : (
        <div class={detail ? "show" : "hidden"}>
          <div id="second">
            <div id="top">
              <div class="userdiv">
                <div className="user">
                  <div>
                    <svg
                      fill="none"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m18.9989 21.8743c1.7258-.4437 3.0011-2.0101 3.0011-3.8743v-12c0-2.20914-1.7909-4-4-4h-12c-2.20914 0-4 1.79086-4 4v12c0 1.8642 1.27532 3.4306 3.00111 3.8743m13.99779 0c-.3193.082-.654.1257-.9989.1257h-12c-.3449 0-.67961-.0437-.99889-.1257m13.99779 0c-.0671-3.808-3.1749-6.8743-6.9989-6.8743-3.82399 0-6.93182 3.0663-6.99889 6.8743m9.99889-12.8743c0-1.65685-1.3431-3-3-3s-3 1.34315-3 3c0 1.6569 1.3431 3 3 3s3-1.3431 3-3z"
                        stroke="#28303f"
                        stroke-width="1.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <span
                      class={
                        lcount === 1 || lcount === 2 || lcount === 3
                          ? "fa fa-star checked"
                          : "fa fa-star "
                      }
                    ></span>
                    <span
                      class={
                        lcount === 2 || lcount === 3
                          ? "fa fa-star checked"
                          : "fa fa-star"
                      }
                    ></span>
                    <span
                      class={
                        lcount === 3 || lfcount === 3
                          ? "fa fa-star checked"
                          : "fa fa-star"
                      }
                    ></span>
                  </div>
                </div>
                <div class={detail ? "show details" : "hidden"}>{user}</div>
              </div>
              <div className="round"> ROUND {round}</div>
              <div class="userdiv">
                <div className="user">
                  <div>
                    <span
                      class={
                        rcount === 1 || rcount === 2 || rcount === 3
                          ? "fa fa-star checked"
                          : "fa fa-star "
                      }
                    ></span>
                    <span
                      class={
                        rcount === 2 || rcount === 3
                          ? "fa fa-star checked"
                          : "fa fa-star"
                      }
                    ></span>
                    <span
                      class={
                        rcount === 3 || rfcount === 3
                          ? "fa fa-star checked"
                          : "fa fa-star"
                      }
                    ></span>
                  </div>
                  <div>
                    <svg
                      fill="none"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m18.9989 21.8743c1.7258-.4437 3.0011-2.0101 3.0011-3.8743v-12c0-2.20914-1.7909-4-4-4h-12c-2.20914 0-4 1.79086-4 4v12c0 1.8642 1.27532 3.4306 3.00111 3.8743m13.99779 0c-.3193.082-.654.1257-.9989.1257h-12c-.3449 0-.67961-.0437-.99889-.1257m13.99779 0c-.0671-3.808-3.1749-6.8743-6.9989-6.8743-3.82399 0-6.93182 3.0663-6.99889 6.8743m9.99889-12.8743c0-1.65685-1.3431-3-3-3s-3 1.34315-3 3c0 1.6569 1.3431 3 3 3s3-1.3431 3-3z"
                        stroke="#28303f"
                        stroke-width="1.5"
                      />
                    </svg>
                  </div>
                </div>
                <div class={detail ? "show details" : "hidden"} >{opponent}</div>
              </div>
            </div>
            <div id="middle">
              <div>
                <img
                  src={limg}
                  id="limg"
                  class={check ? "shake" : ""}
                  alt="paper"
                />
              </div>
               <div>{check ? <img src={bang} id="vs" alt="vs" /> : <img src={vs} id="vs" alt="vs" />}</div>
              <div>
                <img
                  src={rimg}
                  id="rimg"
                  class={check ? "shake" : ""}
                  alt="paper"
                />
              </div>
            </div>
            <div id="bottom">
              <div>
                <button
                  id="paper"
                  onClick={() => {
                    submitmessage(1);
                  }}
                >
                  <img src={paper} alt="paper" />
                </button>
                <button
                  id="stone"
                  onClick={() => {
                    submitmessage(0);
                  }}
                >
                  <img src={stone} alt="paper" />
                </button>
                <button
                  id="sissor"
                  onClick={() => {
                    submitmessage(2);
                  }}
                >
                  <img src={sissor} alt="paper" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
 
}

export default Multiple