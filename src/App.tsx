import './App.css'
import HeaderComponent from './components/header/header'
import PokeSideBar from './components/pokeSideBar/pokeSideBar';

function App() {

  return (
    <div className='flex'>
      <PokeSideBar />
      <HeaderComponent />
    </div >
  );
}

export default App
