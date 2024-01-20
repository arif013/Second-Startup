import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage.jsx"
import Header from "./Components/Header/Header.jsx"
import Body from "./Components/Body/Body.jsx";
import SignIn from "./Components/Signin/Singin.jsx";
import SignUp from "./Components/Signin/Signup.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UploadForm from "./Components/Form/UploadForm";




function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: (
        <>
        <Header/>
      <LandingPage/>
      </>
      )
    },
    {
      path: "/shoes",
      element: (
        <>
        <Header/>
      <Body/>
      </>
      )
    },
    {
      path:"/sell",
      element:(
        <>
        <Header/>
      <UploadForm/>
      </>
      )
    },
    {
      path: "/signin",
      element:(
        <>
        <Header/>
        <SignIn/>
        </>
      )
    },
    {
      path: "/signup",
      element:(
        <>
        <Header/>
        <SignUp/>
        </>
      )
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
