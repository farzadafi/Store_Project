import {ReactNode} from "react";
import {NormalHeader} from "@/layout";

interface Props {
  children: ReactNode;
}

const Container = ({children}: Props) => {
  return (
    <div>
      <NormalHeader/>
      {
        children
      }
    </div>
  );
};

export default Container;