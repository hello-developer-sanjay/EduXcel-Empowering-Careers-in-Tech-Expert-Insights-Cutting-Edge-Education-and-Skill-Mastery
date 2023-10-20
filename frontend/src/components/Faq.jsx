import { useState } from 'react';
import '../styles/Faq.css';

const Faq = () => {
  const faqs = [
    {
      question: 'What courses do you offer?',
      answer: 'We offer a wide range of courses including Mathematics, Science, History, Programming, and many more. Visit our Courses page for more details.',
    },
    {
      question: 'How can I enroll in a course?',
      answer: 'To enroll in a course, you need to create an account on our website, choose the desired course, and follow the enrollment process provided on the course page.',
    },
    {
      question: 'Is there any free trial available?',
      answer: 'Yes, we offer free trials for some of our courses. You can check the course details to see if a free trial is available.',
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
