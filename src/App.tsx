import { Home } from './components/pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router';


function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
  </Routes>
  </BrowserRouter>;
}

export default App;
