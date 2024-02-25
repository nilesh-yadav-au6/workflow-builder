import { useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { updateCurrentFlow } from "../store/nodeSlice";
import { clearComputedData } from "../store/csvDataSlice";
import Dropdown, { Option } from "./DropDown";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
  const nodes = useAppSelector((state) => state.node.nodes);
  const edges = useAppSelector((state) => state.node.edges);

  const { id, flowName } = useAppSelector((state) => state.node.currentFlow);

  const nodeList =
    JSON.parse(window.localStorage.getItem("nodeList") as string) || [];

  const dispatch = useAppDispatch();

  const [saved, setSaved] = useState(false);

  const onSave = useCallback(() => {
    if (!flowName) {
      alert(
        "Create new flow by clicking new flow inside header dropdown. or Select from existing flows."
      );
      return;
    }
    // check edges if there are more than one node with no target throw error
    const nodesWithNoTarget = nodes.filter((node) => {
      // get all the edges for a node
      const nodeEdges = edges.filter((edge) => edge.source === node.id);

      // if no edges with source then it has no target
      return nodeEdges.length === 0;
    });

    // if there are more than one node with no target throw error
    if (nodesWithNoTarget.length > 1) {
      alert("There are more than one node with no target");

      return;
    }

    nodeList.push({ id, flowName, nodes, edges });

    window.localStorage.setItem("nodeList", JSON.stringify(nodeList));

    setSaved(true);
  }, [nodes, edges]);

  useEffect(() => {
    if (saved) {
      setTimeout(() => {
        setSaved(false);
      }, 1000);
    }
  }, [saved]);

  const options =
    nodeList &&
    nodeList?.map((item: { id: unknown; flowName: unknown }) => ({
      value: item.id,
      label: item.flowName,
    }));

  const onDropDownSelection = (option: Option) => {
    if (option.value === "new") {
      dispatch(
        updateCurrentFlow({
          id: uuidv4(),
          flowName: option.label,
          flowType: "new",
          nodes: [],
          edges: [],
        })
      );
    } else {
      const currentFlow = nodeList.filter(
        (itm: { flowName: string }) => itm.flowName === option.label
      );

      dispatch(
        updateCurrentFlow({
          id: currentFlow[0].id,
          flowName: option.label,
          flowType: "old",
          nodes: currentFlow[0].nodes,
          edges: currentFlow[0].edges,
        })
      );
    }
    dispatch(clearComputedData());
  };

  return (
    <div className="flex justify-between w-full bg-indigo-950 px-10 py-5 bg-blue-900 border-b-2 border-indigo-50">
      <p className="text-indigo-50">Workflow Builder</p>
      <Dropdown
        options={[...options, { value: "new", label: "New Flow" }]}
        onSelect={onDropDownSelection}
      />
      <button onClick={onSave} className="text-indigo-50">
        {saved ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default Header;
