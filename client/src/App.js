import { BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route
            path="/profile/:userId"
            element={<ProfilePage></ProfilePage>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
