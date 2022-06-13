import React, { useState, useRef, useEffect } from "react";

export type SizeType = "sm" | "lg";

export interface ITabsProps {
  /** children */
  children: React.ReactNode;
  /** Tabs size */
  size?: SizeType;
  /** Tabs 要從外部控制的話 */
  index?: number;
  /** Tabs default index */
  defaultIndex?: number;
  /** Tabs click */
  onTabClick?: (id: any) => void;
}

interface ITabsContext {
  size?: SizeType;
  activeIndex: number;
  handleTabClick?: (id: any) => void;
}

export const TabsContext = React.createContext<Partial<ITabsContext>>({});

const Tabs = ({
  index = null,
  children,
  size = "sm",
  defaultIndex,
  onTabClick,
}: ITabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (onTabClick) onTabClick(index);
  };

  useEffect(() => {
    if (index !== null) {
      setActiveIndex(index);
    }
  }, [index]);

  return (
    <TabsContext.Provider
      value={{
        activeIndex,
        size,
        handleTabClick,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export { Tabs };
