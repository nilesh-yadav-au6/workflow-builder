import {
  NodeData,
  NodeTypes,
  NumberConditions,
  SortOrder,
  TextConditions,
} from "../components/Flow/Nodes/types";
import { Node } from "reactflow";
import LinkedListNode from "./LinkedlistNode";

export type ConditionsNumber = {
  condition:
    | NumberConditions.DATA_NOT_EMPTY_NULL
    | NumberConditions.NUMBER_EQUALS
    | NumberConditions.NUMBER_IS_GREATER_THAN
    | NumberConditions.NUMBER_IS_GREATER_THAN_OR_EQUALS
    | NumberConditions.NUMBER_IS_LESS_THAN
    | NumberConditions.NUMBER_IS_LESS_THAN_OR_EQUALS
    | TextConditions.TEXT_EXACTLY
    | TextConditions.TEXT_NOT_EXACTLY
    | TextConditions.TEXT_INCLUDES
    | TextConditions.TEXT_DOES_NOT_INCLUDES
    | TextConditions.DATA_NOT_EMPTY_NULL;
  column: string;
  matching: string;
};

export type ConditionsText = {
  columnName: string;
  sortOrder: string;
};

export type DataItem = Record<string, string> | Record<string, number>;

const filterArray = (
  data: DataItem[],
  condition: ConditionsNumber
): DataItem[] => {
  const { condition: cond, column, matching } = condition as ConditionsNumber;
  const result = [
    ...data.filter((item: DataItem) => {
      if (typeof item[column] === "number" || item[column] === null) {
        switch (cond) {
          case NumberConditions.NUMBER_IS_LESS_THAN:
            return item[column] < matching;
          case NumberConditions.NUMBER_IS_LESS_THAN_OR_EQUALS:
            return item[column] <= matching;
          case NumberConditions.NUMBER_EQUALS:
            return item[column] === matching;
          case NumberConditions.NUMBER_IS_GREATER_THAN_OR_EQUALS:
            return item[column] >= matching;
          case NumberConditions.NUMBER_IS_GREATER_THAN:
            return item[column] > matching;
          case NumberConditions.DATA_NOT_EMPTY_NULL:
            return item[column] === null ? false : true;
          default:
            return false;
        }
      } else {
        switch (cond) {
          case TextConditions.TEXT_EXACTLY:
            return (
              String(item[column]).toLowerCase() === matching.toLowerCase()
            );
          case TextConditions.TEXT_NOT_EXACTLY:
            return (
              String(item[column]).toLowerCase() !== matching.toLowerCase()
            );
          case TextConditions.TEXT_INCLUDES:
            return String(item[column])
              .toLowerCase()
              .includes(matching.toLowerCase());
          case TextConditions.TEXT_DOES_NOT_INCLUDES:
            return !String(item[column])
              .toLowerCase()
              .includes(matching.toLowerCase());
          case TextConditions.DATA_NOT_EMPTY_NULL:
            return String(item[column]) === null ? false : true;
          default:
            return false;
        }
      }
    }),
  ];

  return result;
};

const sort = (csvData: DataItem[], condition: ConditionsText) => {
  const { columnName, sortOrder } = condition;

  if (sortOrder === SortOrder.ASEC) {
    return csvData.slice().sort((a, b) => a[columnName] - b[columnName]);
  } else {
    return csvData.slice().sort((a, b) => b[columnName] - a[columnName]);
  }
};

export const computeTable = (
  head: LinkedListNode,
  cvsData: DataItem[],
  nodes: Node<NodeData, NodeTypes>[]
) => {
  let currentNode: LinkedListNode | null = head[
    [nodes[0].id]
  ] as LinkedListNode;
  let result = [] as DataItem[];
  const isResultEmpty = result.length === 0;
  result = isResultEmpty ? cvsData : result;
  while (currentNode) {
    if (currentNode.type === NodeTypes.FILTER) {
      const filtredArray = filterArray(
        result,
        currentNode.data as ConditionsNumber
      );
      result = filtredArray;
    } else if (currentNode.type === NodeTypes.SORT) {
      const sortedArray = sort(result, currentNode.data as ConditionsText);
      result = sortedArray;
    }
    currentNode = currentNode.next;
  }
  return result;
};

export const convertToCSV = (arr: DataItem[]) => {
  const array = [Object.keys(arr[0])].concat(arr);
  return array
    .map((it) => {
      return Object.values(it).join(",");
    })
    .join("\n");
};

export const convertToJSON = (arr: DataItem[]) => {
  const json = JSON.stringify(arr, null, 2);
  return json;
};
