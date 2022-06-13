import cx from "classnames";
import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabsContext, SizeType } from "./Tabs";

export interface ITabButton {
  /** Tab的序列編號，不用傳，內部已實做 */
  index?: number;
  /** Tab children */
  children: JSX.Element | string;
  /** Tab disabled */
  disabled?: boolean;
}

const sizeStyle: {
  [key in SizeType]: string;
} = {
  sm: "text-sm py-2",
  lg: "text-lg py-3",
};

const Tab = ({ children, index, disabled = false }: ITabButton) => {
  const { activeIndex, size, handleTabClick } = useContext(TabsContext);

  const handleClick = (e) => {
    e.preventDefault();
    handleTabClick(index);
  };

  return (
    <li
      onClick={handleClick}
      className={cx(`${sizeStyle[size]} relative hover:text-chartColor-blue`, {
        "text-chartColor-blue": activeIndex === index,
        "text-styleColors-mainGray": activeIndex !== index,
        "opacity-25 pointer-events-none": disabled,
        "cursor-pointer": !disabled,
      })}
    >
      {children}
      {activeIndex === index ? (
        <motion.div
          className={cx(
            `absolute -bottom-[1px] w-full bg-chartColor-mainBlue`,
            {
              "h-1": size === "lg",
              "h-[2px]": size === "sm",
            }
          )}
          layoutId="underline"
        />
      ) : null}
    </li>
  );
};

export { Tab };
