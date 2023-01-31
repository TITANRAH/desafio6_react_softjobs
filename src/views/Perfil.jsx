import { useContext, useState, useEffect } from "react";
import Context from "../Context";
import axios from "axios";

export default function Home() {
  const { setUsuario: setUsuarioGlobal } = useContext(Context);

  const [usuario, setUsuarioLocal] = useState({});

  const getUsuarioData = async () => {
    const urlServer = "https://desafio6nodesoft-production.up.railway.app";
    const endpoint = "/usuarios";
    const token = localStorage.getItem("token");
    console.log('token desde front',token)

    try {
      const {data} = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });
      
      console.log('data desde front', data)
      await setUsuarioGlobal(data);
      await setUsuarioLocal(data[0]);

      console.log('data:',usuario)
    } catch ({ response: { data: message } }) {
      alert(message + " 🙁");
      console.log(message);
    }
  };

  useEffect(() => {
    getUsuarioData();
  },[]);



  return (
    
    <div className="py-5">
  
      <h1>
        Bienvenido <span className="fw-bold">{usuario.email}</span>
      </h1>
      <h3>
        {usuario.rol} en {usuario.lenguage}
      </h3>
    </div>
  );
}
