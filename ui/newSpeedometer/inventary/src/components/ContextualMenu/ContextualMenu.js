import React from 'react';
import "./ContextualMenu.css"


const MenuModal = ({x, y, showMenu}) => {


  const use = (e) => {
   
  }
  const give = (e) => {

  }
  const discard = (e) => {

  }

   const style = () => {
    return{
      position: 'absolute',
      top: y,
      left: x,
      display: showMenu ? "flex" : "none",
      
      
    };
  };



  return( 
    <div style={style()}>
    <div className="menu-modal">
      <button className="btn" onClick={(e) => {use(e)}}>Usar</button>
      <button className="btn" onClick={(e) =>{give(e)}}>Dar</button>
      <button className="btn" onClick={(e) => {discard(e)}}>Tirar</button>
    
    
    </div>
  </div>
  );
};


export default MenuModal;