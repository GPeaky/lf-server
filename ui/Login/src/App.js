import Login from './components/Login';
import bottomImg from './img/bottomImg.jpg'
import bottomSvg from './img/bottomSvg.svg'
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={bottomImg} className='bottomImg' alt="bottom"  />
      <img src={bottomSvg} className='bottomSvg' alt="bottom" />
      <Login />
    </div>
  );
}

export default App;
