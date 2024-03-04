
import './App.css';
import Popup from './components/popup';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Single from './components/single';
import Home from './components/home';
import Multiple from './components/multiple';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/popup",
    element: <Popup/>,

  }
  ,
  {
    path: "/single",
    element: <Single/>,

  }
  ,{
    path: "/multiple",
    element: <Multiple/>,

  }

]);



export default router;
