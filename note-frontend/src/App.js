import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Notes from './components/Notes';
import Form from './components/Form';
import UpdateForm from './components/Updatenote';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/notes" element={<Notes/>}></Route>
          <Route path='/updatenote' element={<UpdateForm/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
