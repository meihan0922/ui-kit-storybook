import React, { useState, useEffect, useTransition } from "react";
import { Input, IInputProps } from "../Input/Input";
import useDebounce from "../../hooks/useDebounce";
interface DataSourceObj {
  value: string;
}

// TODO: 帶新增loading元件

export type DataSourceType<T = {}> = T & DataSourceObj;

export interface IAutoCompleteProps extends Omit<IInputProps, "onSelect"> {
  /** fetchFn，支持非同步promise */
  fetchFn: (query: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** onSelect 點擊下拉選單的選項 */
  onSelect: (item: DataSourceType) => void;
  /** 可自行渲染選單的選項 */
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
  const debounceVal = useDebounce(inputVal, 500);

  useEffect(() => {
    if (debounceVal) {
      const result = fetchFn(debounceVal);
      if (result instanceof Promise) {
        result.then((res) => {
          setFilterData(res);
          setIsLoading(false);
        });
      } else {
        setFilterData(result);
      }
    }
  }, [debounceVal, fetchFn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (val === "") {
      setFilterData([]);
    } else {
      setIsLoading(true);
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
        {...restProps}
      />
      {isShowDropdpwn && isLoading ? "loading" : null}
      {isShowDropdpwn && inputVal && !isLoading ? (
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
