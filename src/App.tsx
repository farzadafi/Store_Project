import {Basket, HomePage, InventoryAndPrices} from "@/pages";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container} from "@/containers";
import {CookiesProvider} from "react-cookie";

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
      </Container>
    </CookiesProvider>
  );
}

export default App;
