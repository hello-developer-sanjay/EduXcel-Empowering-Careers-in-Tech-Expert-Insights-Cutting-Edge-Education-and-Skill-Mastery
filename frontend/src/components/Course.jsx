import  React,{ useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import SubHeader  from './SubHeader';
import {
  Box,
  VStack,
  Text,
  Button,

} from "@chakra-ui/react";
import ModalImage from "react-modal-image"; 
import ReactPlayer from "react-player";

const CourseContainer = styled.div`
  padding: 2rem;
  background-color: #050816; 
  min-height: 100vh;
  overflow: hidden; 
`;


const contentSectionStyle = {
  borderRadius: "px",
  marginLeft: "20px",
  color: '#fff',
  justifyContent: "start",
  alignItems: "start",
  padding: "0px",
  '@media (max-width: 768px)': {
    marginLeft: "0px",
  }
};



const SectionStyle = {
  borderRadius: "px",
  color: "#fff",
  justifyContent: "start",
  alignItems: "start",
  padding: "0px",
};


const CourseNavigation = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1; /* Ensure it's above other content */
  margin-bottom: 0rem;
  
  background-color: #050816;
  padding: 0.5rem 1rem  ;
  overflow-y: auto; /* Enable vertical scrolling for navigation */
  max-height: calc(100vh - 4rem); /* Limit height to viewport height minus padding */
  &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888; /* Color of the scrollbar thumb */
    border-radius: 4px; /* Roundness of the scrollbar thumb */
  }
`;




const CourseTitle = styled.span`
  font-weight: bold;
  font-size: 1.4rem;
  color: #0070f3;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  display: inline-block;
  position: relative;
  padding-bottom: 0.5rem;
  margin-bottom: 0rem;

`;

const ChapterTitle = styled.span`
  color: #0070f3;
  height: 2rem;
    display: inline-block;
  position: relative;
  padding: 0rem;
  margin-bottom: 0rem;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 2px;
    background-color: #0070f3;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0%;
    height: 2px;
    background-color: #ff6b6b;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;


const CourseContent = styled.div`
  background-color: #050816;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto; 
  max-height: calc(100vh - 4rem);
  margin-top: 0.5rem; 
  margin-left: 5rem; 
  margin-right: 5rem; 

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 10px !important; 
  }
  &::-webkit-scrollbar-track {
    background: linear-gradient(to right, #050816, #111); 
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, #0070f3, #00ff95); 
    border-radius: 5px !important; 
    border: 3px solid #050816; 
  }
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to right, #ff6b6b, #ffdd59); 
    border-color: #111; 
  }
  @media (max-width: 768px) {
    margin-left: 0rem; 
    margin-right: 0rem; 
  
    }
`;

const CourseList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CourseItem = styled.li`
  margin-bottom: 0rem;
`;

const CourseDescription = styled.p`
  margin-top: 0.1rem;
  position: relative;
  color: #fff; /* Default text color */

  span.highlight {
    color: #0070f3; /* Highlighted text color */
    font-weight: bold; /* Highlighted text bold */
  }


  &:before {
    content: ' Course Description '; /* Use decorative stars as labels */
    display: block;
    margin-bottom: 1rem;
    font-weight: 500;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    transform: skew(-5deg); /* Apply a slight skew for a dynamic effect */
    color: #0070f3; /* Change the label color */
    font-size: 1rem; /* Adjust label font size */
    letter-spacing: 1px; /* Add letter spacing for emphasis */
    text-align: left;
    text-transform: uppercase; /* Uppercase text for emphasis */
  }

  &:after {
    content: '';
    display: block;
    margin-top: 0.5rem;
    height: 2px;
    background: linear-gradient(
      to right,
      #0070f3,
      #ff6b6b,
      #33d9b2,
      #ffad5a
    ); /* Use a gradient background */
    background-size: 300% 100%; /* Control the gradient width */
    animation: gradient-shift 5s linear infinite; /* Animation for gradient shift */
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 0%;
    }
  }
`;
const CourseDescriptions = styled.p`
 font-size: 1rem; /* Small font size */
  line-height: 1.5;
  margin-top: 1rem;
  position: relative;
  color: #fff; /* Default text color */

  span.highlight {
    color: #0070f3; /* Highlighted text color */
    font-weight: bold; /* Highlighted text bold */
  }



`;

