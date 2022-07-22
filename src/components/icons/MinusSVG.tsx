import React from "react";
import { IStylesProps } from "../../models/models";

const MinusSVG: React.FC<IStylesProps> = ({ styles }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 ${styles}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  );
};

export default MinusSVG;
