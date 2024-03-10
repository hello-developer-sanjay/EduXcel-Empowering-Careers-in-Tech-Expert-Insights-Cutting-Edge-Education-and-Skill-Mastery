import { useState } from 'react';
import '../styles/Faq.css';

const Faq = () => {
  const faqs = [
    {
      question: 'How can EduXcel help me advance my career in technology?',
      answer: 'Discover how EduXcels expert-led courses and cutting-edge curriculum can propel your career forward in the dynamic field of technology. Gain practical skills, stay updated with industry trends, and unlock new opportunities with EduXcel.',
    },
    {
      question: 'What sets EduXcel apart from other online learning platforms?',
      answer: 'Learn what makes EduXcel stand out in the crowded online learning landscape. From personalized learning paths to industry-recognized certifications, explore how EduXcel is redefining the future of tech education for aspiring professionals worldwide.',
    },
    {
      question: 'Are EduXcel courses suitable for beginners?',
      answer: "Find out if EduXcel's courses are suitable for beginners looking to kickstart their journey in technology. Whether you're new to coding or seeking to enhance your technical skills, EduXcel offers beginner-friendly courses designed to support learners at every level.",
    },
    {
      question: 'Can I access EduXcel courses on mobile devices?',
      answer: 'Discover the flexibility of learning with EduXcel anytime, anywhere. Explore how our mobile-friendly platform allows you to access course materials, participate in interactive sessions, and track your progress seamlessly on your smartphone or tablet.',
    },
    {
      question: 'Does EduXcel offer scholarships or financial aid?',
      answer: "Learn about EduXcel's commitment to making quality education accessible to all. Explore our scholarship and financial aid options, and discover how you can pursue your educational goals with support from EduXcel.",
    },
  ];
  

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (

    <div className="faq-container">
        <div className="flex justify-center items-center  mt-4">
        <h2 className="text-2xl font-semibold text-green-600 mr-4 ">FAQs</h2>
        </div>
      {faqs.map((faq, index) => (
        <div className="faq-item" key={index}>
          <div className={`question ${activeIndex === index ? 'active' : ''}`} onClick={() => handleToggle(index)}>
            {faq.question}
            <span className={`arrow ${activeIndex === index ? 'up' : 'down'}`}></span>
          </div>
          {activeIndex === index && <div className="answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default Faq;
