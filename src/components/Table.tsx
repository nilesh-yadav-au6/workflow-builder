import { FC } from "react";
import { DataItem } from "../utils/helper";

export type Column = {
  key: keyof DataItem;
  title: string;
};

interface TableProps {
  columns: Column[];
  data: DataItem[];
}

const Table: FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto h-56">
      <table className="table-fixed w-full relative">
        <thead className="bg-gray-200 table-fixed">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-2">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={`${item.life_expectanc}-${index}`}>
              {columns.map((column) => {
                return (
                  <td key={column.key} className="border px-4 py-2">
                    {item[column.key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
