import  {useState, useEffect} from 'react';



export default function useRightClickMenu(){
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [showMenu, setShowMenu] = useState(false)
    
    const hancleContextMenu = (e) => {
        e.preventDefault()
        // setX(e.pageX-200)
        e.pageX + 140  > window.innerWidth ? setX(`${window.innerWidth - 160}px`) : setX(e.pageX)
        // setY(e.pageY-150)
        e.pageY + 150  > window.innerHeight ? setY(`${window.innerHeight - 170}px`) : setY(e.pageY)

        const id = e.target.getAttribute('draggable') && e.target.getAttribute('draggable');
        id ? setShowMenu(true) : setShowMenu(false)
     
    }


    const handleClick = () => {
        showMenu && setShowMenu(false)
    }
    
    useEffect(() =>{
        document.addEventListener("click", handleClick)
        document.addEventListener("contextmenu", hancleContextMenu)
        return () => {
            document.removeEventListener("click", handleClick)
            document.removeEventListener("contextmenu", hancleContextMenu)
        }

    })

  return {x,y, showMenu}
}

