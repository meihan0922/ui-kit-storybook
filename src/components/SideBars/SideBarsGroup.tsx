import React, { useContext, useReducer } from "react";
import cx from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { SideBarsContext } from "./SideBars";
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

const SideBarsGroup = ({
  defaultOpen = false,
  text,
  toggleable = false,
  index,
  children,
}: ISideBarsGroupProps) => {
  const { activeIndex, size } = useContext(SideBarsContext);
  const [isOpen, toggleOpen] = useReducer((state) => !state, defaultOpen);
  const level = activeIndex.split("-")[0];
  console.log("iiii", level === index);
  //   const handleClick = () => {
  //     toggleOpen()
  //   };

  return (
    <li key={index} className="w-full mb-5">
      <div
        onClick={() => {
          if (size === "lg" && toggleable) toggleOpen();
        }}
        className={cx(`flex items-center mb-3 text-xs`, {
          "justify-between pl-[40px] pr-2": size === "lg",
          "justify-center": size === "sm",
          "cursor-pointer": size === "lg" && toggleable,
          "text-chartColor-blue": level === index,
          "text-styleColors-darkGray": level !== index,
        })}
      >
        <p>{text}</p>
        {size === "lg" && toggleable ? (
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={ArrowVariants}
          >
            <FontAwesomeIcon icon={faCaretUp} />
          </motion.div>
        ) : null}
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
              const { displayName } = childEle.type;
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

export { SideBarsGroup };
