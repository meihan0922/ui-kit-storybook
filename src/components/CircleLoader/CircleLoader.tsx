import { motion } from "framer-motion";

const CircleLoader = ({
  width = "2rem",
  height = "2rem",
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <div
      className="relative"
      style={{
        width,
        height,
      }}
    >
      <motion.div
        className="w-full h-full border-4 border-styleColors-gray  border-t-chartColor-mainBlue rounded-[50%] absolute top-0 left-0"
        animate={{ rotate: 360 }}
        transition={{
          loop: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default CircleLoader;
