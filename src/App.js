import { BrowserRouter as Router ,Routes,Route}from "react-router-dom"
import './App.css';
import Header from "./Component/Header";
import Home from "./Component/Home";
import Coins from "./Component/Coins";
import Coindetails from "./Component/Coindetails";
import Exchanges from "./Component/Exchanges";
import Footer from "./Component/Footer";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route element={<Home/>} path = "/"/>
        <Route element={<Coins/>} path = "/coins"/>
        <Route element={<Exchanges/>} path = "/exchanges"/>
        <Route element={<Coindetails/>} path = "/coin/:id"/>
      </Routes>
      <Footer/>
    </Router>  
  );
}

export default App;
