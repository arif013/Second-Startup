// import { useState } from 'react'
import "./App.css";
import Header from "./Components/Header/Header";
import Cards from "./Components/Body/Cards";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UploadForm from "./Components/Form/UploadForm";




function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Header/>,
    },
    {
      path:"/upload",
      element:<UploadForm/>
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
