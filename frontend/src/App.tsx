import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import StartPage from "./page/StartPage";
import NewGamePage from "./page/NewGamePage";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path={"/"} element={<StartPage/>}/>
          <Route path={"/newgame"} element={<NewGamePage/>}/>
      </Routes>

    </div>
  );
}

export default App;
