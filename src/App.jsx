import Home from "./com/home";
import Cont from "./com/cont";
import Watchlist from "./com/watchlist";
import Nav from "./com/nav";
import About from "./com/about";
 import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Setpro from "./com/contx";
import Login from "./com/login";
function App() {
  const router = createBrowserRouter([
    {path: "/",element: <Home />},
    { path: "/com/cont/:movie", element: ( <>   <Nav />   <Cont />   </> ),},
    { path: "/com/watchlist", element: ( <>  <Nav />  <Watchlist />  </> ),},
    {path:"/login",element:(<> <Nav/><Login/></>)},
        {path:"/about",element:(<><Nav/><About/></>)}

  ]);

  useEffect(() => {
    if (window.YT) return;
    const scri = document.createElement("script");
    scri.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(scri);
  }, []);

  return (
    <> 
    <Setpro>
      <RouterProvider router={router} />
    </Setpro>
     
    </>
  );
}

export default App;