import React, { useState, useMemo, useEffect, useCallback } from "react";

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
  size: SizeType;
  activeIndex: number;
  handleTabClick: (id: number) => void;
}

export const TabsContext = React.createContext<ITabsContext | null>(null);

const Tabs = ({
  index,
  children,
  size = "sm",
  defaultIndex = -1,
  onTabClick,
}: ITabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleTabClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
      if (onTabClick) onTabClick(index);
    },
    [onTabClick]
  );

  useEffect(() => {
    if (index) {
      setActiveIndex(index);
    }
  }, [index]);

  const contextObj: ITabsContext = useMemo(
    () => ({
      activeIndex,
      size,
      handleTabClick,
    }),
    [size, activeIndex, handleTabClick]
  );

  return (
    <div>
      <TabsContext.Provider value={contextObj}>{children}</TabsContext.Provider>
    </div>
  );
};

export default Tabs;
