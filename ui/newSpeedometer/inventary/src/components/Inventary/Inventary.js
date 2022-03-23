import React, { useEffect, useState } from "react";
import Items from "./drag&drop/Items";

const Inventary = (props) => {
  const [imagenes, setImg] = useState([]);

  useEffect(() => {
    elementos();
  }, []);

  

  const elementos = async () => {
  };

  return (
    <div>
      <Items items={[
        {
          id: 1,
          cash: 150,
          position: 1,
          img: imagenes[0],
          username: 'el pepe',
          weight: 250,
        },
        {
          id: 2,
          cash: 250,
          position: 4,
          img: imagenes[1],
          username: 'el pepardo',
          weight: 320,

        },
        {
          id: 3,
          cash: 40,
          position: 8,
          img: imagenes[2],
          username: 'Armadura',
          weight: 70,

        },
      ]} divs={40}/>
    </div>
  );
  
};

export default Inventary;