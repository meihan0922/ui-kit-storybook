import Alert from "./Alert";
import { ComponentMeta } from "@storybook/react";
import mdx from "./Alert.mdx";

export default {
  title: "Alert",
  component: Alert,
  parameters: {
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof Alert>;

export const Basic = () => {
  return (
    <div className="flex flex-col gap-5">
      <Alert type="success">Success notification</Alert>
      <Alert type="info">Info notification</Alert>
      <Alert type="alert">Alert notification</Alert>
      <Alert type="warn">Wranning notification</Alert>
    </div>
  );
};
Basic.storyName = "Basic";
