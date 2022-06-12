import { Button } from "./Button";
import { ComponentMeta } from "@storybook/react";

export default {
  title: "Example/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Basic = () => (
  <>
    <p>size: sm</p>
    <div className="flex gap-2">
      <Button>Download</Button>
      <Button variants="style2">Download</Button>
      <Button variants="style3">Download</Button>
      <Button variants="style4">Download</Button>
      <Button disabled>Download</Button>
      <Button disabled variants="style2">
        Download
      </Button>
      <Button disabled variants="style3">
        Download
      </Button>
      <Button disabled variants="style4">
        Download
      </Button>
    </div>
    <p className="mt-5">size: lg</p>
    <div className="flex gap-2">
      <Button size="lg">Download</Button>
      <Button size="lg" variants="style2">
        Download
      </Button>
      <Button size="lg" variants="style3">
        Download
      </Button>
      <Button size="lg" variants="style4">
        Download
      </Button>
    </div>
  </>
);
