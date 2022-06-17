import { motion, useMotionValue } from "framer-motion";

type ProgressBarStyle = "style1" | "style2";

// 待加上counter
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
    init: "text-xs text-styleColors-mainGray",
  },
  style2: {
    init: "text-[10px] leading-3 text-white",
  },
};

export const ProgressBar = ({
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
        className={`w-full overflow-hidden rounded-md bg-styleColors-greyBlue ${styleVariants[varients].init}`}
      >
        <motion.div
          className="px-1.5 py-1 h-full bg-chartColor-mainBlue"
          initial={{ x: "0" }}
          animate={{
            x: `-${100 - percents}%`,
            transition: {
              duration: 3,
              delay: 0.5,
              ease: "easeInOut",
            },
          }}
        >
          {isShowText && varients === "style2" && (
            <p className={`${textStyleVariants[varients].init}`}>{percents}%</p>
          )}
        </motion.div>
        {/* {x} */}
      </div>
      {isShowText && varients === "style1" && (
        <p className={`${textStyleVariants[varients].init}`}>{percents}%</p>
      )}
    </div>
  );
};
