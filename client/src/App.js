import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Main from './views/Main';
import PetForm from './components/Petform';
import Update from './components/Update';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      <h1>Pet Shelter</h1>
      <BrowserRouter>
      <Routes>
        <Route element={<Main/>} path='/' default/>
        <Route element={<PetForm/>} path='/pets/new' />
        <Route element={<Update/>} path='/pets/:id/edit'/>
        <Route element={<Detail/>} path='/pets/:id'/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
