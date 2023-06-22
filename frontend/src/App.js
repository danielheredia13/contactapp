import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import UpdateContactScreen from "./Screens/UpdateContactScreen";
import CreateContactScreen from "./Screens/CreateContactScreen";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile/:id" element={<ProfileScreen />} />
        <Route path="/contact/:id" element={<UpdateContactScreen />} />
        <Route path="/contact" element={<CreateContactScreen />} />
      </Routes>
    </div>
  );
}

export default App;
