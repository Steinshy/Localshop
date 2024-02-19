import { Routes, Route, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

// Components
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Pages
import Home from "./page";
import ProductPage from "./products/page";
import AboutPage from "./about/page";

// CSS
import "./styles/App.css";

const App = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <>
        <Navbar />
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product-page" element={<ProductPage />} />
          <Route path="about-us" element={<AboutPage />} />
        </Routes> */}
        {/* <Footer /> */}
      </>
    </NextUIProvider>
  );
};

export default App;
