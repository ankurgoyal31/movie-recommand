import { useContext, useState } from "react";
import { scontex } from "./contx";
import { Link } from "react-router-dom";
import { useEffect } from "react";   
   import { useLocation } from "react-router-dom";

// import { useState } from "react";

import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const {pro ,search, setsearch } = useContext(scontex);
      const[sho,notsho] = useState(false)
      const[open,notopen] = useState(false)
 const[m,n] = useState("")
// async function login() {
//     const token = localStorage.getItem("token");
//      let res = await fetch(`${import.meta.env.VITE_BACKEND}/profile`, {
// method: "GET",
// headers: {
// Authorization: `Bearer ${token}`, 
// },
// })
// if(res.ok){
//    notsho(true)
// }
// if(!res.ok){
//    notsho(false)
// } 
//    }
useEffect(() => { 
  // const token = localStorage.getItem("token");
// const email = localStorage.getItem("email");
 let y =  localStorage.getItem("token")
 if(y){
notsho(true)
 }
 else{
  notsho(false)
 }
 }, []);

const rem = ()=>{
localStorage.removeItem("token");
localStorage.removeItem("email");
console.log("log out")
window.location.href = "/";
// navigate("/");
notsho(false);
}
const set= ()=>{
setsearch(m)
n("");
}
  return (
    <> 
 
    <nav className="navbar">
      {/* <div className="color">  */}
      <ul className={`menu ${open ? "open" : ""}`}>
        {!window.innerWidth >768 && <li style={{fontSize:'25px'}}>🏠</li>}
           <li>
  <Link className="hides" to="/">🏚️Home</Link>
</li>
        <li>
  <Link className="hides" to="/com/watchlist">👁️ Watched</Link>
</li>

<li>
  <Link className="hides" to="/about">ℹ️ About</Link>
</li>
       </ul>
     
      <div className={`search-box ${open ? "open" : ""}`}>
        <input value={m}
          onChange={(e) => n(e.target.value)}
          placeholder="Search movies..."
        />
      <button onClick={set}>🔍</button> 
      {/* </div> */}
        </div>
       <button className="mobile-search-btn" onClick={()=>notopen(!open)}>
  🔍 
</button>
 {sho && <> {pro && <div className="email">{pro}</div>} <div onClick={rem} className="loginbtn">LogOut</div></> }
{!sho && ( <span className="loginbtn"> <Link to="/login" className="nonef">Log In</Link></span>)} 
             </nav>

  
    </>
  );
};
export default Nav;
