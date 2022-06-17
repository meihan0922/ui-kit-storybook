import { CircleLoader } from "./CircleLoader";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "CircleLoader",
  component: CircleLoader,
} as ComponentMeta<typeof CircleLoader>;

export const Basic = () => {
  return <CircleLoader />;
};
Basic.storyName = "Basic";
