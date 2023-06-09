import {ReactNode} from "react";

interface Props {
  children: ReactNode;
}

const Container = ({children}: Props) => {
  return (
    <div className={"container mx-auto max-w-5xl flex flex-col h-screen bg-gradiant"}>
      {
        children
      }
    </div>
  );
};

export default Container;