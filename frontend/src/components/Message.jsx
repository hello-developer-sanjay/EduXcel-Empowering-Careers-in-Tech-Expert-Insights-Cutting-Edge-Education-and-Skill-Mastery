
import styled from 'styled-components';



const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  border: 2px solid #ff6b6b; 
  border-radius: 20px;
  padding: 20px;
  max-width: 1400px;
`;



const Introduction = styled.div`
 
  font-family: 'Playfair Display', serif;

  
  .highlight {
    position: relative;
    display: inline-block;
    font-size: 1.2rem;
    font-weight: bold;
    color: transparent;
    font-family: 'Playfair Display', serif;

    background: linear-gradient(45deg, #ff4081, #00bcd4); /* Gradient highlight */
    background-clip: text;
    -webkit-background-clip: text;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Shadow for depth */
    padding-bottom: 5px;
    margin-bottom: 1px;
    line-height: 2rem;
    /* Animation for the highlight class */
    animation: highlightAnimation 3s ease-in-out infinite;
    @media (max-width: 768px) {
  font-size: 1rem;
  line-height: 2rem;

  }
  }



`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #fff; /* Text color */
  padding: 10px 20px; /* Padding to create space around the text */
  border-radius: 20px; /* Rounded corners for the "metal plate" */
  border: 2px solid #ff6b6b; /* Border color */
  overflow: hidden; /* Hide any overflowing text */
  z-index: 1; /* Ensure the title appears above other elements */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  position: relative; /* Ensure proper positioning */
  
  /* Engraved effect */
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none; /* Allow interaction with elements behind the pseudo-element */
  }
`;




const TitleSection = styled.div`
  padding: 20px;
  width: 
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;



const BlogTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #5AB2A0;
  position: relative;
  overflow: hidden;
  padding:1rem;
  transition: color 0.3s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }
`;

const Message = () => {
  

  return (
    <>
      <CardWrapper>
      <Introduction>

        <Title>Welcome to EduXcel: Empowering Careers in Tech! </Title>
        <TitleSection>
          <BlogTitle>A Message from Our Founder </BlogTitle>
<p>Dear Valued Visitors,
<br/>
</p>
<p>I am thrilled to extend a warm welcome to you as the <span className="highlight">founder of EduXcel</span>. Our journey began with a profound vision to revolutionize the tech industry and empower individuals like you to excel in your careers.<br/>
</p>

<p>At <span className="highlight">EduXcel</span>, we believe that education is the cornerstone of progress, and technology serves as the catalyst for innovation. Our mission is simple yet ambitious: to provide expert insights, cutting-edge education, and skill mastery opportunities to learners worldwide.<br/></p>

<p>As a passionate advocate for education and technology, I understand the transformative power they hold. From my own experiences as a student to my endeavors in web development and UI/UX design, I've witnessed firsthand the profound impact that knowledge and innovation can have on one's journey.<br/></p>

<p>Through <span className="highlight">EduXcel</span>, we strive to cultivate a dynamic learning community where curiosity is encouraged, challenges are embraced, and growth is inevitable. Whether you're a seasoned professional seeking to enhance your skills or a budding enthusiast eager to explore new horizons, you'll find a wealth of resources and support within our platform.<br/></p>
    
    <p>Our commitment extends beyond just providing information; we are dedicated to fostering a culture of collaboration, creativity, and excellence. Together, let's embark on a journey of discovery, where each lesson learned and every skill mastered brings us closer to our goals.<br/></p>
    <p>Thank you for choosing <span className="highlight">EduXcel</span> as your partner in education and tech. I invite you to explore our offerings, engage with our community, and join us in shaping the future of technology together.<br/></p>
<p>Empower your career. Ignite your passion. Excel with <span className="highlight">EduXcel</span>.
<br/>
</p>
    <p>Warm regards,<br/></p>
   <p> <span className="highlight">Sanjay Patidar
    </span><br/></p>
    <span className="highlight">Founder, EduXcel | Empowering Careers in Tech

</span>

        </TitleSection>
              </Introduction>

      </CardWrapper>
    </>
  );
};

export default Message;
