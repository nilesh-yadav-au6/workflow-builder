import { Handle, NodeProps, Position } from "reactflow";
import { SortNodeData, SortOrder } from "./types";
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

const Sort: FC<NodeProps<SortNodeData>> = ({ id }) => {
  const nodeState = useAppSelector((state) => state.node.nodes);
  const edges = useAppSelector((state) => state.node.edges);
  const headers = useAppSelector((state) => state.csvData.headers);

  const generateLinkedlist = useLinkedList(nodeState, edges);

  const dispatch = useAppDispatch();

  const [column, setColumn] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(
      updateNodeValue({
        id,
        data: {
          columnName: column,
          sortOrder: order,
        },
      })
    );
  }, [column, order, id]);

  const onRunButtonClick = () => {
    const res = generateLinkedlist();
    dispatch(
      computNewCsvData({
        head: res,
        nodes: nodeState,
      })
    );
  };

  return (
    <NodeWrapper>
      <Handle type="target" position={Position.Left} id="target" />
      <h6 className="text-indigo-50 border-b border-indigo-950 text-xs font-light">
        Sort
      </h6>
      <SelectInput
        name="column"
        value={column}
        label="Column"
        placeHolderText="Select column"
        optionsList={headers}
        onChange={(e) => {
          setColumn(e.target.value);
        }}
      />
      <SelectInput
        name="order"
        value={order}
        label="Order"
        placeHolderText="Select order"
        optionsList={[SortOrder.ASEC, SortOrder.DESC]}
        onChange={(e) => {
          setOrder(e.target.value);
        }}
      />
      <Button title="Run" onClick={onRunButtonClick} />
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

export default Sort;
