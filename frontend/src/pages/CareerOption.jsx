import  { useEffect, useState } from 'react';
import CareerList from '../components/CareerList';
import { Helmet } from 'react-helmet';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styles } from '../styles';
import axios from 'axios';
import '../styles/home.css';

function CareerOption() {
    const [careerData, setCareerData] = useState([]);

    useEffect(() => {
        // Fetch course data from your API endpoint
        async function fetchCareers() {
            try {
                const response = await axios.get('https://eduxcel-api-5aug.onrender.com/api/careers');
                setCareerData(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }

        fetchCareers();
    }, []); 

    return (
        <section className={`relative w-full min-h-screen mx-auto`}>
                  <Helmet>
    
                  <title> EduXcel Careers |Discover Tech Career Paths with EduXcel: Expert Insights, Innovation, and Growth - Sanjay Patidar, Founder</title>
 <meta
   name="description"
   content="Explore a comprehensive range of tech career paths and opportunities with EduXcel. Gain valuable insights, education, and expert guidance from Sanjay Patidar, the founder of Eduxcel, as you embark on your journey towards mastering tech careers. Discover valuable resources, industry insights, and educational content tailored for aspiring developers, empowering you to make informed decisions and succeed in the dynamic world of technology. Join us at EduXcel and unlock the potential of your tech career today."
 />
 

 <meta property="og:title" content="EduXcel Careers |Discover Tech Career Paths with EduXcel: Expert Insights, Innovation, and Growth - Sanjay Patidar, Founder" />
 <meta property="og:description" content="Explore a comprehensive range of tech career paths and opportunities with EduXcel. Gain valuable insights, education, and expert guidance from Sanjay Patidar, the founder of Eduxcel, as you embark on your journey towards mastering tech careers. Discover valuable resources, industry insights, and educational content tailored for aspiring developers, empowering you to make informed decisions and succeed in the dynamic world of technology. Join us at EduXcel and unlock the potential of your tech career today." />
 <meta property="og:type" content="website" />
 <meta property="og:url" content="https://eduxcel.vercel.app/careers" />
 <meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/logo_eduxcel.jpg" />
 <meta property="og:image:alt" content="Sanjay Patidar" />
 <meta property="og:site_name" content="EduXcel Careers |Discover Tech Career Paths with EduXcel: Expert Insights, Innovation, and Growth - Sanjay Patidar, Founder" />

 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content="EduXcel Careers |Discover Tech Career Paths with EduXcel: Expert Insights, Innovation, and Growth - Sanjay Patidar, Founder" />
 <meta name="twitter:description" content="Explore a comprehensive range of tech career paths and opportunities with EduXcel. Gain valuable insights, education, and expert guidance from Sanjay Patidar, the founder of Eduxcel, as you embark on your journey towards mastering tech careers. Discover valuable resources, industry insights, and educational content tailored for aspiring developers, empowering you to make informed decisions and succeed in the dynamic world of technology. Join us at EduXcel and unlock the potential of your tech career today." />
 <meta name="twitter:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/logo_eduxcel.jpg" />
 <meta name="twitter:site" content="@sanjaypatidar" />
 <meta name="twitter:creator" content="@sanjaypatidar" />

 <meta name="keywords" content="portfolio, signup , eduxcel , tech, education, careers, opportunity, personal-portfolio,developer_sanju,sanjay, Sanjay, SANJAY, Sanjay Patidar, SANJAY PATIDAR, SANJAY WEB DEVELOPER, SANJAY DEVELOPER, Full Stack Web Developer, Mern Stack Web Developer, sanjay patidar, sanjay-patidar, professional, web developer portfolio, coder, web development, UI/UX design, Chandigarh University, EduXcel, Indore,contact, developer, programmer, engineer, AI, Artificial Intelligence ,tech enthusiastic, creativity ,creator, work , technology, coding, projects, experiences, resume, cv" />
 <meta name="author" content="Sanjay Patidar" />        <script type="application/ld+json">
       {JSON.stringify({
         '@context': 'http://schema.org',
         '@type': 'Person',
         "name": "Sanjay Patidar",
         "birthDate": "1998-07-01",
         "birthPlace": {
           "@type": "Place",
           "address": {
             "@type": "PostalAddress",
             "addressLocality": "Indore"
           }
         },
         "alumniOf": {
           "@type": "CollegeOrUniversity",
           "name": "Chandigarh University",
           "location": {
             "@type": "Place",
             "address": {
               "@type": "PostalAddress",
               "addressLocality": "Chandigarh",
               "addressRegion": "Punjab",
               "addressCountry": "India"
             }
           }
         },
         "address": [
           {
             "@type": "PostalAddress",
             "addressLocality": "Indore",
             "addressRegion": "Madhya Pradesh",
             "postalCode": "452001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Chandigarh",
             "addressRegion": "Punjab",
             "postalCode": "160001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Mumbai",
             "addressRegion": "Maharashtra",
             "postalCode": "400001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Bangalore",
             "addressRegion": "Karnataka",
             "postalCode": "560001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Delhi",
             "addressRegion": "Delhi",
             "postalCode": "110001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Kolkata",
             "addressRegion": "West Bengal",
             "postalCode": "700001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Chennai",
             "addressRegion": "Tamil Nadu",
             "postalCode": "600001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Hyderabad",
             "addressRegion": "Telangana",
             "postalCode": "500001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Pune",
             "addressRegion": "Maharashtra",
             "postalCode": "411001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Ahmedabad",
             "addressRegion": "Gujarat",
             "postalCode": "380001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Jaipur",
             "addressRegion": "Rajasthan",
             "postalCode": "302001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Lucknow",
             "addressRegion": "Uttar Pradesh",
             "postalCode": "226001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Bhopal",
             "addressRegion": "Madhya Pradesh",
             "postalCode": "462001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Nagpur",
             "addressRegion": "Maharashtra",
             "postalCode": "440001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Visakhapatnam",
             "addressRegion": "Andhra Pradesh",
             "postalCode": "530001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Kochi",
             "addressRegion": "Kerala",
             "postalCode": "682001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Guwahati",
             "addressRegion": "Assam",
             "postalCode": "781001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Bhubaneswar",
             "addressRegion": "Odisha",
             "postalCode": "751001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Dehradun",
             "addressRegion": "Uttarakhand",
             "postalCode": "248001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Raipur",
             "addressRegion": "Chhattisgarh",
             "postalCode": "492001",
             "addressCountry": "India"
           }
         ],
         "worksFor": {
           "@type": "Organization",
           "name": "Eduxcel" 
         },
         "url": "https://eduxcel.vercel.app/",
         "sameAs": [
           "https://www.linkedin.com/in/sanjay-patidar-25b580292/",
           "https://github.com/hello-developer-sanjay",
           "https://www.instagram.com/sanjay_patidar_mcmxcviii/",
           "https://eduxcel.vercel.app/",
                        "https://eduxcel.vercel.app/signup"

         ]
   

       })}
     </script>


    </Helmet>


    <div className={`${styles.sectionHeadText} text-center mb-4`}>Explore Featured Tech Career Paths</div>

            <p className={`${styles.heroSubText} mt-8 text-white-100 text-center`}>Explore various tech careers like Frontend Development and Backend Development with EduXcel, where education meets innovation. <br/>Join us on a journey of exploration, collaboration, and excellence.</p>
            <CareerList careerData={careerData} />
        </section>
    );
}

export default CareerOption;
