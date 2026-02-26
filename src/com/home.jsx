import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react';
   import { useNavigate } from 'react-router-dom';
   import { scontex } from './contx';
  import { useContext } from 'react';
    import Nav from './nav';
    function Home() {
   const navigate = useNavigate();
   const rowRef = useRef(null);
  const [count, setCount] = useState([]);
  const [re,rs] = useState([]);
  const[s,snum] = useState([1,2,3,4,5,6,7,8,9,10]);
  const [l,m] = useState(true);
    const [p,o] = useState(false);
  const bx = useRef(null);
  const bd = useRef(null);
    const [co, setCo] = useState([]);
  const[er,err] = useState(null)
      const { search,pro, setpro } = useContext(scontex);
   const [profile, setProfile] = useState(null);
   const[msg,smsg] = useState("")
console.log("backend",import.meta.env.VITE_BACKEND)
  useEffect(() => {
         getdata()
  }, [pro]) 
  
   async function login() {
 try{ 
const token = localStorage.getItem("token");
if (!token) return;
let res = await fetch(`${import.meta.env.VITE_BACKEND}/profile`, {
method: "GET",
headers: {
Authorization: `Bearer ${token}`, 
},
})
let data = await res.json();
setProfile(data.user)
localStorage.setItem("email",data.user.email);
setpro(data.user.email);
 }catch(err){
  console.log("pata nhi bhai yaaar.....")
  }
   }
useEffect(() => { 
 login();
}, []);
console.log(profile)
async function getdata() {
  try {
  // const token = localStorage.getItem("token");
  // if(token){
m(false);
smsg("please Wait We are Loading Your Similier Data ...")
  // }
     let re = await fetch(`${import.meta.env.VITE_BACKEND}/similier`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ em: pro })
    });
    // smsg("please Wait We are Loading Your Similier Data ...")
  console.log("SIMILIERgtrgjgg:", re);
     let gd = await re.json();
     console.log("SIMILIER:", gd);
 
    if (Array.isArray(gd) && gd.length > 0) {
      m(false);
    let sort = gd.sort((a,b)=>b.vote_average-a.vote_average);
    let da = sort.filter(item => item.vote_average >=7.5||item.vote_average >=7||item.vote_average >=6).slice(0, 5);
      rs(da);
      setCount(gd);
      setCo(gd);
       console.log("sort movies=>",sort)
       smsg("")
       return;
    }
     let res = await fetch(`${import.meta.env.VITE_BACKEND}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ it: s[0] })
    });
    smsg("")
    if (!res.ok) throw new Error("movies api failed");
    const data = await res.json();
    console.log("i am chache...",data)
//      if(!re.ok && !Array.length){
//   smsg("")
// }
// setTimeout(() => {
      m(false);
      let sort = data.sort((a,b)=>b.vote_average-a.vote_average);
    let da = sort.filter(item => item.vote_average >=7.5||item.vote_average >=7||item.vote_average >=6).slice(0, 5);
    rs(da);
    setCount(data);
    setCo(data);
// }, 2000);
  } 
  catch (err) {
    console.error(err);
   }
}
  useEffect(() => {
     getdata()
  }, [])
   
const cl =(i)=>{
  if(s[i]>=500){
bx.current.style.backgroundColor = 'brown';
return
  }
if(i==s.length-1){
  console.log(i)
   const c =s[i]+1
   const pages = Array.from({ length: 10 }, (_, i) => i + c);
   console.log(pages)
   snum(pages)
}
console.log('hello orld f',s.length)
}

async function Gits(){
  let re = await fetch(`${import.meta.env.VITE_BACKEND}/get`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({k:search})
    }); 
      let h = await re.json();
       console.log(h)
       if(h.length==0){
        console.log("hello")
        m(false);
        o(true)
        console.log(count)
        setTimeout(() => {
        o(false) 
        setCount(co)
        }, 2000);
         return;
       }
           setCount(h)
                  m(false)
}
useEffect(() => {
  if(search){ 
    Gits();
    setCount([])
m(true)
o(false)}
 
}, [search])


const cd  = (i)=>{
  if(s[i]==1){ 
    bd.current.style.backgroundColor = 'brown';
    return
  }
      const c =s[i]-10;
     const pages = Array.from({ length: 10 }, (_, i) => c+i);
  console.log(pages,i)
  bd.current.style.backgroundColor = 'red';
  snum(pages)
}
const ck=async(p,i)=>{
 let res = await fetch(`${import.meta.env.VITE_BACKEND}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({it:s[i]})
    });
    if(res.ok){ 
      const data = await res.json();
    console.log(data)
    setCount(data)
    let da = data.filter(item => item.vote_average >=7.5||item.vote_average >=7||item.vote_average >=6).slice(0, 5);
       rs(da);
    }
    else{
      throw 'something went wrong';
    }
  }
  const send=async(p)=>{
console.log(p)
const send  = await fetch(`${import.meta.env.VITE_BACKEND}/search`,{
  method:'POST',
  headers:{ "Content-Type": "application/json" },
  body:JSON.stringify({ p }) 
})
if(send.ok){ 
  navigate(`/com/cont/${encodeURIComponent(p)}`,
);
}
else{
  throw new Error("somthing went wrong....")
}
const data = await send.json();
console.log(data)

  }
  return (
    <>
 <div> 
 <Nav/> 
</div>

{er && <><h1 style={{color:'white'}}>{er}</h1></>}

 <div className="hero-row" ref={rowRef}>
      {re.map((item,i) => (
        <div key={i} onClick={()=>send(item.title)} className="hero-card" >
          <img 
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            alt={item.title}
          />
         <div className="overlay">
    <button className="play-btn">▶</button>

    <div className="info">
      <h2>{item.title}</h2>
      <p>⭐ {item.vote_average}</p>
     </div>
   </div>
        </div> 

      ))}
    </div>
        {!msg=="" && <h1 className='mobilein' style={{color:'white',position:"absolute",top:'50%',zIndex:'1000',backgroundColor:"red",justifySelf:"center"}}>{msg}</h1>}
       <div className='fix'><h1 className='hk'>All Movies</h1></div>
{p && <><h1 className='hd'>No found..</h1></>}
{l && <><h1 className='hp'>loading.....</h1></>}
  
 <div className='setbox'> 
       <div className='id'> 
               <div className='fd'> 
     {
      count.map((item,i)=>{
        return(
           <div key={i} onClick={()=>send(item.title)} className='box'> 
                <img className='img' src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
                 <div className='text'>{item. release_date}</div>
        </div>
        )
      })
    }
    </div>
    </div>
    </div>
    {/* </div> */}

 <div className='dis'> 
<div ref={bd} onClick={()=>cd(0)} className='ne'>First</div>

 {
 s.map((item,i)=>{
return<>
<div onClick={()=>ck(item.title,i)}  className='ste'>{item}</div>
</>
 })
 }
 <div style={{color:'white', display:'flex',alignItems:'center',justifyContent:'center',fontSize:'60px'}}></div>
<div ref={bx} onClick={()=>cl(s.length-1)}className='ne'>Next</div>
</div>
 
     </>
  )
}

export default Home
