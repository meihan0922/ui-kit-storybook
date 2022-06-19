import AutoComplete, { DataSourceType } from "./AutoComplete";
import { ComponentMeta } from "@storybook/react";
import { actions } from "@storybook/addon-actions";
import mdx from "./AutoComplete.mdx";

export default {
  title: "AutoComplete",
  component: AutoComplete,
  parameters: {
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof AutoComplete>;

const fakeData = [
  {
    value: "$64.50",
    name: 1,
  },
  {
    value: "$24.43",
    name: 2,
  },
  {
    value: "$18.07",
    name: 3,
  },
  {
    value: "$34.40",
    name: 4,
  },
  {
    value: "$39.08",
    name: 5,
  },
];

export const Basic = () => {
  return (
    <>
      <AutoComplete
        fetchFn={(query) => fakeData.filter((i) => i.value.indexOf(query) > -1)}
        onSelect={actions}
        placeholder="搜尋任意數字"
      />
    </>
  );
};
Basic.storyName = "Basic";

export const RenderOption = () => {
  const renderOption = (item: DataSourceType) => {
    const itemAddType = item as DataSourceType<{ name: string }>;
    return <div>{`${itemAddType.value} --->>> ${itemAddType.name}`}</div>;
  };

  return (
    <>
      <AutoComplete
        fetchFn={(query) => fakeData.filter((i) => i.value.indexOf(query) > -1)}
        onSelect={actions}
        renderOption={renderOption}
        placeholder="搜尋任意數字"
      />
    </>
  );
};
RenderOption.storyName = "客製化render選項";

export const PromiseFetch = () => {
  const newFetch = (query) => {
    return query
      ? fetch(`https://api.github.com/search/users?q=${query}`)
          .then((result) => result.json())
          .then(({ items }) => {
            return [...items]?.map((i, idx) => ({
              value: i.login,
              ...i,
            }));
          })
      : [];
  };

  return (
    <>
      <p>搜尋github用戶</p>
      <AutoComplete fetchFn={newFetch} onSelect={actions} />
    </>
  );
};
PromiseFetch.storyName = "非同步搜尋資料";
