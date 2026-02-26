import { motion } from "framer-motion";

export default function SectionWrapper({ children, id, style = {} }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={style}
    >
      {children}
    </motion.section>
  );
}
