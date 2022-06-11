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
}

const sizeVariants: { [key in BtnSize]: string } = {
  sm: "px-5 py-2 text-sm",
  lg: "px-7 py-3 text-base",
};

const styleVariants: { [key in BtnStyle]: string } = {
  style1: "text-white bg-chartColor-mainBlue",
  style2:
    "text-chartColor-mainBlue bg-white border border-2 border-chartColor-mainBlue",
  style3: "text-chartColor-mainBlue bg-styleColors-lightBlue",
  style4: "text-styleColors-darkGray bg-white border border-styleColors-gray",
};

const styleEventsVariants: { [key in BtnStyle]: string } = {
  style1: "hover:bg-chartColor-blue active:bg-chartColor-blue",
  style2: "hover:border-chartColor-blue active:border-chartColor-blue",
  style3: "hover:bg-styleColors-gray active:bg-styleColors-gray",
  style4:
    "hover:border-chartColor-mainBlue hover:text-chartColor-mainBlue active:border-chartColor-mainBlue active:text-chartColor-mainBlue",
};

export const Button = ({
  block = false,
  size = "sm",
  disabled = false,
  children,
  variants = "style1",
  url = "",
  ...restProps
}: IButtonProps) => {
  return url ? (
    <a
      className={cx(
        `rounded disabled:opacity-75 ${sizeVariants[size]} ${styleVariants[variants]}`,
        {
          [styleEventsVariants[variants]]: !disabled,
        },
        {
          "pointer-events-none": disabled,
        },
        { "w-full": block }
      )}
      href={url}
      {...restProps}
    >
      {children}
    </a>
  ) : (
    <button
      className={cx(
        `rounded disabled:opacity-75 ${sizeVariants[size]} ${styleVariants[variants]}`,
        {
          [styleEventsVariants[variants]]: !disabled,
        },
        { "w-full": block }
      )}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};
