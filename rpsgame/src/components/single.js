import React from "react";
import "./final.css";
import bang from "../public/bang.png";
import vs from "../public/vs.png";
import useSound from "use-sound";
import { useState, useEffect, useMemo } from "react";
import paper from "../public/paper.png";
import sissor from "../public/sissor.png";
import stone from "../public/stone.png";
import rpaper from "../public/rpaper.png";
import rstone from "../public/rstone.png";
import rsissor from "../public/rsissor.png";
import { Link, useNavigate } from "react-router-dom";
import rounds from "../sounds/round.mp3";
import wrong from "../sounds/wrong.mp3";
function Single() {
  const [lcount, setlcount] = useState(0);
  const [rcount, setrcount] = useState(0);
  const [lfcount, setlfcount] = useState(2);
  const [rfcount, setrfcount] = useState(2);
  const [lnum, setlnum] = useState(0);
  const [num, setnum] = useState(0);
  const leftimg = useMemo(() => [stone, paper, sissor], []);
  const rightimg = useMemo(() => [rstone, rpaper, rsissor], []);
  const [limg, setlimg] = useState(leftimg[0]);
  const [rimg, setrimg] = useState(rightimg[0]);
  const [check, setcheck] = useState(false);
  const [round, setround] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setlimg(leftimg[lnum]);
  }, [lnum, leftimg]);

  useEffect(() => {
    setrimg(rightimg[num]);
  }, [num, rightimg]);

  function freeze() {
    setcheck(true);
    setlimg(stone);
    setrimg(rstone);
  }

  const [playSound] = useSound(rounds);
  const [losesound] = useSound(wrong);

  function shake(inp) {
    freeze();
    console.log(".....***898989*....");

    setTimeout(() => {
      counts(inp);
      console.log(".....****....");

      // Reset check state after animation
      setcheck(false);
    }, 1000);
  }

  function random() {
    var result = Math.floor(Math.random() * 3);
    setnum(result);
    return result;
  }
  function counts(user_choice) {
    setcheck(false);
    setlimg(leftimg[user_choice]);
    let result = random();
    setrimg(rightimg[result]);
    if (
      (user_choice === 0 && result === 2) ||
      (user_choice === 1 && result === 0) ||
      (user_choice === 2 && result === 1)
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
    } else if (user_choice !== result) {
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
    }
  }
  return (
    <div class="background">
      {lcount === 3 || rcount === 3 ? (
        navigate("/popup", { replace: true, state: { lcount, rcount ,page:"single"} })
      ) : (
        <div id="second">
          <div id="top">
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
            <div className="round"> ROUND {round}</div>
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
                  shake(1);
                }}
              >
                <img src={paper} alt="paper" />
              </button>
              <button
                id="stone"
                onClick={() => {
                  shake(0);
                }}
              >
                <img src={stone} alt="paper" />
              </button>
              <button
                id="sissor"
                onClick={() => {
                  shake(2);
                }}
              >
                <img src={sissor} alt="paper" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Single;
