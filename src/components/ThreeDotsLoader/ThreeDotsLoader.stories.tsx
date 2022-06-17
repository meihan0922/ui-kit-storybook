import { ThreeDotsLoader } from "./ThreeDotsLoader";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "ThreeDotsLoader",
  component: ThreeDotsLoader,
} as ComponentMeta<typeof ThreeDotsLoader>;

export const Basic = () => {
  return <ThreeDotsLoader />;
};
Basic.storyName = "Basic";
