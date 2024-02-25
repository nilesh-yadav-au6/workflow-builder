import { XYPosition } from "reactflow";
import { NodeData, NodeTypes } from "../components/Flow/Nodes/types";

class LinkedListNode {
  id: string;
  position: XYPosition;
  data: NodeData;
  type: NodeTypes | undefined;
  width: number | null | undefined;
  height: number | null | undefined;
  selected: boolean | undefined;
  positionAbsolute: XYPosition | undefined;
  dragging: boolean | undefined;
  next: LinkedListNode | null;

  constructor(
    id: string,
    position: XYPosition,
    data: NodeData,
    type: NodeTypes | undefined,
    width: number | null | undefined,
    height: number | null | undefined,
    selected: boolean | undefined,
    positionAbsolute: XYPosition | undefined,
    dragging: boolean | undefined
  ) {
    this.id = id;
    this.position = position;
    this.data = data;
    this.type = type;
    this.width = width;
    this.height = height;
    this.selected = selected;
    this.positionAbsolute = positionAbsolute;
    this.dragging = dragging;
    this.next = null;
  }
}

export default LinkedListNode;
