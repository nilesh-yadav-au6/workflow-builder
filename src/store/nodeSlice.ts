import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
} from "reactflow";
import { NodeData, NodeTypes } from "../components/Flow/Nodes/types";
import { v4 as uuidv4 } from "uuid";

const dummyNode = {
  [NodeTypes.FILTER]: {
    data: { column: "", condition: "", matching: "" },
  },
  [NodeTypes.SORT]: {
    data: {
      columnName: "",
      sortOrder: "",
    },
  },
};

export type NodeState = {
  nodes: Node<NodeData, NodeTypes>[];
  edges: Edge[];
  currentFlow: { id: string; flowName: string };
};

const initialState: NodeState = {
  nodes: [],
  edges: [],
  currentFlow: { id: "", flowName: "" },
};

export const nodeSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node<NodeData, NodeTypes>>) => {
      state.nodes.push(action.payload);
    },
    onNodesChange: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes) as Node<
        NodeData,
        NodeTypes
      >[];
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    updateNodeValue: (state, action) => {
      const nodes = [...state.nodes];
      const objectIndex = nodes.findIndex(
        (obj) => obj.id === action.payload.id
      );

      if (objectIndex !== -1) {
        state.nodes[objectIndex] = {
          ...nodes[objectIndex],
          data: action.payload.data,
        };
      }
    },
    onDrop: (state, action) => {
      if (!state.currentFlow.flowName) {
        alert(
          "Create new flow by clicking new flow inside header dropdown. or Select from existing flows."
        );
        return;
      }
      const { type } = action.payload.item;
      const offset = action.payload.monitor.getClientOffset();
      const nodes = state.nodes;

      const lastNode = nodes[nodes.length - 1];

      const x = offset?.x || lastNode.position.x + 10;
      const y = offset?.y || lastNode.position.y + 10;

      const newNode = {
        id: uuidv4(),
        position: { x: x, y: y },
        data: dummyNode[type as NodeTypes].data as NodeData,
        type,
      };
      state.nodes.push(newNode);
    },
    updateCurrentFlow: (state, action) => {
      state.currentFlow = {
        id: action.payload,
        flowName: action.payload.flowName,
      };
      if (action.payload.flowType === "new") {
        state.edges = [];
        state.nodes = [];
      } else {
        state.edges = action.payload.edges;
        state.nodes = action.payload.nodes;
      }
    },
    clearNodesAndEdges: (state) => {
      state.nodes = [];
      state.edges = [];
      state.currentFlow = { id: "", flowName: "" };
    },
  },
});

export const {
  addNode,
  onEdgesChange,
  onNodesChange,
  onConnect,
  updateNodeValue,
  onDrop,
  updateCurrentFlow,
  clearNodesAndEdges,
} = nodeSlice.actions;

export const nodeList = (state: RootState) => state;
export default nodeSlice.reducer;
