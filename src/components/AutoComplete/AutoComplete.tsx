import React, {
  useState,
  useRef,
  useEffect,
  useTransition,
  useCallback,
} from "react";
import { Input, IInputProps } from "../Input/Input";
import useDebounce from "../../hooks/useDebounce";
import useClickoutside from "../../hooks/useClickoutside";
interface DataSourceObj {
  value: string;
}

// TODO: 待新增loading元件
// TODO: 暫定List只夠塞入十筆資料，多餘的與keyboard連動 待新增
// TODO: 點選項目，關閉選單後，資料更新的時間有待商榷..

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowDropdpwn, setShowDropDown] = useState(false);
  const [inputVal, setInputValue] = useState<string>(value as string);
  const [filterData, setFilterData] = useState<DataSourceType[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const triggerSearch = useRef(false);
  const Container = useRef<HTMLDivElement>(null);

  const debounceVal = useDebounce(inputVal, 500);

  useClickoutside({
    element: Container,
    handler: () => setShowDropDown(false),
  });

  useEffect(() => {
    if (triggerSearch.current && debounceVal) {
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
      triggerSearch.current = false;
    }
  }, [debounceVal, fetchFn, isShowDropdpwn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setIsLoading(true);
    triggerSearch.current = true;
  };

  const handleSelect = useCallback(
    (i: DataSourceType) => {
      setShowDropDown(false);
      setInputValue(i.value);
      onSelect && onSelect(i);
      triggerSearch.current = false;
    },
    [onSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      let idx = highlightIndex;
      const countHighLight = (idx) => {
        if (idx < 0) return 0;
        if (idx >= filterData.length) return filterData.length - 1;
        return idx;
      };

      switch (e.code) {
        case "ArrowUp":
          idx--;
          break;
        case "ArrowDown":
          idx++;
          break;
        case "Enter":
          if (filterData.length > 0) handleSelect(filterData[idx]);
          return;
        default:
          break;
      }
      idx = countHighLight(idx);
      setHighlightIndex(idx);
    },
    [highlightIndex, filterData, handleSelect]
  );

  return (
    <div className="" ref={Container}>
      <Input
        value={inputVal}
        onChange={handleChange}
        onFocus={() => {
          setShowDropDown(true);
          triggerSearch.current = true;
        }}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {isShowDropdpwn && inputVal ? (
        <List
          loading={isPending || isLoading}
          data={filterData}
          renderOption={renderOption}
          handleSelect={handleSelect}
        />
      ) : null}
    </div>
  );
};

const List = React.memo<{
  loading: boolean;
  data: DataSourceType[];
  renderOption?: (item: DataSourceType) => JSX.Element;
  handleSelect: (i: DataSourceType) => void;
}>(({ data, renderOption, handleSelect, loading }) => {
  let statusText = "";
  if (loading) {
    statusText = "loading...";
  } else if (data?.length === 0) {
    statusText = "no data...";
  }

  return (
    <ul>
      {statusText ? (
        <li>{statusText}</li>
      ) : (
        data.map((i, idx) => (
          <li key={i.value + idx} onClick={() => handleSelect(i)}>
            {renderOption ? renderOption(i) : i.value}
          </li>
        ))
      )}
    </ul>
  );
});
