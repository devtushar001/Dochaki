import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, Link } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Panel from "./pages/Panel/Panel";
// import NewAdd from "./pages/NewAdd.jsx/NewAdd";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {

  const url = 'http://localhost:8000';

  return (
    <>
    <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Panel url={url} />} />
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          {/* <Route path="/new-add" element={<NewAdd />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App;
