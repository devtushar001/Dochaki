import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, Link } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Panel from "./pages/Panel/Panel";
import NewAdd from "./pages/NewAdd.jsx/NewAdd";
// import RoomItem from "./components/RoomItem/RoomItem";

function App() {

  return (
    <>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/panel" element={<Panel />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/new-add" element={<NewAdd />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
