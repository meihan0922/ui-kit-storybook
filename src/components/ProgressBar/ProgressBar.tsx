import { useState } from "react";
import { motion } from "framer-motion";
import useInterval from "../../hooks/useInterval";

type ProgressBarStyle = "style1" | "style2";

const styleVariants: {
  [key in ProgressBarStyle]: { init: string; event?: string };
} = {
  style1: {
    init: "h-1",
  },
  style2: {
    init: "h-5 text-right",
  },
};

const textStyleVariants: {
  [key in ProgressBarStyle]: { init: string; event?: string };
} = {
  style1: {
    init: "min-w-6 text-xs text-styleColors-mainGray",
  },
  style2: {
    init: "min-w-6 text-[10px] leading-3 text-white",
  },
};

const durationSetting = 3;

const useCounter = (start, end, duration) => {
  const [count, setCount] = useState(start);
  useInterval(() => {
    if (count < end) setCount((prev) => ++prev);
  }, (duration / (end - start)) * 1000);
  return count;
};

const Counter = ({ percents, style }: { percents: number; style: string }) => {
  const count = useCounter(0, percents, durationSetting);
  return <p className={style}>{count}%</p>;
};

const ProgressBar = ({
  percents,
  varients = "style1",
  isShowText = false,
}: {
  isShowText?: boolean;
  percents: number;
  varients?: ProgressBarStyle;
}) => {
  if (percents > 100 || percents < 0) return null;
  return (
    <div className="w-full flex items-center gap-3 relative">
      <div
        className={`w-full overflow-hidden rounded-md bg-chartColor-mainBlue bg-opacity-10 ${styleVariants[varients].init}`}
      >
        <motion.div
          className="px-1.5 py-1 h-full bg-chartColor-mainBlue"
          initial={{ x: "-100%" }}
          animate={{
            x: `-${100 - percents}%`,
            transition: {
              duration: durationSetting,
              delay: 0.5,
              ease: "easeInOut",
            },
          }}
        >
          {isShowText && varients === "style2" && (
            <Counter
              style={`${textStyleVariants[varients].init}`}
              percents={percents}
            />
          )}
        </motion.div>
      </div>
      {isShowText && varients === "style1" && (
        <Counter
          style={`${textStyleVariants[varients].init}`}
          percents={percents}
        />
      )}
    </div>
  );
};

export default ProgressBar;
