
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import UserProfile from "./pages/UserDashboard/User"
import Home from './pages/Home';
import Admin from './pages/AdminDashboard/Admin';
import AdminRoute from './privateRoutes/AdminRoute';
import UserRoute from './privateRoutes/UserRoute';
import List from './pages/AdminDashboard/List';
import AddBooks from './pages/AdminDashboard/AddBooks';
import UpdateBook from './pages/AdminDashboard/UpdateBook';
import BookPdf from './pages/UserDashboard/BokkPdf';
import Orders from './pages/UserDashboard/Orders';



function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
    
      
      {/*admin private route */}
      
      <Route element={<AdminRoute/>}>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/list' element={<List/>}/>
      <Route path='/newBook' element={<AddBooks/>}/>
      <Route path='/updateBook/:id' element={<UpdateBook/>}/>
      </Route>
     {/*user private route */}
     <Route element={<UserRoute/>}>
      <Route path='/user' element={<UserProfile/>}/>
      <Route path="/book/pdf/:id" element={<BookPdf/>} />
      <Route path='/orders' element={<Orders/>}/>
     </Route>

      </Routes>
    </div>
  );
}

export default App;
