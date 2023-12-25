import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages and components
// import Home from './components/Home'
import Search from './components/search'
import PetAdoptionPage from './components/adoption-page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='pages'>
        <Routes>
          <Route path ='/' element={<Search />}>
          
            </Route>
            <Route path='/adoption-page' element={<PetAdoptionPage/>}></Route>
        </Routes>
      </div>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
