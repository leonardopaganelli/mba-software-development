import React from 'react';
import Home from './screens/Home'
import Detail from "./screens/Detail";
import Add from "./screens/Add";

import { Routes, Route , BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail" element={<Detail />} />
        <Route path="add" element={<Add />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
