import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import Dasboard from './component/Dasboard';
import Upload from './component/Upload';
import Profile from './component/Profile';
import AllMahasiswa from './component/AllMahasiswa';
import FAQ from './component/FAQ';
import ListMentors from './component/ListMentors';

function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dasboard' element={<Dasboard/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/mentor/list/Mahasiswa' element={<AllMahasiswa/>}/>
        <Route path='/FAQ' element={<FAQ/>}/>
        <Route path='/admin/list/mentors' element ={<ListMentors/>}/>
      </Routes>
    </Router>

  );
}

export default App;
