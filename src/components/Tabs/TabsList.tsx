import React from "react";
import { ITabButton } from "./Tab";

export interface ITabsPanelProps {
  /** children: must be Tab */
  children: JSX.Element;
}

const TabsList = ({ children }: ITabsPanelProps) => {
  return (
    <ul className="flex items-center justify-start gap-5">
      {React.Children.map(children, (child, index) => {
        const childEle = child as React.FunctionComponentElement<ITabButton>;
        const { displayName } = childEle.type;
        if (displayName === "Tab") {
          return React.cloneElement(childEle, { index });
        } else {
          console.error(
            "warn: children must be SideBarsItem. And text or icon must pass one."
          );
          return null;
        }
      })}
    </ul>
  );
};

export { TabsList };
