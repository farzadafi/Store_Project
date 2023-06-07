import {ManagerHeader} from "@/layout";
import {Container} from "@/containers";
import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router";

const MainManagerPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/main-manager-page/products')
  }, []);

  return (
    <Container>
      <ManagerHeader/>
      <div>
        <Outlet/>
      </div>
    </Container>
  );
};

export default MainManagerPage;