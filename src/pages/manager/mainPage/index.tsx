import {ManagerHeader} from "@/layout";
import {Container} from "@/containers";
import ManagerProducts from "@/pages/manager/products/ManagerProducts";

const MainManagerPage = () => {
  return (
    <Container>
      <ManagerHeader/>
      <ManagerProducts/>
    </Container>
  );
};

export default MainManagerPage;