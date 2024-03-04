import React from 'react'
import "./home.css"
import logo from "../public/logo.png"
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div class="background">
    <div  className="blur">
    <div>
      <img src={logo}/>
    </div>
    <div className='butons'>
    <Link to='/single'><button>SinglePlayer</button></Link>
    <Link to='/multiple'><button>MultiPlayer</button></Link> 
    </div>
    </div>
    </div>
  )
}

export default Home