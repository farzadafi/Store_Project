import {Footer, NormalHeader} from "@/layout";
import {Outlet, useNavigate} from "react-router";
import {Container} from "@/containers";
import {useEffect} from "react";


const HomePage = () => {
  const navigate = useNavigate();


  useEffect(() => {
    navigate("/main-products");
  }, []);

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