import Input from "./Input";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import mdx from "./Input.mdx";

export default {
  title: "Input",
  component: Input,
  parameters: {
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof Input>;

export const SizeSmall = () => {
  return (
    <div className="flex gap-2 flex-col">
      <Input />
      <Input label="Email" defaultValue="disabled" disabled />
      <Input label="Email" defaultValue="defaultValue" />
      <Input errorText="errorText" />
      <Input block defaultValue="block 100%" />
    </div>
  );
};
SizeSmall.storyName = "SizeSmall";

export const SizeLarge = () => {
  return (
    <div className="flex gap-2 flex-col">
      <Input size="lg" />
      <Input size="lg" label="Email" defaultValue="disabled" disabled />
      <Input size="lg" label="Email" defaultValue="defaultValue" />
      <Input size="lg" errorText="errorText" />
      <Input size="lg" block defaultValue="block 100%" />
    </div>
  );
};
SizeLarge.storyName = "SizeLarge";
