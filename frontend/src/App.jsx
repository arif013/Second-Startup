import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage.jsx"
import Header from "./Components/Header/Header.jsx"
import Body from "./Components/Body/Body.jsx";
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
