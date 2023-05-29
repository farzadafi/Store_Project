import {ReactNode} from "react";
import {NormalHeader} from "@/layout";

interface Props {
  children: ReactNode;
}

const Container = ({children}: Props) => {
  return (
    <div className={"container mx-auto max-w-7xl m-4"}>
      <NormalHeader/>
      {
        children
      }
    </div>
  );
};

export default Container;