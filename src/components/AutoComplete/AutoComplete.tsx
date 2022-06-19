import React, {
  useState,
  useRef,
  useEffect,
  useTransition,
  useCallback,
} from "react";
import { Input, IInputProps } from "../Input/Input";
import List from "../List/List";
import useDebounce from "../../hooks/useDebounce";
import useClickoutside from "../../hooks/useClickoutside";

// TODO: 待新增List滾動與keyboard連動
// TODO: 點選項目，關閉選單後，資料更新的時間有待商榷..

interface DataSourceObj {
  value: string;
}

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

  //   const triggerSearch = useRef(false);
  const Container = useRef<HTMLDivElement>(null);
  const InputRef = useRef<HTMLInputElement>(null);

  const debounceVal = useDebounce(inputVal, 500);

  useClickoutside({
    element: Container,
    handler: () => setShowDropDown(false),
  });

  useEffect(() => {
    // if (triggerSearch.current && debounceVal) {
    if (isLoading && debounceVal) {
      const result = fetchFn(debounceVal);
      if (result instanceof Promise) {
        result.then((res) => {
          // 預防需要處理的資料太大包，延遲顯示
          startTransition(() => setFilterData(res));
        });
      } else {
        startTransition(() => setFilterData(result));
      }
      // 不管如何isPending變動的時間晚於setIsLoading(false)
      setIsLoading(false);
      //   triggerSearch.current = false;
    }
  }, [isLoading, debounceVal, fetchFn, isShowDropdpwn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setIsLoading(true); // 只有loading開始後 才需要trigger搜尋
    // triggerSearch.current = true;
  };

  const handleSelect = useCallback(
    (i: DataSourceType) => {
      setShowDropDown(false);
      setInputValue(i.value);
      onSelect && onSelect(i);
      //   triggerSearch.current = false;
      InputRef.current?.blur();
    },
    [onSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      let idx = highlightIndex;
      const countHighLight = (idx) => {
        if (idx < 0) return -1;
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
    <div className="relative" ref={Container}>
      <Input
        ref={InputRef}
        value={inputVal}
        onChange={handleChange}
        onFocus={() => {
          setShowDropDown(true);
          //   triggerSearch.current = true;
        }}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {isShowDropdpwn && inputVal ? (
        <div className="absolute top-10">
          <List
            loading={isPending || isLoading}
            data={filterData}
            renderOption={renderOption}
            handleSelect={handleSelect}
            highlightIndex={highlightIndex}
            defaultIndex={filterData.findIndex((i) => i.value === inputVal)}
          />
        </div>
      ) : null}
    </div>
  );
};
export default AutoComplete;
