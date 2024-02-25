import { FC } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onAccordionClick: () => void;
  element?: JSX.Element;
}

const AccordionItem: FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onAccordionClick,
  element,
}) => {
  return (
    <div className="border rounded">
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={onAccordionClick}
      >
        <div className="flex">
          <h2 className="text-lg">{title}</h2>
          {element}
        </div>
        <svg
          className={`w-6 h-6 ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </div>
      {isOpen && <div className="px-4 py-2">{children}</div>}
    </div>
  );
};

interface AccordionProps {
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return <div className="divide-y divide-gray-200">{children}</div>;
};

export { Accordion, AccordionItem };
