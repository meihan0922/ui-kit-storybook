import React from "react";

export interface ITabsPanelProps {
  children: React.ReactNode;
}

const TabsPanel = ({ children }: ITabsPanelProps) => <div>{children}</div>;

export default TabsPanel;
