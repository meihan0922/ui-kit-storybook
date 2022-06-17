import { ProgressBar } from "./ProgressBar";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "ProgressBar",
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

export const Style1 = () => {
  return (
    <div className="flex gap-3">
      <ProgressBar percents={50} />
      <ProgressBar percents={30} isShowText />
    </div>
  );
};
Style1.storyName = "Style1";

export const Style2 = () => {
  return (
    <div className="flex gap-3">
      <ProgressBar percents={30} varients="style2" />
      <ProgressBar percents={50} varients="style2" isShowText />
    </div>
  );
};
Style2.storyName = "Style2";
