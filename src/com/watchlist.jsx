import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
  import { useNavigate } from 'react-router-dom';
  import { useContext } from 'react';
import { scontex } from './contx';
 const watchlist = () => {

    const navigate = useNavigate();
    const [first, setfirst] = useState([])
    const[f,s] = useState([])  
    const[r,h] = useState([]);
    const[loader,set_loader] = useState(true)
    const{pro} = useContext(scontex)
    const[sh,sht] = useState(null)
    const[handle_error,set_handle_error] = useState(false)
    async function get() {
        try {
  set_loader(true)
  set_handle_error(false)

  let y = await fetch(`${import.meta.env.VITE_BACKEND}/movie/svs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ em: pro })
  });
console.log(y.status)
  if (!y.ok) throw new Error("svs failed");
  const save = await y.json();
  let res = await fetch(`${import.meta.env.VITE_BACKEND}/movie/watchl`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ em: pro })
  });
   let data = await res.json();
  if ( data.length === 0) {
   sht("Not List Here");
   set_loader(false);
    return;
  }
  setfirst(data);
  const final = data.map(item => save.find(it => it.movie === item.movie));
  s(final);
  set_loader(false);
 }catch (err) {
   set_handle_error(true);
  set_loader(false);
}
    }
    useEffect(() => {
      if (!pro) return;
      console.log(pro)
     get();
    }, [pro])
    
    console.log(69/60)
    console.log(f)
  
const sendWithTime = (p, n) => {
navigate(`/com/cont/${encodeURIComponent(p)}`,{state: { time: n }}
);
};
useEffect(() => {
   get()
}, [r])


const del=async(m,i)=>{
console.log(m,i)
let y = await fetch(`${import.meta.env.VITE_BACKEND}/movie/del`,{
  method:'POST',
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({id:m})
})
h(i);
}
  return (
    <> 
      <div className='watchl'>

      <h1 style={{color:"white"}}>My Watch List</h1>
      {sh && <><h1 style={{color:"white",justifySelf:'center'}}>{sh}</h1></>}
      {loader && <><h1 style={{color:"white",justifySelf:'center'}}>Loading....</h1></>}
      {handle_error && <><h1 style={{color:"white",justifySelf:'center'}}>check your connection....</h1></>}
      <div className='setbox'> 
      <div className='fd'> 
     { first.length>0 &&
      first.map((item,i)=>{
        return<>
           <div  className='box'> 
                <img onClick={()=>sendWithTime(item.movie,f[i]?.watchTime)} className='img' src={`https://image.tmdb.org/t/p/w500${item.img}`} alt="" />
<div className='time'>watched {f[i]?.watchTime != null? `${Math.floor(f[i].watchTime / 60)} : ${f[i].watchTime % 60}` : "00 : 00"}
</div>                 <div className='text' key={i}>{item.movie}</div>
                       <div className='text'>{item.date}</div>
                       <div onClick={()=>del(item._id,i)} className='delet'>delete</div>
        </div>
        </>
        })
    }
    </div>
    </div>
    </div>
    </>
  )
}
 
export default watchlist
