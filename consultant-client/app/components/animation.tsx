"use client"
import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
}

export const Animate = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "linear" }}
    >
      {children}
    </motion.main>
  )
}

export const ModalAnimation = ({ children }: { children: React.ReactNode }) => {
    return (
      <motion.div
        initial={{ scale: 0.6 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="w-full h-screen flex justify-center items-center"
      >
        {children}
      </motion.div>
    );
};

export const ListAnimation = ({ children, index }: { children: React.ReactNode, index: number }) => {
    return (
      <motion.div
        key={index}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: index * 0.1 }}
      >
        {children}
      </motion.div>
    );
};

export const TableRowAnimation = ({ children, index }: { children: React.ReactNode, index: number }) => {
    return (
      <motion.tr
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: index * 0.1 }}
        className={`${index !== 0 && 'border-t-[0.1px] border-[#676767]'}`}
      >
        {children}
      </motion.tr>
    );
};