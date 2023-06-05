import {Footer, NormalHeader} from "@/layout";
import {Outlet} from "react-router";
import {Container} from "@/containers";


const HomePage = () => {

  return (
    <Container>
      <NormalHeader/>
      <div className={"flex-grow"}>
        <Outlet/>
      </div>
      <Footer/>
    </Container>
  );
};

export default HomePage;