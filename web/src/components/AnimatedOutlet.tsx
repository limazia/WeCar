import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedOutletProps {
  children: ReactNode;
}

const animations: Variants = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
};

export function AnimatedOutlet({ children }: AnimatedOutletProps) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
