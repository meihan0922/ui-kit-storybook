import { Upload, IUpload } from "./Upload";
import { ComponentMeta, ComponentStory } from "@storybook/react";
// import mdx from "./.mdx";

export default {
  title: "Upload",
  component: Upload,
  //   parameters: {
  // docs: {
  //   page: mdx,
  // },
  //   },
} as ComponentMeta<typeof Upload>;

export const Basic = () => {
  return (
    <>
      <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        onProgress={(percentage, file) => {
          console.log(percentage, file);
        }}
        onSuccess={(d, file) => console.log(d, file)}
        onError={(err, file) => console.log(err, file)}
      />
    </>
  );
};
Basic.storyName = "測試用";
