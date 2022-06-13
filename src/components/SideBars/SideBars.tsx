import React, { createContext, useState } from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ISideBarsItemProps } from "./SideBarsItem";

export type SideBarsStyle = "style1" | "style2" | "style3";
type SideBarsSize = "sm" | "lg";

export interface ISideBarsProps {
  /** SideBars size */
  size?: SideBarsSize;
  /** SideBars default index */
  defaultIndex?: string;
  /** style of SideBars */
  variants?: SideBarsStyle;
  /** SideBars status */
  onSelect?: (selectedIndex: string) => void;
  /** children: must be SideBarItem ||  SideBarsGroup */
  children: React.ReactNode;
}

const styleVariants: { [key in SideBarsStyle]: string } = {
  style1: "h-20",
  style2: "h-16",
  style3: "h-16",
};

export interface IContext {
  variants: SideBarsStyle;
  activeIndex: string;
  size: SideBarsSize;
  //   isOpen: boolean;
  onSelect?: (selectedIndex: string) => void;
}
export const SideBarsContext = createContext<IContext>(null);

const SideBars = ({
  size = "sm",
  defaultIndex = "",
  variants = "style1",
  children,
  ...props
}: ISideBarsProps) => {
  //   const [isOpen, toggleOpen] = useReducer((state) => !state, defaultOpen);
  const [activeIndex, setActiveIndex] = useState<string>(defaultIndex);
  const handleSelect = (index: string) => {
    setActiveIndex(index);
    props.onSelect && props.onSelect(index);
  };

  return (
    <div className="">
      <ul
        className={cx(
          "h-screen flex flex-col  w-fit items-center bg-styleColors-lightBlue",
          {
            "px-2": variants === "style3",
            "min-w-[110px] w-[110px]": size === "sm",
            "min-w-[200px] w-fit": size === "lg",
          }
        )}
      >
        <li
          className={cx(
            `mb-5 relative w-full flex items-center text-styleColors-mainGray ${styleVariants[variants]}`,
            {
              "justify-start px-[40px]": size === "lg",
              "justify-center": size === "sm",
            }
          )}
          //   onClick={toggleOpen}
        >
          <FontAwesomeIcon size="lg" icon={faBars} />
        </li>
        <SideBarsContext.Provider
          value={{
            variants,
            activeIndex,
            onSelect: handleSelect,
            size,
            // isOpen,
          }}
        >
          {React.Children.map(children, (child, index) => {
            const childEle =
              child as React.FunctionComponentElement<ISideBarsItemProps>;
            const { displayName } = childEle.type;
            if (
              (displayName === "SideBarsItem" &&
                (childEle.props?.text || childEle.props?.icon)) ||
              displayName === "SideBarsGroup"
            ) {
              return React.cloneElement(childEle, { index: String(index) });
            } else {
              console.error(
                "warn: children must be SideBarsItem. And text or icon must pass one."
              );
              return null;
            }
          })}
        </SideBarsContext.Provider>
      </ul>
    </div>
  );
};

export { SideBars };
