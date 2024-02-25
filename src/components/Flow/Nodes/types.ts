import { Node } from "reactflow";

export enum NodeTypes {
  FILTER = "FILTER",
  SORT = "SORT",
}

export enum SortOrder {
  ASEC = "asec",
  DESC = "desc",
}

export interface FilterNodeData {
  column: string;
  condition: string;
  matching: string;
}

export interface SortNodeData {
  columnName: string;
  sortOrder: SortOrder;
}

export interface FilterNode extends Node<FilterNodeData, NodeTypes.FILTER> {
  type: NodeTypes.FILTER;
}

export interface ImageNode extends Node<SortNodeData, NodeTypes.SORT> {
  type: NodeTypes.SORT;
}

export type Nodes = FilterNode | ImageNode;

export type NodeData = FilterNodeData | SortNodeData;

export enum NumberConditions {
  NUMBER_EQUALS = "number equals",
  NUMBER_IS_GREATER_THAN = "number is greater than",
  NUMBER_IS_GREATER_THAN_OR_EQUALS = "number is greater than or equals",
  NUMBER_IS_LESS_THAN = "number is less than",
  NUMBER_IS_LESS_THAN_OR_EQUALS = "number is greater less or equals",
  DATA_NOT_EMPTY_NULL = "data is not empty or null",
}

export enum TextConditions {
  TEXT_EXACTLY = "text is exactly",
  TEXT_NOT_EXACTLY = "text is not exactly",
  TEXT_INCLUDES = "text includes",
  TEXT_DOES_NOT_INCLUDES = "text does not includes",
  DATA_NOT_EMPTY_NULL = "data is not empty or null",
}

export type Condition = NumberConditions | TextConditions;

export const labelsMap = {
  [NodeTypes.FILTER]: "FILTER",
  [NodeTypes.SORT]: "SORT",
};
