import React from 'react'
import { Link ,useLocation} from 'react-router-dom'
import "./popup.css"
import Gameover from "../public/gameover.png"
import win from "../public/win.png"
import lose from "../public/lose.png"
import restart from "../public/restart.png"
import home from "../public/home.png"
function Popup(props) {
  const location=useLocation()
  return (
    <div>
      <div class="overlay">
        <div class="popup">
          <img src={Gameover} class="gameover" alt='gameover'/>
          {
            location.state.lcount === 3 && <img src={win} class="win" alt='gameover'/>
          }
          {
            location.state.rcount  === 3 && <img src={lose} class="win" alt='gameover'/>
          }
    
          
          <div className='last'>
          
          <Link to="/"><button class="return" >
          <img src={home} class="restart" alt='gameover'/>
          </button></Link>

          <Link to={`/${location.state.page}`}><button class="return">
          <img src={restart} class="restart re" alt='gameover'/>
          </button></Link>
          
          
         
          </div>
        </div>
        </div>
    </div>
  );
}

export default Popup;