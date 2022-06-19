import ProgressBar from "./ProgressBar";
import { ComponentMeta } from "@storybook/react";
import mdx from "./ProgressBar.mdx";

export default {
  title: "ProgressBar",
  component: ProgressBar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof ProgressBar>;

export const Style1 = () => {
  return (
    <div className="flex gap-3">
      <ProgressBar percents={50} />
      <ProgressBar percents={50} isShowText />
    </div>
  );
};
Style1.storyName = "Style1";

export const Style2 = () => {
  return (
    <div className="flex gap-3">
      <ProgressBar percents={50} varients="style2" />
      <ProgressBar percents={50} varients="style2" isShowText />
    </div>
  );
};
Style2.storyName = "Style2";
