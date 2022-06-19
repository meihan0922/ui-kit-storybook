import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleXmark,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { Color } from "../../type/color";

type AlertType = "success" | "info" | "alert" | "warn";

export interface IAlertProps {
  /** alert type */
  type?: AlertType | "none";
  /** children */
  children: React.ReactNode;
}

const Icon: { [key in AlertType]: JSX.Element } = {
  success: (
    <FontAwesomeIcon
      size="lg"
      color={Color["systemColors-success"]}
      icon={faCircleCheck}
    />
  ),
  info: (
    <FontAwesomeIcon
      size="lg"
      color={Color["systemColors-info"]}
      icon={faCircleExclamation}
    />
  ),
  alert: (
    <FontAwesomeIcon
      size="lg"
      color={Color["systemColors-alert"]}
      icon={faCircleQuestion}
    />
  ),
  warn: (
    <FontAwesomeIcon
      size="lg"
      color={Color["systemColors-error"]}
      icon={faCircleXmark}
    />
  ),
};

const Alert = ({ type = "success", children }: IAlertProps) => {
  return (
    <div className="px-4 py-5 max-w-[350px] flex rounded bg-styleColors-lightBlue text-styleColors-mainGray">
      {type !== "none" && <div className="mr-4">{Icon[type]}</div>}
      {children}
    </div>
  );
};

export default Alert;
