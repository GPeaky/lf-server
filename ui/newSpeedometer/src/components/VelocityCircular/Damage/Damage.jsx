import React from 'react';
import "./Damage.css"
import key from "./images/key.png"
const Damage = () => {

const damagePercent = 65

  return (
      <>

        <div className="box">
              <img className="key" src={key} alt="llave"></img>
        <div className="percent">
          <svg className="svg">
            <circle className="circle" cx="30" cy="30" r="15">
            </circle>
            <circle className="circle" cx="30" cy="30" r="15" 
            style={{strokeDashoffset:( 95 - (95 * `${damagePercent}`)/100)}}
            ></circle>
          </svg>
        </div>
        </div>



      </>
  );
};

export default Damage;
