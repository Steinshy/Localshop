import { Routes, Route, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

// Components
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Pages
import Home from "./routes/home";
import ProductPage from "./routes/productPage";
import AboutUs from "./routes/aboutUs";

// CSS
import "./styles/App.css";

const App = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <>
        <Navbar />
        {/* <ProductPage />
        <AboutUs />
        <Footer /> */}
      </>
        <Routes>
          <Route element={<Home />} />
          <Route element={<ProductPage />} />
          <Route element={<AboutUs />} />
        </Routes>
    </NextUIProvider>
  );
};

export default App;
