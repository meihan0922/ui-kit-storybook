import React, { useState, useEffect } from "react";
import { Input, IInputProps } from "../Input/Input";

interface DataSourceObj {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObj;

export interface IAutoCompleteProps extends Omit<IInputProps, "onSelect"> {
  /** fetchFn */
  fetchFn: (query: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** onSelect */
  onSelect: (item: DataSourceType) => void;
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => JSX.Element;
}

export const AutoComplete = ({
  fetchFn,
  onSelect,
  value,
  renderOption,
  ...restProps
}: IAutoCompleteProps) => {
  const [isShowDropdpwn, setShowDropDown] = useState(false);
  const [inputVal, setInputValue] = useState<string>(value as string);
  const [filterData, setFilterData] = useState<DataSourceType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (val) {
      const result = fetchFn(inputVal);
      setIsLoading(true);
      if (result instanceof Promise) {
        result.then((res) => {
          setFilterData(res);
          setIsLoading(false);
        });
      } else {
        setFilterData(result);
      }
    } else {
      setFilterData([]);
    }
  };

  const handleSelect = (i: DataSourceType) => {
    setShowDropDown(false);
    setInputValue(i.value);
    onSelect && onSelect(i);
  };

  return (
    <div className="">
      <Input
        value={inputVal}
        onChange={handleChange}
        onFocus={() => setShowDropDown(true)}
        // onBlur={() => setShowDropDown(false)}
      />
      {isShowDropdpwn && isLoading ? "loading" : null}
      {isShowDropdpwn && !isLoading ? (
        filterData?.length > 0 ? (
          <ul>
            {filterData.map((i) => (
              <li onClick={() => handleSelect(i)}>
                {renderOption ? renderOption(i) : i.value}
              </li>
            ))}
          </ul>
        ) : (
          "no data"
        )
      ) : null}
    </div>
  );
};
