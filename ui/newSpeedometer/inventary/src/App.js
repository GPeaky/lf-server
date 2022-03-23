import './App.css';
import Inventary from './components/Inventary/Inventary';
import MenuModal from './components/ContextualMenu/ContextualMenu'
import useRightClickMenu from './hook/useRightClickMenu';


function App() {


const {x, y, showMenu} = useRightClickMenu();
  return  (
    <div className="App">

    <Inventary/>  
    <MenuModal x={x} y={y} showMenu={showMenu}/>

    </div>
  );
}


export default App;



  


  
