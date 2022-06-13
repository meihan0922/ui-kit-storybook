import React, { useContext } from "react";
import cx from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { SideBarsContext, SideBarsStyle } from "./SideBars";

// TODO: 待做disabled

const styleVariants: { [key in SideBarsStyle]: string } = {
  style1: "h-16 border-l-4 border-transparent",
  style2: "h-10 my-2",
  style3: "mb-2.5 rounded-sm pt-2.5 pb-1",
};

const activeStyleVariants: { [key in SideBarsStyle]: string } = {
  style1: "text-chartColor-mainBlue",
  style2: "bg-chartColor-mainBlue bg-opacity-10 text-chartColor-mainBlue",
  style3: "bg-chartColor-mainBlue bg-opacity-10 text-chartColor-mainBlue",
};

const styleEventsVariants: { [key in SideBarsStyle]: string } = {
  style1: "hover:text-chartColor-mainBlue",
  style2: "hover:bg-chartColor-mainBlue hover:bg-opacity-10",
  style3: "hover:bg-chartColor-mainBlue hover:bg-opacity-10",
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
  const { activeIndex, onSelect, variants, size } = useContext(SideBarsContext);
  const handleClick = () => {
    if (activeIndex !== index) {
      onSelect(index);
    }
  };

  return (
    <li
      key={index}
      className={cx(
        `${styleEventsVariants[variants]} cursor-pointer relative w-full flex gap-5 justify-left text-styleColors-mainGray ${styleVariants[variants]}`,
        {
          [activeStyleVariants[variants]]: activeIndex === index,
          "justify-start px-[40px]": size === "lg",
          "justify-center": size === "sm",
        }
      )}
      onClick={handleClick}
    >
      <div
        className={cx("flex items-center w-full", {
          "justify-center": size === "sm",
          "justify-start gap-5": size === "lg",
          "flex-col justify-center gap-2.5":
            size === "sm" && variants === "style3",
        })}
      >
        {icon && icon}
        {text && (
          <p
            className={cx({
              "text-xs": size === "sm" && variants === "style3",
              "text-lg leading-4":
                variants === "style1" || variants === "style2",
            })}
          >
            {text}
          </p>
        )}
      </div>
      {variants === "style1" && activeIndex === index ? (
        <motion.div
          className="absolute -left-[1px] w-1 h-full bg-chartColor-mainBlue "
          layoutId="underline"
        />
      ) : null}
    </li>
  );
};

export { SideBarsItem };
