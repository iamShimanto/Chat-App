import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Layout from "./layouts/Index";
import Home from "./pages/Home";
import Reset from "./pages/Reset";
import Profile from "./pages/Profile";
import Settigns from "./pages/Settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settigns />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
