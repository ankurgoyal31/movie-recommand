import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { scontex } from "./contx";
import { Link } from "react-router-dom";

function Cont() {
  const { movie } = useParams();
  const { state } = useLocation();
  const { pro } = useContext(scontex);
  const navigate = useNavigate();
   const safeMovie = decodeURIComponent(movie);
  console.log(safeMovie)
  const resumeTime = state?.time ?? 0;
  const playerRef = useRef(null);
  const timerRef = useRef(null);
  const watchTimeRef = useRef(0);  
  const curr = useRef(0);
  const yesref = useRef(true);
  const fRef = useRef(null);
  const sty = useRef(null);
  const styu = useRef(null);

  const [mo, time] = useState(resumeTime);
  const [first, setfirst] = useState([]);
  const [dt, gs] = useState([]);
  const [f, d] = useState(null);
  const [ai, aiset] = useState(null);
  const [show, sets] = useState(true);
  const [sh, sho] = useState(null);
  const [u, l] = useState(true);
  const [sn, sm] = useState(true);
  const [likes, countlike] = useState(null);
  const [ulikes, ucountlike] = useState(null);
// console.log(process.env.Backend)

  function waitForYouTubeAPI() {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) resolve();
      const i = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(i);
          resolve();
        }
      }, 100);
    });
  }

 async function save() {
  console.log("calling.....")
  if (!first.length || !fRef.current) return;
  try{     
    if(yesref.current){
  let movie = first[0].movie
   console.log(fRef.current) 
  let sav = await fetch(`${import.meta.env.VITE_BACKEND}/savek`,{ 
    method:"POST",
    headers:{"Content-Type":"application/json"}, 
    body:JSON.stringify({em:pro,m:movie,watcht:watchTimeRef.current,gen:fRef.current.act,ge:fRef.current.overview})
 })
  console.log("call..........")
  if (typeof state === "object") {
 let sa = await fetch(`${import.meta.env.VITE_BACKEND}/store`,{ 
    method:"POST",
    headers:{"Content-Type":"application/json"}, 
    body:JSON.stringify({em:pro,m:movie,watcht:curr.current,gen:fRef.current.act,ge:fRef.current.overview})
 })
  }
   curr.current = 0;
 console.log(sav)
 yesref.current = false;
if (sav.ok) {
        yesref.current = true;
        console.log("nice.......");
}
  }
}
finally{
}
  }
 
  useEffect(() => {
    liked();
  }, [safeMovie]);

  async function liked() {
    try {
      const like = await fetch(`${import.meta.env.VITE_BACKEND}/count`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ m: safeMovie }),
      });

      const count = await like.json();
      countlike(count.length);

      const check = count.filter((item) => item.email === pro);
      if (check.length > 0) sty.current.style.color = "green";
      else sty.current.style.color = "white";

      const unl = await fetch(`${import.meta.env.VITE_BACKEND}/unl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ m: safeMovie }),
      });

      const uncount = await unl.json();
      ucountlike(uncount.length);

      const che = uncount.filter((item) => item.email === pro);
      if (che.length > 0) styu.current.style.color = "red";
      else styu.current.style.color = "white";
    } catch (err) {
      console.log("like/unlike error", err);
    }
  }
  const like = async () => {
    if (!fRef.current) return;

    await fetch(`${import.meta.env.VITE_BACKEND}/store`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        em: pro,
        like: 1,
        m: safeMovie,
        gen: fRef.current.act,
        ge: fRef.current.overview,
      }),
    });

    liked(); 
  };

  const unlike = async () => {
    if (!fRef.current) return;

    await fetch(`${import.meta.env.VITE_BACKEND}/store`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        em: pro,
        unlike: 1,
        m: safeMovie,
        gen: fRef.current.act,
        ge: fRef.current.overview,
      }),
    });

    liked(); 
  };
   useEffect(() => {
    async function get() {
      console.log("get",safeMovie)
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/lo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ it: safeMovie }),
        });
        const dat = await res.json();
        console.log(dat)
        setfirst(dat);

        const x = await fetch(`${import.meta.env.VITE_BACKEND}/recommend`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ em: pro, query: safeMovie }),
        });
        const rec = await x.json();
        gs(rec);
        l(false);

        const re = await fetch(`${import.meta.env.VITE_BACKEND}/some`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ p: safeMovie }),
        });
        const da = await re.json();
        d(da);
        fRef.current = da;
      } catch {
        sho("Check Your Connection");
        l(false);
      }
    }
    get();
  }, [safeMovie]);

 
  useEffect(() => {
    console.log("next movie...->",first);

    if (!first.length) return;
     waitForYouTubeAPI().then(() => {
      if (
        playerRef.current &&
        typeof playerRef.current.loadVideoById === "function"
      ) {
        playerRef.current.loadVideoById(first[0].video, mo);
        return;
      }

      playerRef.current = new window.YT.Player("content", {
        width: "100%",
        height: "100%",
        videoId: first[0].video,
        playerVars: {
          start: mo,
          origin: window.location.origin,
        },
        events: {
          onStateChange,
        },
      });
      sm(false);
    });
  }, [first]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);
//   useEffect(() => {
//   return () => {
//     if (playerRef.current) {
//       try {
//         playerRef.current.pauseVideo();
//         playerRef.current.stopVideo();
//         playerRef.current.destroy();
//       } catch (e) {
//         console.log("YT cleanup error");
//       }
//       playerRef.current = null;
//     }
//   };
// }, []);


  function onStateChange(event) {
    if (event.data === window.YT.PlayerState.PLAYING) {
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          watchTimeRef.current++;
          curr.current++;
        }, 1000);
      }
    }
   if (event.data === window.YT.PlayerState.PAUSED) {
         save();
    console.log("save Time -> ",watchTimeRef)
      clearInterval(timerRef.current);
    timerRef.current = null;
   }
    if (event.data === window.YT.PlayerState.BUFFERING) {
     clearInterval(timerRef.current);
    timerRef.current = null;
  }
   if (event.data === window.YT.PlayerState.ENDED) {
    clearInterval(timerRef.current);
    timerRef.current = null;
    console.log("final watch time:", watchTimeRef.current);
  }
  }

  const send = async(p) => {
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
  };

  const add = async (a, b, c, d1, e, f1, g, h, i) => {
    await fetch(`${import.meta.env.VITE_BACKEND}/addM`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ em: pro, m: a, n: b, o: c, p: d1, q: e, r: f1, s: g, t: h, u: i }),
    });
  };

  const des = async () => {
    sets(true);
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/ais`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: safeMovie }),
    });
    const dat = await res.json();
    aiset(dat.data);
  };

  return (
    <>
      {ai && show && (
        <div className="aiback">
          <h2 onClick={() => sets(false)}>X</h2>
          <div className="setai">{ai}</div>
        </div>
      )}

      <div className="vid">
        <div id="content"></div>
      </div>

      {first.length > 0 && (
        <div className="sep">
          <h1>{first[0].title}</h1>
          <h1>{first[0].des}</h1>
        </div>
      )}

      <div className="df">
        <div className="icon">
          <div ref={sty} onClick={like}>
            <HiHandThumbUp size={20} />
          </div>
          {likes && <div className="liked">{likes}</div>}

          <div ref={styu} onClick={unlike} className="like">
            <HiHandThumbDown size={20} />
          </div>
          {ulikes && <div className="lined">{ulikes}</div>}
        </div>

        <div className="save">
          <div>
            <AiOutlinePlus size={20} color="white" />
          </div>
          {pro && <div
            onClick={() =>
              add(
                f.title,
                f.overview,
                f.poster_path,
                f.original_title,
                f.popularity,
                f.vote_average,
                f.act,
                f.original_language,
                f.release_date
              )
            }
            className="cv"
          >
            Save
          </div>}
          {! pro &&<div className="cv">
          <Link style={{color:"white",textDecoration:'none'}} to="/login">Login to save</Link>   
          </div>}
        </div>
        <div onClick={des} className="ai">
          Summry
        </div>
      </div>

      {f && (
        <>
          <div className="rate">
            <AiFillStar size={20} color="gold" />
            <div>{f.vote_average}</div>
          </div>
          <div className="sty">About Movie - {f.overview}</div>
        </>
      )}
  {sh && <h1 className="hd">{sh}</h1>}
  {u && <h1 className="hp">loading.....</h1>}
       <h1 >All Recommended</h1>

      <div className="setbox2">
        <div style={{color:"white",fontSize:'20px'}} className="fd">
          {dt.map((item, i) => (
            <div key={item.id || i} className="box" onClick={() => send(item.title)}>
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt=""
              />
              {/* <div className="setkaro">{item.original_title}</div> */}
              <div className="setdata12">{item.release_date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* {sh && <h1 className="hd">{sh}</h1>}
      {u && <h1 className="hp">loading.....</h1>} */}
    </>
  );
}

export default Cont;
