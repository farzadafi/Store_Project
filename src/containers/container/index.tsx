import {ReactNode} from "react";

interface Props {
  children: ReactNode;
}

const Container = ({children}: Props) => {
  return (
    <div className={"container mx-auto max-w-5xl mt-4 flex flex-col h-screen"}>
      {
        children
      }
    </div>
  );
};

export default Container;