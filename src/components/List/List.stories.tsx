import List from "./List";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import mdx from "./List.mdx";

export default {
  title: "List",
  component: List,
  parameters: {
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof List>;

export const Basic = () => {
  return (
    <>
      <List
        loading={false}
        data={[
          {
            value: "第1個highlight",
          },
          {
            value: "第2個",
          },
          {
            value: "第3個active",
          },
          {
            value: "第4個",
          },
        ]}
        highlightIndex={0}
        defaultIndex={2}
      />
    </>
  );
};
Basic.storyName = "Basic";
