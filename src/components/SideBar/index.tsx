import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import Papa from "papaparse";
import { addCsvData, clearComputedData } from "../../store/csvDataSlice";
import { clearNodesAndEdges } from "../../store/nodeSlice";
import NodeTypeRenderer, { NodeTypeProps } from "./NodeRenderer";
import Radio from "../Radio";

const options = [
  { label: "Ufo.csv", value: "ufo" },
  { label: "Population.csv", value: "population" },
];

interface SidebarProps {
  nodes: NodeTypeProps[];
}

const Sidebar: FC<SidebarProps> = ({ nodes }: SidebarProps) => {
  const dispatch = useAppDispatch();

  const [fileName, setFileName] = useState("");

  const handleRadioChange = (value: string) => {
    setFileName(value);
  };

  useEffect(() => {
    dispatch(clearComputedData());
    Papa.parse(`/${fileName}.csv`, {
      header: true,
      download: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (results) {
        dispatch(addCsvData(results.data));
        dispatch(clearComputedData());
      },
    });
  }, [fileName, dispatch]);

  return (
    <div className="w-44 h-full bg-indigo-950 ">
      <div>
        {nodes?.map((node) => (
          <NodeTypeRenderer key={node.id} {...node} />
        ))}
      </div>
      <div className="w-full">
        <Radio options={options} onChange={handleRadioChange} />
      </div>
    </div>
  );
};

export default Sidebar;
