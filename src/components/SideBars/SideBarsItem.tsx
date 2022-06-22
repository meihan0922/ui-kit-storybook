import React, { useContext } from "react";
import cx from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { SideBarsContext, SideBarsStyle, SideBarsSize } from "./SideBars";

// TODO: 待做disabled
const styleVariants: {
  [key in SideBarsStyle]: { init: string; active: string; hover: string };
} = {
  style1: {
    init: "h-16 border-l-4 border-transparent",
    active: "text-chartColor-mainBlue",
    hover: "hover:text-chartColor-mainBlue",
  },
  style2: {
    init: "h-10 my-2",
    active: "bg-chartColor-mainBlue bg-opacity-10 text-chartColor-mainBlue",
    hover: "hover:bg-chartColor-mainBlue hover:bg-opacity-10",
  },
  style3: {
    init: "mb-2.5 rounded-sm pt-2.5 pb-1",
    active: "bg-chartColor-mainBlue bg-opacity-10 text-chartColor-mainBlue",
    hover: "hover:bg-chartColor-mainBlue hover:bg-opacity-10",
  },
};

const SizeVariants: {
  [key in SideBarsSize]: string;
} = {
  sm: "justify-start",
  lg: "justify-center",
};

const TextSizeVariants: {
  [key in SideBarsSize]: string;
} = {
  sm: "justify-center",
  lg: "justify-start gap-5",
};

export interface ISideBarsItemProps {
  /** SideBarsGroup的序列編號，不用傳，內部已實做 */
  index?: string;
  /** text */
  text?: string;
  /** icon */
  icon?: JSX.Element;
}

const SideBarsItem = ({ index = "0", text, icon }: ISideBarsItemProps) => {
  const context = useContext(SideBarsContext);
  if (!context) return null;
  const { activeIndex, onSelect, variants, size } = context;
  const handleClick = () => {
    if (activeIndex !== index) {
      onSelect && onSelect(index);
    }
  };

  return (
    <li
      key={index}
      className={cx(
        `${SizeVariants[size]} ${styleVariants[variants].hover} ${styleVariants[variants].init} cursor-pointer relative w-full flex gap-5 justify-left text-styleColors-mainGray`,
        {
          [styleVariants[variants].active]: activeIndex === index,
        }
      )}
      onClick={handleClick}
    >
      {size === "sm" && variants === "style3" ? (
        <div
          className={cx(
            `flex items-center w-full ${TextSizeVariants[size]} flex-col justify-center gap-2.5`
          )}
        >
          {icon && icon}
          {text && <p className="text-xs">{text}</p>}
        </div>
      ) : (
        <div
          className={cx(
            `flex items-center w-full px-[40px] ${TextSizeVariants[size]}`
          )}
        >
          {icon && icon}
          {text && (
            <p
              className={cx({
                "text-lg leading-4":
                  variants === "style1" || variants === "style2",
              })}
            >
              {text}
            </p>
          )}
        </div>
      )}
      {variants === "style1" && activeIndex === index ? (
        <motion.div
          className="absolute -left-[1px] w-1 h-full bg-chartColor-mainBlue "
          layoutId="underline"
        />
      ) : null}
    </li>
  );
};

export default SideBarsItem;
