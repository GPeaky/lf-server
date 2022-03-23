import { useRef } from "react";
import "./Items.css";

const Items = ({ items, divs }) => {
  const itemDrag = useRef(null);
  
  const dragStart = (e, targetDiv) => {
    e.dataTransfer.setData("id", e.target.className.split(" ")[1]);
    e.dataTransfer.setData('targetDiv', targetDiv)
    e.target.style.boxShadow = "inset 0px 0px 15px 4px #82FF29";
  };
  
  const dragOver = (e, className) => {
    e.preventDefault();
    e.target.style.background = "rgb(56, 56, 56)";
  };
  
  const dragLeave = (e) => {
    e.target.style.background = "rgb(56, 56, 56)";
    e.target.style.boxShadow = "none";
  };

  const dragDrop = (e) => {
    e.target.style.background = "rgb(56, 56, 56)";
    const id = e.dataTransfer.getData("id");
    const targetDiv = e.dataTransfer.getData('targetDiv')
    const contentDiv = document.querySelector('.' + targetDiv + " .item." + id + " .contentDiv");
    const contentSlot = document.querySelector(
      '.' + targetDiv + " .item." + e.target.className.split(" ")[1] + " .contentDiv"
      );
      if (contentDiv && contentSlot) {
        const postHTML = contentSlot.innerHTML;
        contentSlot.innerHTML = contentDiv.innerHTML;
        e.target.setAttribute("draggable", "true");
        contentDiv.innerHTML = postHTML;
        const verifyItem = document.querySelector(
          '.' + targetDiv + " .item." + id + " .contentDiv img"
          );
          const slot = document.querySelector('.' + targetDiv + " .item." + id);
          document.querySelector('.' + targetDiv + " .item." + id).style.background = "#383838";
      if (verifyItem && slot) {
        slot.setAttribute("draggable", "true");
      } else {
        slot.setAttribute("draggable", "false");
      }
    }
  };

  const dragDropObject = (e, className) => {
    const id = e.dataTransfer.getData("id");
    const contentDiv = document.querySelector(".item." + id + " .contentDiv");
    const contentSlot = document.querySelector(
      "." + className + " .contentDiv"
    );
    const postHTML = contentSlot.innerHTML;
    contentSlot.innerHTML = contentDiv.innerHTML;
    document.querySelector("." + className).setAttribute("draggable", "true");
    contentDiv.innerHTML = postHTML;
    const verifyItem = document.querySelector(
      ".item." + id + " .contentDiv img"
    );
    const slot = document.querySelector(".item." + id);
    document.querySelector(".item." + id).style.background = " #383838";
    document.querySelector("." + className).style.background = " #383838";
    if (verifyItem && slot) {
      slot.setAttribute("draggable", "true");
    } else {
      slot.setAttribute("draggable", "false");
    }
  };

  const generateItems = (e) => {
    let showItems = [];
    for (let i = 1; i <= divs; i++) {
      const findItem = items.find((item) => item.position === i);
      const div = (
        <li
          className={"item item" + i}
          key={i}
          draggable={findItem ? "true" : "false"}
          ref={itemDrag}
          onDragStart={(event) => dragStart(event, e)}
          onDragOver={(event) => dragOver(event, ".item.item" + i)}
          onDragLeave={(event) => dragLeave(event)}
          onDrop={(event) => dragDrop(event)}
          unselectable="off"
        >
          {/* <div className="itemNumber" onDrop={(e) => dragDropObject(e, 'item.item' + i)} onDragOver={(event) => dragOver(event, '.item.item' + i)}>
              <h1>{i}</h1>
            </div> */}
          <div
            className="contentDiv"
            onDrop={(e) => dragDropObject(e, "item.item" + i)}
            onDragOver={(event) => dragOver(event, ".item.item" + i)}
          >
            {findItem ? (
              <img
                className="img imgItem"
                draggable="false"
                unselectable="on"
                alt="Imagenes"
              />
            ) : null}
            <h3 className="label">{findItem ? findItem.username : ""}</h3>
          </div>
        </li>
      );
      showItems.push(div);
    }
    return showItems;
  };

  const weight = items.map((item) => item.weight).reduce((a, b) => a + b);

  const Totals = () => {
    return (
      <>
        <div className="total">
          <div className="item">
            Weight
            <h3 className="label">{weight} kg</h3>
            <div className="counter">1</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="content">
      <div className="containerLeft">
        <div className="totales">
          <p className="verticalText">WEAPONS</p>
          <Totals />
          <Totals />
          <Totals />
          <Totals />
        </div>
        <div className="totales">
          <p className="verticalText">WEAPONS</p>
          <Totals />
          <Totals />
        </div>
      </div>

      <div className="containerUlLeft">
      <h4 className="ulTitle">0.56/50 kg</h4>
      <ul className="inventory_ul">{generateItems('inventory_ul')}</ul>
      <h4 className="ulTitle2">0.56/50 kg</h4>
      <ul className="inventory_ul2">
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
      </ul>
      </div>
      <div className="containerUlRight">
      <h4 className="ulTitle">0.56/50 kg</h4>
      <ul className="inventory_ulRight">{generateItems('inventory_ulRight')}</ul>
      <div className="itemAnchoContainer">
      
      <div className="itemAncho">   
      <div className="counterRight">
        1      
      </div>
      </div>
      <div className="itemAncho">   
      <div className="counterRight">
      1
      </div>
      </div>
      <div className="itemAncho">   
      <div className="counterRight">
      1
      </div>
      </div>
        
      </div>
      </div>
    </div>
  );
};

export default Items;
