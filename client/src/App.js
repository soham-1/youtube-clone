import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './redux/store'
import { Provider } from 'react-redux'

import './App.css';
import Explore from "./components/Explore/Explore";
import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import Video from "./components/Video/Video";
import Signin from "./components/Signin/Signin";
import Logout from './components/Logout/Logout';
import Subscription from "./components/Subscription/Subscription";

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
              <Route path="/subscriptions" element={<Subscription />} />
              <Route path="/video/:id" element={<Video />} />
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
