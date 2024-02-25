import { FC } from "react";
import { convertToCSV, convertToJSON } from "../utils/helper";
import Button from "./Button";

interface DownloadButtonsProps {
  data: Array<unknown>;
}

const DownloadButtons: FC<DownloadButtonsProps> = ({
  data,
}: DownloadButtonsProps) => {
  const handleDownloadCSV = () => {
    const csvData = convertToCSV(data);
    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.href = csvUrl;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJSON = () => {
    const jsonData = convertToJSON(data);
    const jsonBlob = new Blob([jsonData], {
      type: "application/json;charset=utf-8;",
    });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const link = document.createElement("a");
    link.href = jsonUrl;
    link.setAttribute("download", "data.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex w-full mb-4 justify-between">
      <Button title="Download CSV" onClick={handleDownloadCSV} />
      <Button title=" Download JSON" onClick={handleDownloadJSON} />
    </div>
  );
};

export default DownloadButtons;
