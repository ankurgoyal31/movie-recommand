// import { json } from "express";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[name,setname] = useState("");
  const[msg,smsg] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
   };
const send=async()=>{
  if(name==="" || email==="" || password===""){
    smsg("please fill the required field");
    return;
  }
  smsg("");
    let data = await fetch(`${import.meta.env.VITE_BACKEND}/user`,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,password})
    }) 

    const res = await fetch(`${import.meta.env.VITE_BACKEND}/login`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, password }),
});
const dat = await res.json();
if (!res.ok) {
alert("Login failed");
return;
}
localStorage.setItem("token", dat.token);
window.location.href = "/";
 }
  return ( 
    <> 
    {msg!=="" && <><h1 className="messageset" style={{color:"white",position:'absolute',top:'10%'}}>{msg}</h1></>}
    <div className="login-page">
       <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

 <div className="field">
          <label>name</label>
          <input type="name"  placeholder="enter name" value={name} onChange={(e) => setname(e.target.value)} required/>
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" placeholder="enter email"value={email}  onChange={(e) => setEmail(e.target.value)}  required/>
        </div>

        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>

        <button onClick={send} className="login-btn">Login</button>

        <div className="extra">
          <span>Forgot password?</span>
          <span className="link">Create account</span>
        </div>
      </form>
    </div>
    </>
  );
}

export default Login;