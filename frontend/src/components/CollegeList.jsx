import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import courseImage1 from '../assets/cu.jpg';
import courseImage2 from '../assets/chitkara.jpg';
function CollegeList() {
  const [journals, setJournals] = useState([]);
  const { institute } = useParams();

  useEffect(() => {
    async function fetchJournals() {
      try {
        let response;
        if (!institute || institute === 'all') {
          response = await axios.get('https://eduxcel-api-14april.onrender.com/api/institute/all');
        } else {
          response = await axios.get(`https://eduxcel-api-14april.onrender.com/api/institute/${institute}`);
        }
        if (!response) {
          response = await axios.get('https://eduxcel-api-14april.onrender.com/api/institute');
        }
        setJournals(response.data);
      } catch (error) {
        console.error('Error fetching journals:', error);
      }
    }

    fetchJournals();
  }, [institute]);

  const uniqueCategories = Array.from(new Set(journals.map(journal => journal.institute)));

 


 
  return (
    <div className="course-list">
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
