import {Basket, HomePage, InventoryAndPrices} from "@/pages";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container} from "@/containers";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path={"/"} Component={HomePage}></Route>
          <Route path={"/inventory-and-prices"} Component={InventoryAndPrices}></Route>
          <Route path={"/basket"} Component={Basket}></Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
