import {HomePage} from "@/pages";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} Component={HomePage}></Route>
      </Routes>
    </Router>
  );
}

export default App;
