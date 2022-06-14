import React from "react";
import cx from "classnames";

type BtnSize = "lg" | "sm";
type BtnStyle = "style1" | "style2" | "style3" | "style4";
type NativeProps = Partial<React.ButtonHTMLAttributes<HTMLElement>> &
  Partial<React.AnchorHTMLAttributes<HTMLElement>>;

export interface IButtonProps extends NativeProps {
  /** if button width 100% */
  block?: boolean;
  /** button size */
  size?: BtnSize;
  /** button tag disabled || a tag pointer-events:none */
  disabled?: boolean;
  /** style of button */
  variants?: BtnStyle;
  /** to be a tag with herf */
  url?: string;
  /** children */
  children: React.ReactNode;
  /** if combined button */
  combined?: "none" | "left" | "right";
}

const sizeVariants: { [key in BtnSize]: string } = {
  sm: "px-4 py-2 text-sm",
  lg: "px-7 py-3 text-base",
};

const styleVariants: { [key in BtnStyle]: { init: string; event: string } } = {
  style1: {
    init: "text-white bg-chartColor-mainBlue border border-2 border-transparent",
    event: "hover:bg-chartColor-blue active:bg-chartColor-blue",
  },
  style2: {
    init: "text-chartColor-mainBlue bg-white border border-2 border-chartColor-mainBlue",
    event: "hover:border-chartColor-blue active:border-chartColor-blue",
  },
  style3: {
    init: "text-chartColor-mainBlue bg-styleColors-lightBlue border border-2 border-transparent",
    event: "hover:bg-styleColors-gray active:bg-styleColors-gray",
  },
  style4: {
    init: "text-styleColors-mainGray bg-white border border-2 border-styleColors-gray",
    event:
      "hover:border-chartColor-mainBlue hover:text-chartColor-mainBlue active:border-chartColor-mainBlue active:text-chartColor-mainBlue",
  },
};

export const Button = ({
  block = false,
  size = "sm",
  disabled = false,
  children,
  variants = "style1",
  url = "",
  combined = "none",
  ...restProps
}: IButtonProps) => {
  return url ? (
    <a
      className={cx(
        `rounded disabled:opacity-50 ${sizeVariants[size]} ${styleVariants[variants].init}`,
        {
          [styleVariants[variants].event]: !disabled,
        },
        {
          "pointer-events-none disabled": disabled,
        },
        { "w-full": block },
        { "rounded-r-none": combined === "left" },
        { "rounded-l-none": combined === "right" }
      )}
      href={url}
      {...restProps}
    >
      {children}
    </a>
  ) : (
    <button
      className={cx(
        `rounded disabled:opacity-50 ${sizeVariants[size]} ${styleVariants[variants].init}`,
        {
          [styleVariants[variants].event]: !disabled,
        },
        {
          disabled,
        },
        { "w-full": block },
        { "rounded-r-none": combined === "left" },
        { "rounded-l-none": combined === "right" }
      )}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};
