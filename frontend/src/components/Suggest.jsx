import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  border: 2px solid #ff6b6b; 
  border-radius: 20px;
  padding: 20px;
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




const CardContainer = styled.div`
  width: 300px;
  height: auto;
  border-radius: 20px;
  margin: 20px 10px;

  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
  animation: ${slideIn} 0.5s ease forwards; /* Apply slide-in animation */

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 600px) {
    margin: 20px 0;

  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition: transform 0.3s ease-in-out;

  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const TitleSection = styled.div`
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const BlogTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ff6b6b;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }

  ${CardContainer}:hover & {
    color: #2C8A56;
  }

  ${CardContainer}:hover &:before {
    transform: scaleX(1);
  }
`;








const Suggest = () => {
  const [randomBlogTitles, setRandomBlogTitles] = useState([]);
  const [setAnimationTrigger] = useState(false);

  useEffect(() => {
    const fetchRandomBlogTitles = async () => {
      try {
        const response = await axios.get('https://edu-back-j3mz.onrender.com/api/random-blog-titles');
        setRandomBlogTitles(response.data);
        setAnimationTrigger(true); // Trigger animation after data fetch
      } catch (error) {
        console.error('Error fetching random blog titles:', error);
      }
    };

    fetchRandomBlogTitles();
  }, []);
  const slugify = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w-]+/g, '')     // Remove all non-word characters
      .replace(/--+/g, '-')        // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');         // Trim - from end of text
  };
  return (
    <>
      <CardWrapper>
        <Title>Curated Blog Recommendations</Title>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {randomBlogTitles.map((title, index) => {
            const slug = slugify(title);
            return (
              <Link key={index} to={`https://eduxcel.vercel.app/blogs/tools/${slug}`}>
                <CardContainer style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Image Section */}
                  <ImageContainer>
                    <CardImage src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/e.webp" alt="Blog Thumbnail" />
                  </ImageContainer>

                  {/* Title Section */}
                  <TitleSection>
                    <BlogTitle>{title}</BlogTitle>
                  </TitleSection>
                </CardContainer>
              </Link>
            );
          })}
        </div>
      </CardWrapper>
    </>
  );
};

export default Suggest;
