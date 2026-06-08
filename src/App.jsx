import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Orders from './pages/Orders';
import InfoPlaceholder from './pages/InfoPlaceholder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="orders" element={<Orders />} />
          <Route path="info" element={<InfoPlaceholder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
