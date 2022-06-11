import React from "react";
import { Button, IButtonProps } from "./Button";
import { render, fireEvent } from "@testing-library/react";

type TestProps = Omit<IButtonProps, "children">;

const defaultProps = {
  onClick: jest.fn(),
};
const testDisabledProps: TestProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test button component", () => {
  it("渲染對的預設按鈕", () => {
    const txt = "Nice";
    const wrapper = render(<Button {...defaultProps}>{txt}</Button>);
    const ele = wrapper.getByText(txt) as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual("BUTTON");
    expect(ele.disabled).toBeFalsy();
    fireEvent.click(ele);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("url有值時，轉換成<a>", () => {
    const txt = "Link";
    const wrapper = render(<Button url="www.goole.com">{txt}</Button>);
    const ele = wrapper.getByText(txt);
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual("A");
  });

  it("disabled時，應為<button>，不觸發click行為", () => {
    const txt = "disabled";
    const wrapper = render(<Button {...testDisabledProps}>{txt}</Button>);
    const ele = wrapper.getByText(txt) as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele.disabled).toBeTruthy();
    fireEvent.click(ele);
    expect(testDisabledProps.onClick).not.toHaveBeenCalled();
  });

  it("disabled且url有值時，應為<a>，不觸發click行為", () => {
    const txt = "disabled";
    const wrapper = render(
      <Button disabled url="www.goole.com">
        {txt}
      </Button>
    );
    const ele = wrapper.getByText(txt) as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual("A");
    fireEvent.click(ele);
    expect(testDisabledProps.onClick).not.toHaveBeenCalled();
  });
});
