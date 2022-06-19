import cx from "classnames";
import { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";

const InputWrapper = styled.input<{ width: string }>`
  width: ${(props) => props.width};
`;

interface IPagination {
  totalPage: number;
  currentPage: number;
  handleChange?: (page: number) => void;
}

const Pagination = ({ totalPage, currentPage, handleChange }: IPagination) => {
  const [page, setPage] = useState<string>("1");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPage(String(currentPage));
  }, [currentPage]);

  const handleResult = () => {
    let result = Number(page);
    if (result === 0) result = 1;
    if (result > totalPage) result = totalPage;
    if (page?.length === 0) result = currentPage;
    setPage(String(result));

    if (result !== currentPage) {
      handleChange && handleChange(result);
    }
    setIsFocus(false);
  };

  const handleInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const valid = !isNaN(Number(value));
    if (valid) setPage(value.trim());
  };

  const handleInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      handleResult();
      inputRef.current.blur();
    }
  };

  const handleFocus = () => {
    setPage("");
    setIsFocus(true);
  };

  const handlePrevClick = useCallback(() => {
    const newPage = Number(page) - 1;
    handleChange && handleChange(newPage);
    setPage(String(newPage));
  }, [page]);

  const handleNextClick = useCallback(() => {
    const newPage = Number(page) + 1;
    handleChange && handleChange(newPage);
    setPage(String(newPage));
  }, [page]);

  const handleClick = useCallback(() => {
    if (inputRef.current && totalPage > 1) inputRef.current.focus();
  }, [inputRef.current, totalPage]);

  return (
    <div className="flex">
      <PrevArrow
        disabled={page === "1" || isFocus}
        handleClick={handlePrevClick}
      />
      <div
        className={cx(
          "shadow-button px-2 py-0.5 mx-1 flex items-center justify-center text-xs text-styleColors-mainGray min-w-[84px] border border-white rounded bg-styleColors-lightBlue",
          {
            "border-chartColor-mainBlue": isFocus,
            "cursor-pointer hover:border-chartColor-mainBlue": totalPage > 1,
          }
        )}
        onClick={handleClick}
      >
        <InputWrapper
          disabled={totalPage === 1}
          width={`${(page?.length || 1) * 7.5}px`}
          ref={inputRef}
          value={page}
          type="text"
          className="block w-auto focus:caret-chartColor-mainBlue outline-none bg-styleColors-lightBlue"
          onFocus={handleFocus}
          onBlur={handleResult}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
        {` /${totalPage}`}
      </div>
      <NextArrow
        disabled={page === String(totalPage) || isFocus}
        handleClick={handleNextClick}
      />
    </div>
  );
};

const NextArrow = ({
  disabled,
  handleClick,
}: {
  disabled: boolean;
  handleClick: () => void;
}) => {
  return (
    <Button
      variants="style3"
      disabled={disabled}
      onClick={!disabled ? handleClick : undefined}
    >
      <FontAwesomeIcon size="lg" icon={faAngleRight} />
    </Button>
  );
};

const PrevArrow = ({
  disabled,
  handleClick,
}: {
  disabled: boolean;
  handleClick: () => void;
}) => {
  return (
    <Button
      variants="style3"
      disabled={disabled}
      onClick={!disabled ? handleClick : undefined}
    >
      <FontAwesomeIcon size="lg" icon={faAngleLeft} />
    </Button>
  );
};

export default Pagination;
