import React from 'react';
import CourseList from '../components/CourseList';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import { styles } from '../styles';

function Home() {
  return (
    <section className={`relative w-full min-h-screen mx-auto overflow-y-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Explore our courses and enhance your skills
          </p>
          <div className='mt-10'>
            <CourseList />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
