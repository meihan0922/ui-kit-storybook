import React from "react";

export interface ITabsPanelProps {
  children: JSX.Element;
}

const TabsPanel = ({ children }: ITabsPanelProps) => <div>{children}</div>;

export { TabsPanel };
