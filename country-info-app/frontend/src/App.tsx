import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryList from './pages/CountryList';
import CountryDetail from './components/CountryDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:code" element={<CountryDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
