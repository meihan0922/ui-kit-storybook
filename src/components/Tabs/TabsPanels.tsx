import React, { forwardRef, useContext, useRef } from "react";
import { TabsContext } from "./Tabs";
import { ITabsPanelProps } from "./TabsPanel";

export interface ITabsPanelsProps {
  /** children: must be TabPanel */
  children: JSX.Element;
}

const TabsPanels = forwardRef<HTMLDivElement, ITabsPanelsProps>(
  ({ children }, ref) => {
    const ContentWrapper = useRef<HTMLDivElement>(null);
    const context = useContext(TabsContext);
    if (!context) return null;
    const { activeIndex } = context;
    const panelContainer =
      (ref as React.RefObject<HTMLDivElement>) || ContentWrapper;

    return (
      <>
        <div ref={panelContainer} className="relative overflow-y-auto">
          <div className="h-full">
            {React.Children.map(children, (child, i) => {
              const childEle =
                child as React.FunctionComponentElement<ITabsPanelProps>;
              const displayName = childEle.type.displayName;
              if (displayName === "TabsPanel") {
                return i === activeIndex ? React.cloneElement(childEle) : null;
              } else {
                console.error(
                  "warn: children must be TabsPanel. And text or icon must pass one."
                );
                return null;
              }
            })}
          </div>
        </div>
      </>
    );
  }
);

export default TabsPanels;
