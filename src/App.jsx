import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/ui/Layout';
import Home from './pages/Home';
import Read from './pages/Read';
import AITeacher from './pages/AITeacher';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import Voice from './pages/Voice';
import Test from './pages/Test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="read" element={<Read />} />
          <Route path="ai-teacher" element={<AITeacher />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
          <Route path="voice" element={<Voice />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
