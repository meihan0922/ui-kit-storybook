import React from "react";
import { ITabButton } from "./Tab";

export interface ITabsPanelProps {
  /** children: must be Tab */
  children:
    | React.FunctionComponentElement<ITabButton>
    | React.FunctionComponentElement<ITabButton>[];
}

const TabsList = ({ children }: ITabsPanelProps) => {
  return (
    <ul className="flex items-center justify-start gap-5">
      {React.Children.map(children, (child, index) => {
        const displayName = child.type.displayName;
        if (displayName === "Tab") {
          return React.cloneElement(child, { index });
        } else {
          console.error(
            "warn: children must be Tab. And text or icon must pass one."
          );
          return null;
        }
      })}
    </ul>
  );
};

export default TabsList;
