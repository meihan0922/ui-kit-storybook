import cx from "classnames";
import { useState, useCallback, useRef, useEffect } from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button/Button";

export interface IPaginationSpreadProps {
  totalPage: number;
  currentPage: number;
  showArrowText?: boolean;
  handleChange?: (page: number) => void;
}

const PaginationSpread = ({
  totalPage,
  currentPage,
  handleChange,
  showArrowText = false,
}: IPaginationSpreadProps) => {
  const [page, setPage] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handlePrevClick = useCallback(() => {
    const newPage = Number(page) - 1;
    handleChange && handleChange(newPage);
    setPage(newPage);
  }, [page, handleChange]);

  const handleNextClick = useCallback(() => {
    const newPage = Number(page) + 1;
    handleChange && handleChange(newPage);
    setPage(newPage);
  }, [page]);

  const handleClick = useCallback(() => {
    if (inputRef.current && totalPage > 1) inputRef.current.focus();
  }, [inputRef.current, totalPage]);

  const middleArray = () => {
    if (totalPage > 5) {
      if (page <= 3) return [2, 3, 4, "..."];
      if (page > totalPage - 3)
        return ["...", totalPage - 3, totalPage - 2, totalPage - 1];
      if (page >= 4 || page <= totalPage - 4)
        return ["...", page - 1, page, page + 1, "..."];
    } else {
      return Array.from({ length: totalPage - 2 }, (_, i) => i + 2);
    }
  };

  return (
    <div className="flex">
      <PrevArrow
        showArrowText={showArrowText}
        disabled={page === 1}
        handleClick={handlePrevClick}
      />
      <div className={"flex gap-2"} onClick={handleClick}>
        <PageBtn active={page === 1} page={1} setPage={setPage} />
        {middleArray()?.map((i) => {
          return i === "..." ? (
            <p className="self-center">{i}</p>
          ) : (
            <PageBtn active={i === page} page={i} setPage={setPage} />
          );
        })}
        <PageBtn
          active={page === totalPage}
          page={totalPage}
          setPage={setPage}
        />
      </div>
      <NextArrow
        showArrowText={showArrowText}
        disabled={page === totalPage}
        handleClick={handleNextClick}
      />
    </div>
  );
};

const PageBtn = ({ page, active, setPage }) => {
  return (
    <button
      className={cx(
        "px-4 text-styleColors-mainGray rounded hover:bg-styleColors-gray hover:text-chartColor-mainBlue",
        { "bg-styleColors-lightBlue": active }
      )}
      onClick={() => setPage(page)}
    >
      {page}
    </button>
  );
};

const NextArrow = ({
  disabled,
  handleClick,
  showArrowText,
}: {
  disabled: boolean;
  handleClick: () => void;
  showArrowText: boolean;
}) => {
  return (
    <Button
      variants="style3"
      disabled={disabled}
      onClick={!disabled ? handleClick : undefined}
    >
      {showArrowText && `Next`}
      <FontAwesomeIcon size="lg" icon={faAngleRight} />
    </Button>
  );
};

const PrevArrow = ({
  disabled,
  handleClick,
  showArrowText,
}: {
  disabled: boolean;
  handleClick: () => void;
  showArrowText: boolean;
}) => {
  return (
    <Button
      variants="style3"
      disabled={disabled}
      onClick={!disabled ? handleClick : undefined}
    >
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon size="lg" icon={faAngleLeft} />
        {showArrowText && `Prev`}
      </div>
    </Button>
  );
};

export { PaginationSpread };
