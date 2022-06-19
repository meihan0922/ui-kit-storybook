import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { ComponentMeta } from "@storybook/react";
import mdx from "./Button.mdx";

export default {
  title: "Button",
  component: Button,
  parameters: {
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof Button>;

export const Size = () => {
  return (
    <>
      <div className="flex gap-10 mb-2.5">
        <Button>Download</Button>
        <Button variants="style2">Download</Button>
        <Button variants="style3">Download</Button>
        <Button variants="style4">Download</Button>
        <Button>
          <FontAwesomeIcon size="lg" icon={faGear} />
        </Button>
        <Button variants="style4">
          <FontAwesomeIcon size="lg" icon={faGear} />
        </Button>
      </div>
      <div className="flex gap-10 mb-2.5">
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
};
Size.storyName = "Size";

export const Disabled = () => {
  return (
    <>
      <div className="flex gap-10 mb-2.5">
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
        <Button disabled>
          <FontAwesomeIcon size="lg" icon={faGear} />
        </Button>
        <Button disabled variants="style4">
          <FontAwesomeIcon size="lg" icon={faGear} />
        </Button>
      </div>
      <div className="flex gap-10 mb-2.5">
        <Button disabled size="lg">
          Download
        </Button>
        <Button disabled size="lg" variants="style2">
          Download
        </Button>
        <Button disabled size="lg" variants="style3">
          Download
        </Button>
        <Button disabled size="lg" variants="style4">
          Download
        </Button>
      </div>
    </>
  );
};
Disabled.storyName = "Disabled";

export const Block = () => {
  return <Button block>Download</Button>;
};
Block.storyName = "Block";

export const CombinedButtons = () => {
  return (
    <div className="flex gap-10 mb-2.5">
      <div className="flex items-center">
        <Button combined="left">
          <FontAwesomeIcon size="lg" icon={faAngleLeft} />
          <p style={{ marginLeft: "14px", display: "inline-block" }}>Back</p>
        </Button>
        <Button combined="right" variants="style4">
          <p style={{ marginRight: "14px", display: "inline-block" }}>Next</p>
          <FontAwesomeIcon size="lg" icon={faAngleRight} />
        </Button>
      </div>
      <div>
        <Button combined="left">Back</Button>
        <Button combined="right" variants="style4">
          Next
        </Button>
      </div>
      <div className="flex items-center">
        <Button combined="left">
          <FontAwesomeIcon size="lg" icon={faAngleLeft} />
        </Button>
        <Button combined="right" variants="style3">
          <FontAwesomeIcon size="lg" icon={faAngleRight} />
        </Button>
      </div>
    </div>
  );
};
CombinedButtons.storyName = "Combined-Buttons";

export const CombinedButtonsDisabled = () => {
  return (
    <div className="flex gap-10 mb-2.5">
      <div className="flex items-center">
        <Button disabled combined="left">
          <FontAwesomeIcon size="lg" icon={faAngleLeft} />
          <p style={{ marginLeft: "14px", display: "inline-block" }}>Back</p>
        </Button>
        <Button disabled combined="right" variants="style4">
          <p style={{ marginRight: "14px", display: "inline-block" }}>Next</p>
          <FontAwesomeIcon size="lg" icon={faAngleRight} />
        </Button>
      </div>
      <div>
        <Button disabled combined="left">
          Back
        </Button>
        <Button disabled combined="right" variants="style4">
          Next
        </Button>
      </div>
      <div className="flex items-center">
        <Button disabled combined="left">
          <FontAwesomeIcon size="lg" icon={faAngleLeft} />
        </Button>
        <Button disabled combined="right" variants="style3">
          <FontAwesomeIcon size="lg" icon={faAngleRight} />
        </Button>
      </div>
    </div>
  );
};
CombinedButtons.storyName = "Combined-Buttons-Disabled";
