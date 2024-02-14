import "./App.css";
import ProductList from "./components/productList";
import HeaderNav from "./components/headernav";
import Footer from "./components/footer";

const App = () => {
  return (
    <>
      <HeaderNav />
      <ProductList />
      <Footer />
    </>
  );
};

export default App;
