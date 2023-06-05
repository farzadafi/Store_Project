import {Basket, HomePage, InventoryAndPrices} from "@/pages";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container} from "@/containers";
import {CookiesProvider} from "react-cookie";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CookiesProvider>
      <Container>
        <Router>
          <Routes>
            <Route path={"/"} Component={HomePage}></Route>
            <Route path={"/inventory-and-prices"} Component={InventoryAndPrices}></Route>
            <Route path={"/basket"} Component={Basket}></Route>
          </Routes>
        </Router>
        <ToastContainer />
      </Container>
    </CookiesProvider>
  );
}

export default App;
