import Login from './components/Login';
import bottomImg from './img/bottom.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={bottomImg} className='bottomImg' />
      <Login />
    </div>
  );
}

export default App;
