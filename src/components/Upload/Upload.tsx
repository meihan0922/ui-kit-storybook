import { useRef } from "react";
import { Button } from "../Button/Button";
import axios from "axios";

export interface IUpload {
  action: string; // 發送到哪
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
}

export const Upload = ({ action, onProgress, onSuccess, onError }: IUpload) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (inputRef.current) inputRef.current.value = "";
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      const formData = new FormData();
      formData.append(file.name, file);
      axios
        .post(action, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // 二進制的資料
          },
          onUploadProgress: (e) => {
            let percentage = Math.round((e.loaded * 100) / e.total);
            if (percentage < 100 && onProgress) {
              onProgress(percentage, file);
            }
          },
        })
        .then(
          (res) => {
            if (onSuccess) onSuccess(res.data, file);
          },
          (err) => {
            if (onError) {
              console.error("上傳發生錯誤");
              onError(err, file);
            }
          }
        );
    });
  };

  return (
    <div className="">
      <Button onClick={handleClick}>上傳檔案</Button>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Upload;
