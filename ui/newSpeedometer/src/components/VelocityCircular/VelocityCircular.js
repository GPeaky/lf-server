import React, { useEffect, useState } from "react";
import "./VelocityCircular.css";
import seatSafeGrey from "./images/seatBeltGrey.png"
import seatSafeWhite from "./images/seatBeltWhite.png"
import engineGrey from "./images/engineGrey.png"
import engineWhite from "./images/engineWhite.png"
import carLightWhite from "./images/carLightWhite.png"
import carLightGrey from "./images/carLightGrey.png"
import carDoorWhite from "./images/carDoorWhite.png"
import carDoorGrey from "./images/carDoorGrey.png"
import brakeAlertWhite from "./images/brakeAlertWhite.png"
import brakeAlertGrey from "./images/brakeAlertGrey.png"
import carBodyGrey from "./images/carBodyGrey.png"
import carBodyWhite from "./images/carBodyWhite.png"
import carWheelWhite from "./images/carWheelWhite.png"
import carWheelGrey from "./images/carWheelGrey.png"
import Damage from "./Damage/Damage";


const VelocityCircular = () => {

  // VALOR PARA VELOCÍMETRO, DE 0 A 100
  const [velocityNumber, setVelocityNumber] = useState(250)
  const maxVelocity = 250
  const velocityPorcents = velocityNumber * 100 / maxVelocity
  const velocityValue =  Math.round((100 - velocityPorcents)*-1.49)
  const[vel, setVel] = useState(velocityValue)

  useEffect(() => {
    setVel(Math.round((100 - velocityPorcents)*-1.49))
  }, [velocityNumber])

  setTimeout(() => {
    setVelocityNumber(35)
  }, 500);
  
  // VALOR PARA TANQUE DE NAFTA, DE 0 A 100
  let gasPorcents =89
  //
  let maxGas= 55
  let gasNumber = Math.round(maxGas*gasPorcents/100)
  let gasValue = (100 - gasPorcents)*-1.63

  const[gas, setGas] = useState(gasValue)


  // -149 a 0
  if (vel < -141){
    setVel(-141)
  }  
  if (vel > 0 ){
    setVel(0)
  }

  //  -163 a 0
  if (gas < -163){
    setGas(-163)
  }  
  if (gas > 0 ){
    setGas(0)
  }

  const [belt] = useState({
    on: seatSafeWhite,
    off: seatSafeGrey
  })
  const [engine] = useState({
    on: engineWhite,
    off: engineGrey
  })
  const [door] = useState({
    on: carDoorWhite,
    off: carDoorGrey
  })
  const [light] = useState({
    on: carLightWhite,
    off: carLightGrey
  })
  const [brake] = useState({
    on: brakeAlertWhite,
    off: brakeAlertGrey
  })
  
  const [body] = useState({
    on: carBodyWhite,
    off: carBodyGrey
  })
  const [wheel] = useState({
    on: carWheelWhite,
    off: carWheelGrey
  })
  
    // MARCHA
    // valores entre -1 y 6 como string
    const[gear] = useState("3")
    //

    let gearPrev = ""
    let gearCentral = gear
    let gearPost =(parseInt(gear) + 1).toString()
  
  
    if (gear === "-1"){
      gearPrev = "--"
      gearCentral = "R"
      gearPost = "N"
    }
    if (gear === "0"){
      gearPrev = "N"
      gearPost = "1"
    }
    if(gear === "1"){
      gearPrev = "N"
      gearPost = "2"
    }
    if(gear === "2"){
      gearPrev = "1"
      gearPost = "3"
    }
    if(gear === "3"){
      gearPrev = "2"
      gearPost = "4"
    }
    if(gear === "4"){
      gearPrev = "3"
      gearPost = "5"
    }
    if(gear === "5"){
      gearPrev = "4"
      gearPost = "6"
    }
    if (gear === "6"){
      gearPrev = "5"
      gearPost = "-"
    }
    
 


  return (
  <>
 <div className="velocimetro">

    <div className="gasContainer">

    <div className="marchas">
      <div className="marcha">
        {gearPrev}
      </div>
      <div className="marchaSelect">
        {gearCentral}
      </div>
      <div className="marcha">
        {gearPost}
      </div>
    </div>
      <div className="gas">
        <div className="cargaGas" style={{transform: `rotate(${gas}deg)`}} ></div>
      </div>
    <div className="valueGas">
        <h1>{gasNumber}</h1>
        <h3>L</h3>
      </div>
      <div className="iconGas"></div>
  </div>


 <div className="velocityContainer">

      
     
      <div className="vel">
        <div className="cargaVel" style={{transform: `rotate(${vel}deg)`}} ></div>
      </div>
      <img className="brake" alt="brake"src={brake.off}/>
     
      <div className="valueVelocity">
        <h1>{velocityNumber}</h1>
        <h3>KM/H</h3>
      </div>
      <div className="car">

<div className="alignWheel">
<img className="leftBackW" alt="leftBackW" src={wheel.on}/>
<img className="leftFrontW" alt="leftFrontW" src={wheel.off}/>
</div>

<img className="body" alt="body" src={body.off}/>

<div className="alignWheel">
<img className="rightFrontW" alt="rightFrontW" src={wheel.off}/>
<img className="rightFrontW" alt="rightFrontW" src={wheel.off}/>
</div>



</div>
      <div className="velIcons">
        <div className="velUl">
          <img className="velLi" alt="belt" src={belt.off}/>
          <img className="velLi" alt="eng" src={engine.on}/>
          <img className="velLi" alt="door" src={door.on}/>
          <img className="velLi" alt="light" src={light.off}/>
        </div>
      </div>
      
        <Damage className="damageComponent" />
      </div>
 </div> 
  </>
  
    )
};


export default VelocityCircular;