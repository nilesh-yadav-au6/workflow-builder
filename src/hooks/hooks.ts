import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { Node, Edge } from "reactflow";
import { NodeData, NodeTypes } from "../components/Flow/Nodes/types";
import LinkedListNode from "../utils/LinkedlistNode";

export const useLinkedList = (
  nodes: Node<NodeData, NodeTypes>[],
  edges: Edge[]
) => {
  const generateLinkedList = () => {
    const map: { [key: string]: LinkedListNode } = {};
    nodes.forEach((node) => {
      map[node.id] = new LinkedListNode(
        node.id,
        node.position,
        node.data,
        node.type,
        node.width,
        node.height,
        node.selected,
        node.positionAbsolute,
        node.dragging
      );
    });

    edges.forEach((edge) => {
      const sourceNode = map[edge.source];
      const targetNode = map[edge.target];
      if (sourceNode && targetNode) {
        sourceNode.next = targetNode;
      }
    });

    return map;
  };

  return generateLinkedList;
};

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
