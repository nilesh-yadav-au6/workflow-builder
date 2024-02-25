import { useMemo } from "react";
import ReactFlow, {
  FitViewOptions,
  DefaultEdgeOptions,
  NodeTypes as FlowNodeTypes,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from "reactflow";
import { useDrop } from "react-dnd";
import FilterNode from "./Nodes/Filter";
import SortNode from "./Nodes/Sort";
import "reactflow/dist/style.css";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  onNodesChange,
  onConnect,
  onEdgesChange,
  onDrop,
} from "../../store/nodeSlice";
import { NodeTypes } from "./Nodes/types";

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const Flow = () => {
  const nodes = useAppSelector((state) => state.node.nodes);
  const edges = useAppSelector((state) => state.node.edges);

  const dispatch = useAppDispatch();

  const nodeTypes: FlowNodeTypes = useMemo(
    () => ({ FILTER: FilterNode, SORT: SortNode }),
    []
  );

  // drop ref for dropping nodes from node panel
  const [, dropRef] = useDrop({
    accept: "node",
    drop: (item: { id: string; type: NodeTypes }, monitor) =>
      // onDrop(item, monitor),
      dispatch(onDrop({ item, monitor })),
  });

  return (
    <ReactFlow
      ref={dropRef}
      nodes={nodes}
      edges={edges}
      onNodesChange={(e) => dispatch(onNodesChange(e))}
      onEdgesChange={(e) => dispatch(onEdgesChange(e))}
      onConnect={(e) => dispatch(onConnect(e))}
      fitView
      fitViewOptions={fitViewOptions}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Controls />
      <MiniMap nodeColor={""} />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
};

export default Flow;
