import Pagination from "./Pagination";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import mdx from "./Pagination.mdx";

export default {
  title: "Pagination",
  component: Pagination,
  parameters: {
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof Pagination>;

export const Basic = () => {
  return <Pagination currentPage={1} totalPage={5} />;
};
Basic.storyName = "Basic";
