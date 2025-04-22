import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryList from './pages/CountryList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
      </Routes>
    </Router>
  );
}

export default App;
