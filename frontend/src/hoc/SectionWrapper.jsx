
import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const SectionWrapper = (Component, idName) => {
  function SectionWithWrapper(props) {
    const { selectedDocument } = props;

    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>
        <Component selectedDocument={selectedDocument} />
      </motion.section>
    );
  }

  return SectionWithWrapper;
};

export default SectionWrapper;
