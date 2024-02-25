import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import Flow from "../components/Flow";
import { ReactFlowProvider } from "reactflow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Table, { Column } from "../components/Table";
import { useAppSelector } from "../hooks/hooks";
import { DataItem } from "../utils/helper";
import { Accordion, AccordionItem } from "../components/Accordion";
import { useState } from "react";
import { NodeTypes } from "../components/Flow/Nodes/types";
import DownloadButtons from "../components/DownloadButton";

const HomePage = () => {
  const nodes = [
    {
      id: NodeTypes.FILTER,
      label: "Filter",
      type: NodeTypes.FILTER,
    },
    {
      id: NodeTypes.SORT,
      label: "Sort",
      type: NodeTypes.SORT,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const headers = useAppSelector((state) => state.csvData.headers);
  const csvData = useAppSelector((state) => state.csvData.computedData);

  const tableData: DataItem[] = useAppSelector(
    (state) => state.csvData.computedData
  );

  const columns: Column[] = headers.map((item) => {
    const obj = { key: item, title: item.toUpperCase() } as Column;
    return obj;
  });

  return (
    <div className="h-screen">
      <Header />
      <DndProvider backend={HTML5Backend}>
        <div className="flex w-full h-full">
          <Sidebar nodes={nodes} />
          <div className="w-full h-full flex flex-col">
            <div className={`${isOpen ? "h-5/6" : "h-4/5"}`}>
              <ReactFlowProvider>
                <Flow />
              </ReactFlowProvider>
            </div>
            <div className={`w-full ${isOpen ? "h-1/2" : "h-0"}`}>
              <Accordion>
                <AccordionItem
                  title="Output"
                  isOpen={isOpen}
                  onAccordionClick={() => setIsOpen(!isOpen)}
                >
                  {tableData?.length > 0 ? (
                    <>
                      <DownloadButtons data={csvData} />
                      <Table columns={columns} data={tableData} />
                    </>
                  ) : (
                    <div>No Results to show</div>
                  )}
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default HomePage;
