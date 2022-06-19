import React from "react";
import { ThreeDotsLoader } from "../ThreeDotsLoader/ThreeDotsLoader";
import cx from "classnames";

// TODO: 尚未優化多筆資料時的高亮選取行為，應該要使用zustand之類的狀態管理，進行shallow比較，優化渲染效能
// 就不會高頻率觸發data.map

interface DataSourceObj {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObj;

export interface IList {
  data: DataSourceType[];
  renderOption?: (item: DataSourceType) => JSX.Element;
  handleSelect?: (item: DataSourceType) => void;
  loading: boolean;
  highlightIndex?: number;
  defaultIndex?: number;
}

const List = ({
  data,
  renderOption,
  handleSelect,
  loading,
  highlightIndex = -1,
  defaultIndex = -1,
}: IList) => {
  let statusText: string | JSX.Element = "";
  if (loading) {
    statusText = (
      <li className="px-4">
        <ThreeDotsLoader />
      </li>
    );
  } else if (data?.length === 0) {
    statusText = <li className="px-4 py-2">no data...</li>;
  }

  return (
    <ul className="w-fit min-w-[255px] max-h-[215px] overflow-y-auto text-sm h-auto py-2 shadow-lg rounded-md">
      {statusText ||
        data.map((i, idx) => (
          <li
            key={i.value + idx}
            onClick={() => handleSelect && handleSelect(i)}
            className={cx(
              "hover:bg-chartColor-mainBlue hover:bg-opacity-10 cursor-pointer px-4 py-2",
              {
                "bg-chartColor-mainBlue bg-opacity-10":
                  highlightIndex === idx || defaultIndex === idx,
                "text-chartColor-blue": defaultIndex === idx,
                "text-styleColors-mainGray": defaultIndex !== idx,
              }
            )}
          >
            {renderOption ? renderOption(i) : i.value}
          </li>
        ))}
    </ul>
  );
};

export default React.memo(List);
