import All from "./All";
import { ComponentMeta } from "@storybook/react";

export default {
  title: "example/All",
  component: All,
} as ComponentMeta<typeof All>;

export const AllStory = () => {
  return <All />;
};
AllStory.storyName = "All";
