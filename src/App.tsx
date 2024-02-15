import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Pages
import Home from "./routes/home";
import ProductPage from "./routes/productPage";
import AboutUs from "./routes/aboutUs";

// CSS
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/productPage" element={<ProductPage />} />
          </Routes>
      </Router>
      <Footer /> */}
    </>
  );
};

export default App;
