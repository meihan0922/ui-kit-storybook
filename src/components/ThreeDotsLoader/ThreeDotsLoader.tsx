import { motion } from "framer-motion";

// staggerChildren:
// https://www.framer.com/docs/transition/###staggerchildren

const ThreeDotsLoader = ({
  width = "2rem",
  height = "2rem",
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <motion.div
      className="flex justify-around"
      style={{ width, height }}
      initial="start"
      animate="end"
      variants={{
        start: {
          transition: {
            staggerChildren: 0.2,
          },
        },
        end: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <Dots />
      <Dots />
      <Dots />
    </motion.div>
  );
};

const Dots = () => {
  return (
    <motion.div
      className="w-1/4 h-1/4 bg-chartColor-mainBlue justify-around rounded-full"
      variants={{
        start: {
          y: "80%",
        },
        end: {
          y: "220%",
        },
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
};

export default ThreeDotsLoader;
