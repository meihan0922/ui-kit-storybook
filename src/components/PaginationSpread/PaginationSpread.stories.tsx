import PaginationSpread from "./PaginationSpread";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import mdx from "./PaginationSpread.mdx";

export default {
  title: "PaginationSpread",
  component: PaginationSpread,
  parameters: {
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof PaginationSpread>;

export const Basic = () => {
  return <PaginationSpread currentPage={1} totalPage={5} />;
};

Basic.storyName = "Basic";
