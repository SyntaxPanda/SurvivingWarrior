import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import StartPage from "./page/StartPage";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path={"/"} element={<StartPage/>}/>
      </Routes>

    </div>
  );
}

export default App;
