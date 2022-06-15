import { AutoComplete, DataSourceType } from "./AutoComplete";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
  const renderOption = (item: DataSourceType) => {
    const itemAddType = item as DataSourceType<{ url: string }>;
    return (
      <div>
        {itemAddType.value} {itemAddType.url}
      </div>
    );
  };

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
      <p>size: sm</p>
      <AutoComplete
        //   fetchFn={(query) => {
        //     const a = fakeData.filter((d) => d.value.indexOf(query) > -1);
        //     console.log(a);
        //     return a;
        //   }}
        fetchFn={newFetch}
        onSelect={() => {}}
        renderOption={renderOption}
      />
    </>
  );
};
Basic.storyName = "測試用";
