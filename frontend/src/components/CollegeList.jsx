import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners'; 
import styled from 'styled-components';

import courseImage1 from '../assets/cu.jpg';
import courseImage2 from '../assets/chitkara.jpg';
const LoadingOverlay = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0; 
`;
function CollegeList() {
  const [journals, setJournals] = useState([]);
  const { institute } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJournals() {
    try {
        let response;
        if (!institute || institute === 'all') {
          response = await axios.get('https://eduxcel-api-16july.onrender.com/api/institute/all');
        } else {
          response = await axios.get(`https://eduxcel-api-16july.onrender.com/api/institute/${institute}`);
        }
        if (!response) {
          response = await axios.get('https://eduxcel-api-16july.onrender.com/api/institute');
        }
        setJournals(response.data);
        setLoading(false); 

      } catch (error) {
        console.error('Error fetching journals:', error);
      }
    }

    fetchJournals();
  }, [institute]);

  const uniqueCategories = Array.from(new Set(journals.map(journal => journal.institute)));

 


 
  return (
    <div className="course-list">
       {loading && ( // Display loading animation if loading is true
        <LoadingOverlay>
          <RingLoader color="#fff" loading={loading} size={150} />
        </LoadingOverlay>
      )}
      <div className="course-cards">
        {uniqueCategories.map((institute, index) => {
          const journal = journals.find(journal => journal.institute === institute);
          const image = getImageForVision(institute);
          return (
            <div
              className="course-card"
              key={index} // Use index as key since institute itself is not unique
            
            >
              <Link to={`/institute/${institute}`}>
                <div
                  className="course-image"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                ></div>
                <div className="course-info">
                  <h3>{institute}</h3>
                  <p>{journal.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
  
    </div>
  );
}

// Function to get the image URL for each category
function getImageForVision(institute) {
  switch (institute) {
    case 'chandigarh-university-articles':
      return courseImage1;
    case 'chitkara-university-articles':
      return courseImage2;
 
    default:
      return ''; 
  }
}

export default CollegeList;
