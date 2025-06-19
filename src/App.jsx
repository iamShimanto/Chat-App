import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Layout from "./layouts/Index"
import Home from "./pages/Home"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login/>}/>
          <Route path="/signup" element={<Registration />} />
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
