import { Handle, NodeProps, Position } from "reactflow";
import {
  Condition,
  FilterNodeData,
  NumberConditions,
  TextConditions,
} from "./types";
import { FC, useEffect, useState } from "react";
import {
  useAppSelector,
  useAppDispatch,
  useLinkedList,
} from "../../../hooks/hooks";
import { updateNodeValue } from "../../../store/nodeSlice";
import { computNewCsvData } from "../../../store/csvDataSlice";
import NodeWrapper from "./NodeWrapper";
import Button from "../../Button";
import SelectInput from "../../SelectInput";

const numberConditions = [
  NumberConditions.DATA_NOT_EMPTY_NULL,
  NumberConditions.NUMBER_EQUALS,
  NumberConditions.NUMBER_IS_GREATER_THAN,
  NumberConditions.NUMBER_IS_GREATER_THAN_OR_EQUALS,
  NumberConditions.NUMBER_IS_LESS_THAN,
  NumberConditions.NUMBER_IS_LESS_THAN_OR_EQUALS,
];

const textConditions = [
  TextConditions.DATA_NOT_EMPTY_NULL,
  TextConditions.TEXT_DOES_NOT_INCLUDES,
  TextConditions.TEXT_INCLUDES,
  TextConditions.TEXT_EXACTLY,
  TextConditions.TEXT_NOT_EXACTLY,
];

const Filter: FC<NodeProps<FilterNodeData>> = ({ id }) => {
  const nodeState = useAppSelector((state) => state.node.nodes);
  const edges = useAppSelector((state) => state.node.edges);
  const headers = useAppSelector((state) => state.csvData.headers);

  const dispatch = useAppDispatch();

  const generateLinkedlist = useLinkedList(nodeState, edges);

  const [matchingCondition, setMatchingCondition] = useState("");
  const [column, setColumn] = useState("");
  const [condition, setCondition] = useState("");

  const [conditionList, setConditionList] = useState<Condition[]>([]);

  useEffect(() => {
    dispatch(
      updateNodeValue({
        id,
        data: {
          matching: matchingCondition,
          condition,
          column,
        },
      })
    );
  }, [matchingCondition, column, condition, id]);

  const onRunButtonClick = () => {
    const res = generateLinkedlist();
    dispatch(
      computNewCsvData({
        head: res,
        nodes: nodeState,
      })
    );
  };

  const onSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColumn(e.target.value);
    if (e.target.value === "country") {
      setConditionList(textConditions);
    } else {
      setConditionList(numberConditions);
    }
    setCondition("");
  };

  return (
    <NodeWrapper>
      <Handle type="target" position={Position.Left} id="target" />
      <h6 className="text-indigo-50 border-b border-indigo-950 text-xs font-light">
        Filter
      </h6>
      <SelectInput
        value={column}
        label="Column"
        name="column"
        placeHolderText="Select column"
        optionsList={headers}
        onChange={onSelectionChange}
      />
      <SelectInput
        value={condition}
        name="condition"
        label="Condition"
        placeHolderText="Select condition"
        optionsList={conditionList}
        onChange={(e) => setCondition(e.target.value)}
      />
      {condition ? (
        <input
          className="w-full focus:outline-none border rounded mb-4"
          type="text"
          value={matchingCondition}
          onChange={(e) => setMatchingCondition(e.target.value)}
        />
      ) : null}
      <div>
        <Button title="Run" onClick={onRunButtonClick} />
      </div>
      <Handle
        type="source"
        isConnectable
        isConnectableStart
        position={Position.Right}
        id="source"
      />
    </NodeWrapper>
  );
};

export default Filter;