const Course = () => {
  const { category } = useParams();

  const [courses, setProjects] = useState([]);


  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchProjects() {
      try {
        let response;
        if (!category || category === 'all') { // Check if category is undefined or "all"
          response = await axios.get('https://eduxcel-api-5aug.onrender.com/api/courses/category/all');
        } else {
          response = await axios.get(`https://eduxcel-api-5aug.onrender.com/api/courses/category/${category}`);
        }
        setProjects(response.data);
        setLoading(true); 
        setTimeout(() => {
          setLoading(false);
        }, 1000); 
      } catch (error) {
        console.error('Error fetching career options:', error);
      }
    }

    fetchProjects();
  }, [category]);

  const renderMediaContent = (content, title) => {
    if (!content) {
      return null;
    }
  
    if (!Array.isArray(content)) {
      // If content is not an array, wrap it in an array to handle it uniformly
      content = [content];
    }
  
    return content.map((item, index) => {
      if (Array.isArray(item)) {
        return (
          <VStack key={index} align="start" spacing={2} mt={2}>
            {renderMediaContent(item, title)}
          </VStack>
        );
      }

      let element;
      if (typeof item === "string") {
        // Handle special characters
        const specialCharsRegex = /[*$~]([^*$~]+)[*$~]/;
const matchSpecialChars = item.match(specialCharsRegex);

if (matchSpecialChars) {
const specialText = matchSpecialChars[1];
const textBeforeSpecial = item.split(matchSpecialChars[0])[0];
const textAfterSpecial = item.split(matchSpecialChars[0])[1];

element = (
<Text key={index}>
  {textBeforeSpecial}
  <span
style={{
fontWeight: matchSpecialChars[0] === '*' ? 'bold' : 'normal',
color: matchSpecialChars[0] === '$' ? 'green' : matchSpecialChars[0] === '~' ? 'lime' : 'gold',
fontStyle: matchSpecialChars[0] === '*' ? 'italic' : 'normal',
textDecoration: 'none',
fontSize: matchSpecialChars[0] === '$' ? '1.2em' : matchSpecialChars[0] === '~' ? '1.1em' : '1em',
}}
>

{specialText}
  </span>
  {textAfterSpecial}
</Text>
);
} else {              // Check for links
          const linkRegex = /@([^@]+)@/;
          const match = item.match(linkRegex);
  
          if (match) {
            // Handle links
            const link = match[1];
            const textBeforeLink = item.split(match[0])[0];
            const textAfterLink = item.split(match[0])[1];
  
            element = (
              <Text key={index}>
                {textBeforeLink}
                <span
                  style={{ color: "yellow", textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => window.open(link, "_blank")}
                >
                  {link}
                </span>
                {textAfterLink}
              </Text>
            );
          } else if (item.startsWith("http")) {
            // Handle images and videos
            if (item.match(/\.(jpeg|jpg|gif|png)$/)) {
              element = (
                <Box key={index} mb={2} className="image-container">
                  <ModalImage
                    small={item}
                    large={item}
                    alt={`Image ${index}`}
                    className="custom-modal-image"
                  />
                </Box>
              );
            } else if (item.match(/\.(mp4|webm|mkv)$/)) {
              element = (
                <Box
                key={index}
                position="relative"
                paddingTop="56.25%"
                width="100%"
                marginTop="20px"
                marginBottom="0px"
              >
                <ReactPlayer
                  url={item}
                  controls
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: 0, left: 0 }}
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload" 
                      }
                    }
                  }}
                />
              </Box>
              );
            } else {
              element = <Text key={index}>{item}</Text>;
            }
          } else {
            // Handle regular text
            element = <Text key={index} style={{
              fontSize: '16px',
              color: '#fff',
              fontWeight: 'bold',
            }}>
              {item}
            </Text>;
                      }
        }
      }
  
      return <Box key={index} mb={2}>{element}</Box>;
    });
  };
  const renderContent = (content, title) => {
    if (!content) {
      return null;
    }
  
    if (!Array.isArray(content)) {
      // If content is not an array, wrap it in an array to handle it uniformly
      content = [content];
    }
  
    return content.map((item, index) => {
      if (Array.isArray(item)) {
        return (
          <VStack key={index} align="start" spacing={2} mt={2}>
            {renderMediaContent(item, title)}
          </VStack>
        );
      }

      let element;
      if (typeof item === "string") {
        // Handle special characters
        const specialCharsRegex = /[*$~]([^*$~]+)[*$~]/;
const matchSpecialChars = item.match(specialCharsRegex);

if (matchSpecialChars) {
const specialText = matchSpecialChars[1];
const textBeforeSpecial = item.split(matchSpecialChars[0])[0];
const textAfterSpecial = item.split(matchSpecialChars[0])[1];

element = (
<Text key={index}>
  {textBeforeSpecial}
  <span
style={{
fontWeight: matchSpecialChars[0] === '*' ? 'bold' : 'normal',
color: matchSpecialChars[0] === '$' ? 'green' : matchSpecialChars[0] === '~' ? 'lime' : 'gold',
fontStyle: matchSpecialChars[0] === '*' ? 'italic' : 'normal',
textDecoration: 'none',
fontSize: matchSpecialChars[0] === '$' ? '1.2em' : matchSpecialChars[0] === '~' ? '1.1em' : '1em',
}}
>

{specialText}
  </span>
  {textAfterSpecial}
</Text>
);
} else {              // Check for links
          const linkRegex = /@([^@]+)@/;
          const match = item.match(linkRegex);
  
          if (match) {
            // Handle links
            const link = match[1];
            const textBeforeLink = item.split(match[0])[0];
            const textAfterLink = item.split(match[0])[1];
  
            element = (
              <Text key={index}>
                {textBeforeLink}
                <span
                  style={{ color: "yellow", textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => window.open(link, "_blank")}
                >
                  {link}
                </span>
                {textAfterLink}
              </Text>
            );
          } else if (item.startsWith("http")) {
            // Handle images and videos
            if (item.match(/\.(jpeg|jpg|gif|png)$/)) {
              element = (
                <Box key={index} mb={2} className="image-container">
                  <ModalImage
                    small={item}
                    large={item}
                    alt={`Image ${index}`}
                    className="custom-modal-image"
                  />
                </Box>
              );
            } else if (item.match(/\.(mp4|webm|mkv)$/)) {
              element = (
                <Box
                key={index}
                position="relative"
                paddingTop="56.25%"
                width="100%"
                marginTop="20px"
                marginBottom="0px"
              >
                <ReactPlayer
                  url={item}
                  controls
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: 0, left: 0 }}
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload" 
                      }
                    }
                  }}
                />
              </Box>
              );
            } else {
              element = <Text key={index}>{item}</Text>;
            }
          } else {
            // Handle regular text
            element = (
              <Text key={index} style={{
                fontSize: '16px',
                color: '#B0FA03',
                fontWeight: 'bold',
                // Add more styles here
                fontStyle: 'italic',
                textDecoration: 'underline',
                // Add more styles as needed
              }}>
                {item}
              </Text>
            );
                       }
        }
      }
  
      return <Box key={index} mb={2}>{element}</Box>;
    });
  };
  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  const handleDownloadPDF = () => {
    alert("printing...");
  
    const scrollableContainer = document.getElementById('course'); // Change the ID to match your container
  
    // Clone the container and its content
    const printableContent = scrollableContainer.cloneNode(true);
  
    // Adjust styles to remove overflow restrictions
    printableContent.style.overflow = 'visible';
    printableContent.style.maxHeight = 'none';
  
    // Open a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>${category}| EduXcel | Sanjay Patidar</title>
        </head>
        <body>
          ${printableContent.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  
  return (
    <CourseContainer id="course">
 <Helmet>
 <title>{`${category ? category.replace(/_/g, ' ').toUpperCase() + '' : 'All Courses'} | EduXcel  |Sanjay Patidar`}</title>
        <meta name="description" content={`Browse ${category ? category.toUpperCase() + ' courses' : 'all courses'} offered by EduXcel, where education meets innovation. Explore expert insights, cutting-edge education, and skill mastery opportunities. Whether you're a seasoned professional seeking to enhance your skills or a budding enthusiast eager to explore new horizons, EduXcel provides a dynamic learning community where curiosity is encouraged, challenges are embraced, and growth is inevitable. Join us on a journey of discovery, collaboration, and excellence.`} />
      </Helmet>
     <CourseNavigation>
       <SubHeader/>

      </CourseNavigation>
      <CourseContent id="course">

        
      {loading ? ( 
        <p style={{ fontSize: '20px',  color: '#007bff', textAlign: 'center', paddingTop: '20px' }}>Please wait while we fetch the data...</p>
          )
         : courses.length > 0 ? (
          <CourseList>
            {courses.map((course) => {
              return (
                <CourseItem key={category}>
                    <CourseTitle>{course.title}</CourseTitle>
                    <Button 
  onClick={handleDownloadPDF} 
  isLoading={loading} 
  loadingText="Downloading..."
  style={{
    marginLeft: '20px', 
    marginTop:'0.5rem',  
    backgroundColor: 'rgb(63, 81, 181)', 
    color: 'white', 
    borderRadius: '30px',
    padding: '8px 20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    border: 'none',
    cursor: 'pointer',
    
    transition: 'background-color 0.3s, transform 0.3s',
  }}
  hoverStyle={{
    backgroundColor: 'rgb(48, 63, 159)',
  }}
>
  <span style={{ marginRight: '8px' }}>🖨️</span> Print PDF
</Button>
                                 {course.overview && (
                  <CourseDescriptions>
                    {course.overview.map((desc, index) => {
                      const highlightedText = desc.split(/\^([^]+?)\^/).map((part, i) => {
                        if (i % 2 === 1) {
                          return <span key={i} className="highlight">{part}</span>;
                        }
                        return part;
                      });

                      return (
                        <React.Fragment key={index}>
                          {highlightedText}
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </CourseDescriptions>
)}
                                Max Learning Hour : {course.max_learning_hours}



<div id={`content-${course.title}-Introduction_to_HTML`} style={SectionStyle}>
{renderMediaContent(course.topics?.title, course.title)}
</div>


<NavLink
  to={`/${category}/${course.topics?.Introduction_to_HTML?.title ? slugify(course.topics.Introduction_to_HTML.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>
  <div id={`content-${course.title}-Introduction_to_HTML`} style={SectionStyle}>
    {renderContent(course.topics?.Introduction_to_HTML?.title, course.title)}
  </div>
</NavLink>

<div id={`content-${course.overview}-Introduction_to_HTML`} style={contentSectionStyle}>
{renderMediaContent(course.topics?.Introduction_to_HTML?.overview, course.title)}
</div>

<NavLink 
  to={`/${category}/${course.topics?.HTML_Document_Structure?.title ? slugify(course.topics.HTML_Document_Structure.title) : ''}`} 
  style={{ textDecoration: 'none', color: 'blue' }}  
  target="_blank"  
  rel="noopener noreferrer"  
>
  <div id={`content-${course.title}-HTML_Document_Structure`}   >

    {renderContent(course.topics?.HTML_Document_Structure?.title, course.title)}
  </div>  
</NavLink>


<div id={`content-${course.title}-HTML_Document_Structure`} style={contentSectionStyle}>
{renderMediaContent(course.topics?.HTML_Document_Structure?.overview, course.title)}
</div>


<NavLink to={`/${category}/${course.topics?.HTML_Elements_and_Tags?.title ? slugify(course.topics.HTML_Elements_and_Tags.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Elements_and_Tags`} style={SectionStyle}>
{renderContent(course.topics?.HTML_Elements_and_Tags?.title, course.title)}
</div> 
</NavLink>


<div id={`content-${course.title}-HTML_Elements_and_Tags`} style={contentSectionStyle}>
{renderMediaContent(course.topics?.HTML_Elements_and_Tags?.overview, course.title)}
</div>


<NavLink to={`/${category}/${course.topics?.HTML_Attributes?.title ? slugify(course.topics.HTML_Attributes.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Attributes`} style={SectionStyle}>
{renderContent(course.topics?.HTML_Attributes?.title, course.title)}
</div>

</NavLink>

<div id={`content-${course.title}-HTML_Attributes`} style={contentSectionStyle}>
{renderMediaContent(course.topics?.HTML_Attributes?.overview, course.title)}
</div>

<NavLink to={`/${category}/${course.topics?.HTML_Forms?.title ? slugify(course.topics.HTML_Forms.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Forms`} style={SectionStyle}>
{renderContent(course.topics?.HTML_Forms?.title, course.title)}
</div>
</NavLink>

<div id={`content-${course.title}-HTML_Forms`} style={contentSectionStyle}>
{renderMediaContent(course.topics?.HTML_Forms?.overview, course.title)}
</div>
<NavLink to={`/${category}/${course.topics?.HTML_Tables?.title ? slugify(course.topics.HTML_Tables.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Tables`} style={SectionStyle}>
{renderContent(course.topics?.HTML_Tables?.title, course.title)}
</div> </NavLink>

<div id={`content-${course.title}-HTML_Tables`} style={contentSectionStyle}>
{renderMediaContent(course.topics?.HTML_Tables?.overview, course.title)}
</div>
<NavLink to={`/${category}/${course.topics?.HTML_Semantic_Elements?.title ? slugify(course.topics.HTML_Semantic_Elements.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Semantic_Elements`} style={SectionStyle}>
{renderContent(course.topics?.HTML_Semantic_Elements?.title, course.title)}
</div></NavLink>
<div id={`content-${course.title}-HTML_Semantic_Elements`} style={contentSectionStyle}>
{renderMediaContent(course.topics?.HTML_Semantic_Elements?.overview, course.title)}
</div>
<NavLink to={`/${category}/${course.topics?.HTML_Multimedia?.title ? slugify(course.topics.HTML_Multimedia.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Multimedia`} style={SectionStyle}>
{renderContent(course.topics?.HTML_Multimedia?.title, course.title)}
</div>
</NavLink>
<div id={`content-${course.title}-HTML_Multimedia`} style={contentSectionStyle}>
{renderMediaContent(course.topics?.HTML_Multimedia?.overview, course.title)}
</div>
<NavLink to={`/${category}/${course.topics?.HTML_Layouts?.title ? slugify(course.topics.HTML_Layouts.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Layouts`} style={SectionStyle}>
{renderContent(course.topics?.HTML_Layouts?.title, course.title)}
</div></NavLink>

<div id={`content-${course.title}-HTML_Layouts`} style={contentSectionStyle}>
{renderMediaContent(course.topics?.HTML_Layouts?.overview, course.title)}
</div>
<NavLink to={`/${category}/${course.topics?.HTML5_Features?.title ? slugify(course.topics.HTML5_Features.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML5_Features`} style={SectionStyle}>
{renderContent(course.topics?.HTML5_Features?.title, course.title)}
</div></NavLink>
<div id={`content-${course.title}-HTML5_Features`} style={contentSectionStyle}>
{renderMediaContent(course.topics?.HTML5_Features?.overview, course.title)}
</div>
<div id={`content-${course.title}-Introduction_to_HTML`} style={SectionStyle}>
{renderMediaContent(course.important_topics?.title, course.title)}
</div>
<NavLink to={`/${category}/${course.important_topics?.HTML_Syntax?.title ? slugify(course.important_topics.HTML_Syntax.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Syntax`} style={SectionStyle}>
{renderContent(course.important_topics?.HTML_Syntax?.title, course.title)}
</div> </NavLink>
<div id={`content-${course.title}-HTML_Syntax`} style={contentSectionStyle}>
{renderMediaContent(course.important_topics?.HTML_Syntax?.overview, course.title)}
</div>
<NavLink to={`/${category}/${course.important_topics?.HTML_Elements_and_Attributes?.title ? slugify(course.important_topics.HTML_Elements_and_Attributes.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Elements_and_Attributes`} style={SectionStyle}>
{renderContent(course.important_topics?.HTML_Elements_and_Attributes?.title, course.title)}
</div>
</NavLink>
<div id={`content-${course.title}-HTML_Elements_and_Attributes`} style={contentSectionStyle}>
{renderMediaContent(course.important_topics?.HTML_Elements_and_Attributes?.overview, course.title)}
</div>
<NavLink to={`/${category}/${course.important_topics?.HTML_Forms_and_Input_Types?.title ? slugify(course.important_topics.HTML_Forms_and_Input_Types.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Forms_and_Input_Types`} style={SectionStyle}>
{renderContent(course.important_topics?.HTML_Forms_and_Input_Types?.title, course.title)}
</div>
</NavLink>

<div id={`content-${course.title}-HTML_Forms_and_Input_Types`} style={contentSectionStyle}>
{renderMediaContent(course.important_topics?.HTML_Forms_and_Input_Types?.overview, course.title)}
</div>
<NavLink to={`/${category}/${course.important_topics?.HTML5_Semantic_Elements?.title ? slugify(course.important_topics.HTML5_Semantic_Elements.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML5_Semantic_Elements`} style={SectionStyle}>
{renderContent(course.important_topics?.HTML5_Semantic_Elements?.title, course.title)}
</div> </NavLink>

<div id={`content-${course.title}-HTML5_Semantic_Elements`} style={contentSectionStyle}>
{renderMediaContent(course.important_topics?.HTML5_Semantic_Elements?.overview, course.title)}
</div>
<NavLink to={`/${category}/${course.important_topics?.HTML_Multimedia_Tags?.title ? slugify(course.important_topics.HTML_Multimedia_Tags.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Multimedia_Tags`} style={SectionStyle}>
{renderContent(course.important_topics?.HTML_Multimedia_Tags?.title, course.title)}
</div></NavLink>
<div id={`content-${course.title}-HTML_Multimedia_Tags`} style={contentSectionStyle}>
{renderMediaContent(course.important_topics?.HTML5_Semantic_Elements?.overview, course.title)}
</div>
<NavLink to={`/${category}/${course.important_topics?.HTML_Accessibility?.title ? slugify(course.important_topics.HTML_Accessibility.title) : ''}`} style={{ textDecoration: 'none' }}  target="_blank"  
  rel="noopener noreferrer"  >

<div id={`content-${course.title}-HTML_Accessibility`} style={SectionStyle}>
{renderContent(course.important_topics?.HTML_Accessibility?.title, course.title)}
</div> </NavLink>
<div id={`content-${course.title}-HTML_Accessibility`} style={contentSectionStyle}>
{renderMediaContent(course.important_topics?.HTML_Accessibility?.overview, course.title)}
</div>



<div id={`content-${course.title}-Introduction_to_CSS`} style={SectionStyle}>
{renderMediaContent(course.topic?.title, course.title)}
</div>
<NavLink
  to={`/${category}/${course.topic?.Introduction_to_CSS?.title ? slugify(course.topic.Introduction_to_CSS.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>
  <div id={`content-${course.title}-Introduction_to_CSS`} style={SectionStyle}>
    {renderContent(course.topic?.Introduction_to_CSS?.title, course.title)}
  </div>
</NavLink> 
<div id={`content-${course.title}-Introduction_to_CSS`} style={contentSectionStyle}>
{renderMediaContent(course.topic?.Introduction_to_CSS?.overview, course.title)}
</div>


<NavLink
  to={`/${category}/${course.topic?.CSS_Selectors?.title ? slugify(course.topic.CSS_Selectors.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>
<div id={`content-${course.title}-CSS_Selectors`} style={SectionStyle}>
{renderContent(course.topic?.CSS_Selectors?.title, course.title)}
</div>
</NavLink>  

<div id={`content-${course.title}-CSS_Selectors`} style={contentSectionStyle}>
{renderMediaContent(course.topic?.CSS_Selectors?.overview, course.title)}
</div>



<NavLink
  to={`/${category}/${course.topic?.CSS_Box_Model?.title ? slugify(course.topic.CSS_Box_Model.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>
<div id={`content-${course.title}-CSS_Box_Model`} style={SectionStyle}>
{renderContent(course.topic?.CSS_Box_Model?.title  , course.title)}
</div>
</NavLink> 

<div id={`content-${course.title}-CSS_Box_Model`} style={contentSectionStyle}>
{renderMediaContent(course.topic?.CSS_Box_Model?.overview, course.title)}
</div>

<NavLink
  to={`/${category}/${course.topic?.CSS_Colors_and_Backgrounds?.title ? slugify(course.topic.CSS_Colors_and_Backgrounds.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>
<div id={`content-${course.title}-CSS_Colors_and_Backgrounds`} style={SectionStyle}>
{renderContent(course.topic?.CSS_Colors_and_Backgrounds?.title  , course.title)}
</div>
</NavLink> 

<div id={`content-${course.title}-CSS_Colors_and_Backgrounds`} style={contentSectionStyle}>
{renderMediaContent(course.topic?.CSS_Colors_and_Backgrounds?.overview, course.title)}
</div>
<NavLink
  to={`/${category}/${course.topic?.CSS_Typography?.title ? slugify(course.topic.CSS_Typography.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>

<div id={`content-${course.title}-CSS_Typography`} style={SectionStyle}>
{renderContent(course.topic?.CSS_Typography?.title  , course.title)}
</div>
</NavLink> 

<div id={`content-${course.title}-CSS_Typography`} style={contentSectionStyle}>
{renderMediaContent(course.topic?.CSS_Typography?.overview, course.title)}
</div>
<NavLink
  to={`/${category}/${course.topic?.CSS_Transitions_and_Animations?.title ? slugify(course.topic.CSS_Transitions_and_Animations.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>
<div id={`content-${course.title}-CSS_Transitions_and_Animations`} style={SectionStyle}>
{renderContent(course.topic?.CSS_Transitions_and_Animations?.title  , course.title)}
</div>
</NavLink> 

<div id={`content-${course.title}-CSS_Transitions_and_Animations`} style={contentSectionStyle}>
{renderMediaContent(course.topic?.CSS_Transitions_and_Animations?.overview, course.title)}
</div>

<NavLink
  to={`/${category}/${course.topic?.CSS_Flexbox_and_Grid?.title ? slugify(course.topic.CSS_Flexbox_and_Grid.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>

<div id={`content-${course.title}-CSS_Flexbox_and_Grid`} style={SectionStyle}>
{renderContent(course.topic?.CSS_Flexbox_and_Grid?.title  , course.title)}
</div>
</NavLink> 

<div id={`content-${course.title}-CSS_Flexbox_and_Grid`} style={contentSectionStyle}>
{renderMediaContent(course.topic?.CSS_Flexbox_and_Grid?.overview, course.title)}
</div>

<NavLink
  to={`/${category}/${course.topic?.CSS_Best_Practices?.title ? slugify(course.topic.CSS_Best_Practices.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>

<div id={`content-${course.title}-CSS_Best_Practices`} style={SectionStyle}>
{renderContent(course.topic?.CSS_Best_Practices?.title  , course.title)}
</div>
</NavLink>

<div id={`content-${course.title}-CSS_Best_Practices`} style={contentSectionStyle}>
{renderMediaContent(course.topic?.CSS_Best_Practices?.overview, course.title)}
</div>

<div id={`content-${course.title}-CSS (Cascading Style Sheets)`} style={SectionStyle}>
{renderMediaContent(course.important_topic?.title, course.title)}
</div>


<NavLink
  to={`/${category}/${course.important_topic?.CSS_Specificity?.title ? slugify(course.important_topic.CSS_Specificity.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>
<div id={`content-${course.title}-CSS_Specificity`} style={SectionStyle}>
{renderContent(course.important_topic?.CSS_Specificity?.title, course.title)}
</div>
</NavLink> 


<div id={`content-${course.title}-CSS_Specificity`} style={contentSectionStyle}>
{renderMediaContent(course.important_topic?.CSS_Specificity?.overview, course.title)}
</div>  

<NavLink
  to={`/${category}/${course.important_topic?.CSS_Positioning?.title ? slugify(course.important_topic.CSS_Positioning.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>
<div id={`content-${course.title}-CSS_Positioning`} style={SectionStyle}>
{renderContent(course.important_topic?.CSS_Positioning?.title, course.title)}
</div>
</NavLink> 

<div id={`content-${course.title}-CSS_Positioning`} style={contentSectionStyle}>
{renderMediaContent(course.important_topic?.CSS_Positioning?.overview, course.title)}
</div>


<NavLink
  to={`/${category}/${course.important_topic?.CSS_Floats_and_Clearing?.title ? slugify(course.important_topic.CSS_Floats_and_Clearing.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>

<div id={`content-${course.title}-CSS_Floats_and_Clearing`} style={SectionStyle}>
{renderContent(course.important_topic?.CSS_Floats_and_Clearing?.title, course.title)}
</div>
</NavLink> 

<div id={`content-${course.title}-CSS_Floats_and_Clearing`} style={contentSectionStyle}>
{renderMediaContent(course.important_topic?.CSS_Floats_and_Clearing?.overview, course.title)}
</div>


<NavLink
  to={`/${category}/${course.important_topic?.CSS_Transforms_and_Transitions?.title ? slugify(course.important_topic.CSS_Transforms_and_Transitions.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>
<div id={`content-${course.title}-CSS_Transforms_and_Transitions`} style={SectionStyle}>
{renderContent(course.important_topic?.CSS_Transforms_and_Transitions?.title, course.title)}
</div>
</NavLink> 

<div id={`content-${course.title}-CSS_Transforms_and_Transitions`} style={contentSectionStyle}>
{renderMediaContent(course.important_topic?.CSS_Transforms_and_Transitions?.overview, course.title)}
</div>

<NavLink
  to={`/${category}/${course.important_topic?.CSS_Responsive_Design?.title ? slugify(course.important_topic.CSS_Responsive_Design.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>
<div id={`content-${course.title}-CSS_Responsive_Design`} style={SectionStyle}>
{renderContent(course.important_topic?.CSS_Responsive_Design?.title, course.title)}
</div>
</NavLink>

<div id={`content-${course.title}-CSS_Responsive_Design`} style={contentSectionStyle}>
{renderMediaContent(course.important_topic?.CSS_Responsive_Design?.overview, course.title)}
</div>

<NavLink
  to={`/${category}/${course.important_topic?.CSS_Grid_Systems?.title ? slugify(course.important_topic.CSS_Grid_Systems.title) : ''}`}
  style={{ textDecoration: 'none' }}
  target="_blank"  
  rel="noopener noreferrer"  
>
<div id={`content-${course.title}-CSS_Grid_Systems`} style={SectionStyle}>
{renderContent(course.important_topic?.CSS_Grid_Systems?.title, course.title)}
</div>
</NavLink> 

<div id={`content-${course.title}-CSS_Grid_Systems`} style={contentSectionStyle}>
{renderMediaContent(course.important_topic?.CSS_Grid_Systems?.overview, course.title)}
</div>


                </CourseItem>
              
              );
            })}
          </CourseList>
        ) : (
<p style={{ fontSize: '18px', color: '#666', fontStyle: 'italic', textAlign: 'center' }}>No courses found. We're currently updating our content. Please check back later.</p>
        )}
      </CourseContent>
    </CourseContainer>
  );
};

export default Course;
