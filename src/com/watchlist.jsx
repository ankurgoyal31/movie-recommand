import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
  import { useNavigate } from 'react-router-dom';
  import { useContext } from 'react';
import { scontex } from './contx';
// import { send } from 'vite';
const watchlist = () => {
           const navigate = useNavigate();
    const [first, setfirst] = useState([])
    const[f,s] = useState([])  
    const[r,h] = useState([]);
    const{pro} = useContext(scontex)
       console.log("set pro ->",pro)
      const[sh,sht] = useState(null)
       
    async function get() {
         try{
          console.log(pro) 
        let y = await fetch(`${import.meta.env.VITE_BACKEND}/svs`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({em:pro})
        });
        const save = await y.json();
        console.log(save)
        let res = await fetch(`${import.meta.env.VITE_BACKEND}/watchl`,{
          method:'POST',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({em:pro})
        })
         let data = await res.json();
                 console.log(data)
                 if(!data.length){
 sht("Not List Hear")
 return
                 }
         setfirst(data);
         const final = data.map((item)=>save.filter(it=> it.movie===item.movie)[0])
         console.log("final",final)
         s(final);
         }catch(err){
            return "data nhi aya bahi watchlist ka ...."
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
  console.log("timeenjnjf ->",n,typeof(n))
navigate(
  `/com/cont/${encodeURIComponent(p)}`,
  {
    state: { time: n },
  }
);
};
useEffect(() => {
  // if (!pro) return;
  get()
}, [r])


const del=async(m,i)=>{
console.log(m,i)
let y = await fetch(`${import.meta.env.VITE_BACKEND}/del`,{
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
      <div className='setbox'> 
      <div className='fd'> 
     { first.length>0 &&
      first.map((item,i)=>{
        return<>
           <div  className='box'> 
                <img onClick={()=>sendWithTime(item.movie,f[i]?.watchTime)} className='img' src={`https://image.tmdb.org/t/p/w500${item.img}`} alt="" />
<div className='time'>you watched: {f[i]?.watchTime != null? `${Math.floor(f[i].watchTime / 60)} : ${f[i].watchTime % 60}` : "00 : 00"}
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
