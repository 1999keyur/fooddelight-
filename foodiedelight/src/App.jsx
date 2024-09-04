import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import AddRestaurant from './components/AddRestaurant';
import EditRestaurant from './components/EditRestaurant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/add" element={<AddRestaurant />} />
        <Route path="/edit/:id" element={<EditRestaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
