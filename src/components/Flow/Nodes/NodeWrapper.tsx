import { FC, ReactNode } from "react";

interface NodeWrapperProps {
  children: ReactNode;
}

const NodeWrapper: FC<NodeWrapperProps> = ({ children }: NodeWrapperProps) => {
  return (
    <div className="px-4 py-2 bg-indigo-800 rounded-lg max-w-40">
      {children}
    </div>
  );
};

export default NodeWrapper;
