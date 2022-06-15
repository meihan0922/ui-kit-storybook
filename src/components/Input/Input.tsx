import React, { InputHTMLAttributes, ChangeEvent, forwardRef } from "react";
import cx from "classnames";

type InputSize = "lg" | "sm";
type InputStyle = "style1" | "style2";

export interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /** Input error text */
  errorText?: string;
  /** if button width 100% */
  block?: boolean;
  /** style of button */
  variants?: InputStyle;
  /** Input label */
  label?: string;
  /** Input disabled */
  disabled?: boolean;
  /** Input size */
  size?: InputSize;
  /** Input right icon */
  icon?: JSX.Element;
  /** Input onChange */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const sizeVariants: {
  [key in InputSize]: { label: string; withoutLabel: string };
} = {
  sm: { label: "py-1", withoutLabel: "py-1" },
  lg: { label: "pt-4 pb-1", withoutLabel: "pt-3 pb-2" },
};
const labelSizeVariants: { [key in InputSize]: string } = {
  sm: "relative px-1",
  lg: "absolute top-1 left-4",
};

const styleVariants: { [key in InputStyle]: { init: string; event: string } } =
  {
    style1: {
      init: "",
      event: "",
    },
    style2: {
      init: "bg-styleColors-lightBlue border-transparent",
      event: "",
    },
  };

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const {
    disabled,
    size = "sm",
    icon,
    block = false,
    variants = "style1",
    errorText,
    label,
    ...restProps
  } = props;

  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };

  // 如果是controlled組件，則defaultValue跟value不能同時存在，不然會報錯
  // 是否是受控組件，可以由外部決定
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className="relative">
      {icon && icon}
      {label && (
        <p
          className={`text-[10px] text-styleColors-mainGray  ${labelSizeVariants[size]}`}
        >
          {label}
        </p>
      )}
      <input
        ref={ref}
        className={cx(
          `
          px-4 border text-styleColors-mainGray min-w-[250px] outline-none  disabled:opacity-50 rounded ${
            styleVariants[variants].init
          } ${
            label ? sizeVariants[size].label : sizeVariants[size].withoutLabel
          } 
          ${block ? "w-full" : "w-fit"}`,
          {
            "border-systemColors-error hover:border-systemColors-error focus:border-systemColors-error":
              errorText,
            "focus:border-styleColors-darkGray hover:border-styleColors-darkGray":
              !errorText && !disabled,
            "pointer-events-none": disabled,
          }
        )}
        disabled={disabled}
        {...restProps}
      />

      {errorText && (
        <p className="text-[10px] text-systemColors-error">{errorText}</p>
      )}
    </div>
  );
});
