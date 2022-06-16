import { Upload } from "./Upload";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";
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
  // 50K
  const checkedFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert("檔案過大");
      return false;
    }
    return true;
  };
  const changeName = (file: File) => {
    const newFile = new File([file], "new_name.docx", { type: file.type });
    return Promise.resolve(newFile);
  };
  return (
    <>
      <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        onProgress={(percentage, file) => {
          console.log(percentage, file);
        }}
        onChange={action("changed")}
        onSuccess={(d, file) => console.log(d, file)}
        onError={(err, file) => console.log(err, file)}
        beforeUpload={changeName}
      />
    </>
  );
};
Basic.storyName = "測試用";
