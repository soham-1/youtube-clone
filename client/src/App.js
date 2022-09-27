import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './redux/store'
import { Provider } from 'react-redux'

import './App.css';
import Explore from "./components/Explore/Explore";
import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import Signin from "./components/Signin/Signin";
import Logout from './components/Logout/Logout';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store} >
        <Navbar />
        <div className='d-flex'>
          <Menu />
          <div className='main container-fluid py-3'>
            <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/subscriptions" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
