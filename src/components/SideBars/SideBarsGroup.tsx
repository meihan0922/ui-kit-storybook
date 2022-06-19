import React, { useContext, useReducer } from "react";
import cx from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { SideBarsContext, SideBarsSize } from "./SideBars";
import { ISideBarsItemProps } from "./SideBarsItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

export interface ISideBarsGroupProps {
  /** SideBarsGroup text */
  text: string;
  /** SideBarsGroup toggle功能，搭配SideBars `size: lg` 才會顯示 */
  toggleable?: boolean;
  /** SideBarsGroup的序列編號，不用傳，內部已實做 */
  index?: string;
  /** children: must be SideBarItem */
  children: JSX.Element;
  /** toggle default Status */
  defaultOpen?: boolean;
}

const ArrowVariants = {
  open: { rotate: 0 },
  closed: { rotate: 180 },
};

const SizeVariants: {
  [key in SideBarsSize]: string;
} = {
  sm: "justify-center",
  lg: "justify-between pl-[40px] pr-2",
};

const SideBarsGroup = ({
  defaultOpen = false,
  text,
  toggleable = false,
  index,
  children,
}: ISideBarsGroupProps) => {
  const context = useContext(SideBarsContext);
  const [isOpen, toggleOpen] = useReducer((state) => !state, defaultOpen);
  if (!context) return;
  const { activeIndex, size } = context;
  const isToggleAble = size === "lg" && toggleable;
  const level = activeIndex.split("-")[0];
  //   const handleClick = () => {
  //     toggleOpen()
  //   };

  return (
    <li key={index} className="w-full mb-5">
      <div
        onClick={() => {
          if (isToggleAble) toggleOpen();
        }}
        className={cx(`flex items-center mb-3 text-xs ${SizeVariants[size]}`, {
          "cursor-pointer": isToggleAble,
          "text-chartColor-blue": isToggleAble && level === index,
          "text-styleColors-darkGray": level !== index,
        })}
      >
        <p>{text}</p>
        {isToggleAble && (
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={ArrowVariants}
          >
            <FontAwesomeIcon icon={faCaretUp} />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {((toggleable && isOpen) || !toggleable) && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {React.Children.map(children, (child, i) => {
              const childEle =
                child as React.FunctionComponentElement<ISideBarsItemProps>;
              const displayName = childEle.type.displayName;
              if (
                displayName === "SideBarsItem" &&
                (childEle.props?.text || childEle.props?.icon)
              ) {
                return React.cloneElement(childEle, { index: `${index}-${i}` });
              } else {
                console.error(
                  "warn: children must be SideBarsItem. And text or icon must pass one."
                );
                return null;
              }
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default SideBarsGroup;
