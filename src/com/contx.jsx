import { createContext, useState } from "react";

export const scontex = createContext();

export default function SetPro({ children }) {
  const [search, setsearch] = useState("");
const [pro, setpro] = useState(() => {return localStorage.getItem("email") || "";}); 
 return (
    <scontex.Provider value={{ search, setsearch,pro,setpro }}>
      {children}
    </scontex.Provider>
  );
}