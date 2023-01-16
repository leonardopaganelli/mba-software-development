import React from 'react';
import Home from './screens/Home'
import Detail from "./screens/Detail";

import { Routes, Route , BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:lawsuitId" element={<Detail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
