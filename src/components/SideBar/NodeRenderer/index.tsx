import { FC } from "react";
import { useDrag } from "react-dnd";
import { NodeTypes } from "../../Flow/Nodes/types";

export interface NodeTypeProps {
  id: string;
  label: string;
  type: NodeTypes;
}

const NodeTypeRenderer: FC<NodeTypeProps> = ({ id, type, label }) => {
  const [, drag] = useDrag(() => ({
    type: "node",
    item: { id, type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      id={id}
      ref={drag}
      className="w-auto p-2 bg-indigo-700 rounded-md m-2 text-center"
    >
      <p className="text-indigo-50">{label}</p>
    </div>
  );
};

export default NodeTypeRenderer;
