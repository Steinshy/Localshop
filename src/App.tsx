import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import HeaderNav from "./components/headernav";
import Footer from "./components/footer";

// Pages
import Home from "./routes/home";
import ProductPage from "./routes/productPage";

// CSS
import "./App.css";

const App = () => {
  return (
    <>
      <HeaderNav />
      <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/productPage" element={<ProductPage />} />
          </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
