import React, { useState, useEffect, useTransition, useCallback } from "react";
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
  const [isPending, startTransition] = useTransition();
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
          // 預防需要處理的資料太大包，延遲顯示
          startTransition(() => setFilterData(res));
          // 不管如何isPending變動的時間晚於setIsLoading(false)
          setIsLoading(false);
        });
      } else {
        startTransition(() => setFilterData(result));
      }
    }
  }, [debounceVal, fetchFn]);
  //   console.log("===============");
  //   console.log("isLoading", isLoading);
  //   console.log("isPending", isPending);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setIsLoading(true);
  };

  const handleSelect = useCallback(
    (i: DataSourceType) => {
      setShowDropDown(false);
      setInputValue(i.value);
      onSelect && onSelect(i);
    },
    [onSelect]
  );

  return (
    <div className="">
      <Input
        value={inputVal}
        onChange={handleChange}
        onFocus={() => setShowDropDown(true)}
        {...restProps}
      />
      {isShowDropdpwn && (isPending || isLoading) ? "loading..." : null}
      {isShowDropdpwn && inputVal && !isPending && !isLoading ? (
        filterData?.length > 0 ? (
          <List
            data={filterData}
            renderOption={renderOption}
            handleSelect={handleSelect}
          />
        ) : (
          "no data"
        )
      ) : null}
    </div>
  );
};

const List = React.memo<{
  data: DataSourceType[];
  renderOption?: (item: DataSourceType) => JSX.Element;
  handleSelect: (i: DataSourceType) => void;
}>(({ data, renderOption, handleSelect }) => {
  return (
    <ul>
      {data.map((i, idx) => (
        <li key={i.value + idx} onClick={() => handleSelect(i)}>
          {renderOption ? renderOption(i) : i.value}
        </li>
      ))}
    </ul>
  );
});
