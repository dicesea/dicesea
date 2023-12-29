import { motion, MotionProps } from "framer-motion";
import React from "react";

interface AnimationProps extends MotionProps {
  children: React.ReactNode;
}

const Animation: React.FC<AnimationProps> = ({ children, ...props }) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      {...props}
    >
      {children}
    </motion.main>
  );
};

export default Animation;
