    /* eslint-disable react/prop-types */
    /* eslint-disable react/display-name */
    import React, { useState,useMemo, useEffect, useRef, useCallback } from "react";
    import {
      Box,
      Input,
      VStack,
      Text,
      
      IconButton,
      useDisclosure,
      Collapse,
      Button,
    } from "@chakra-ui/react";
    import videojs from 'video.js';
import 'video.js/dist/video-js.css'; 
    import {
    
      RingLoader,
      SyncLoader,
      ClipLoader,
    
    } from "react-spinners";
    
    import { motion } from "framer-motion";
    import ModalImage from "react-modal-image"; 

    import { FaArrowCircleUp, FaBars, FaTimes } from "react-icons/fa";

    import { useNavigate, useLocation } from "react-router-dom";
    import ReactPlayer from "react-player";
    import "../styles/Blogs.css";

    import { Link } from "react-router-dom";

   
    const slugify = (text) => {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w-]+/g, '')     // Remove all non-word characters
        .replace(/--+/g, '-')        // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
    };
    
    const BlogTitle = React.forwardRef(({ title, collection, onClick, location }, ref) => {
      const slug = slugify(title); // Generate slug from title
    
      return (
        <motion.div
          whileHover={{
            textDecoration: "underline",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={() => onClick(title, collection)}
          ref={ref}
          style={{ cursor: "pointer", marginLeft: location === "main" ? "50px" : "0", position: "relative" }} // Add position relative
        >
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "none",
              fontFamily: "Roboto, sans-serif",
              textAlign: "left",
              padding: "8px",
              fontSize: location === "main" ? "25px" : "18px",
              color: location === "main" ? "white" : "Turquoise ",
              marginTop: location === "main" ? "50px" : "5px",
            }}
          >
            <Link
              to={`/blogs/${collection}/${slug}`} 
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {title}
            </Link>
          </div>
          {location === "main" && (
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: 0,
                width: "100%",
                height: "2px",
                background: "linear-gradient(to right, rgba(255, 215, 0, 1), rgba(255, 255, 255, 0.7), rgba(255, 215, 0, 1))", // Use linear gradient for a more dynamic shine effect
                borderRadius: "10px",
                animation: "shine 2s infinite linear",
              }}
            />
          )}
        </motion.div>
      );
    });
    
    
    const Blogs = () => {
      const [blogsData, setBlogsData] = useState({
        tools: [],
        working: [],
      });
      const [loading, setLoading] = useState(true);
 useEffect(() => {
        // Initialize Video.js for each video element
        const videos = document.querySelectorAll('video');
        videos.forEach(videoElement => {
          videojs(videoElement);
        });
      
        // Cleanup on unmount
        return () => {
          videos.forEach(videoElement => {
            const player = videojs(videoElement);
            player.dispose();
          });
        };
      }, []);
      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(1); 
      const navigate = useNavigate();
      const titleRefs = useRef({});
      const { isOpen, onToggle } = useDisclosure();
      const [lastVisitedBlog, setLastVisitedBlog] = useState(null);

      const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func(...args);
          }, delay);
        };
      };
      
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };  
      const observer = useRef();

      const [searchQuery, setSearchQuery] = useState("");
      const [scrollProgress, setScrollProgress] = useState(0);
      const [remainingProgress, setRemainingProgress] = useState(100);

      const location = useLocation();
      const [clickedTitle, setClickedTitle] = useState(null);
      const scrollToTitle = (title, collection, isChildTitle) => {
        const titleRef = titleRefs.current[`${collection}-${title}`];
        if (titleRef) {
          titleRef.scrollIntoView({
            behavior: "smooth",
            block: isChildTitle ? "center" : "start",
          });
        }
      };

      const handleSearchChange = (event) => {
        const newQuery = event.target.value;
        setSearchQuery(newQuery);
        navigate(`/blogs/search/${encodeURIComponent(newQuery)}`);
      };
      const fetchData = async (collection) => {
        try {
          const response = await fetch(
            `https://eduxcel-api-13april.onrender.com/api/${collection}`
          );
          const responseData = await response.json();
          setBlogsData((prevData) => ({
            ...prevData,
            [collection]: responseData,
          }));
        } catch (error) {
          console.error(`Error fetching ${collection} data:`, error);
        }
      };

      const fetchDataForAllCollections = async () => {
        const collections = ["tools", "working"];
        const promises = collections.map((collection) => fetchData(collection));
        await Promise.all(promises);
      };
      const filteredBlogs = (collection) => {
        const blogsCollection = blogsData[collection] || [];
        return blogsCollection.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }; 
    useEffect(() => {
  fetchDataForAllCollections().then(() => setLoading(false));
}, []);

      const debouncedSearchChange = useCallback(debounce(handleSearchChange, 500), []);
    
      useEffect(() => {
        debouncedSearchChange(searchQuery);
      }, [debouncedSearchChange, searchQuery]);
    
      const filteredBlogsMemoized = useMemo(() => {
        return Object.keys(blogsData).reduce((acc, collection) => {
          acc[collection] = filteredBlogs(collection);
          return acc;
        }, {});
      }, [blogsData]);
    
      const observeLastBlog = useCallback(
        (collection, node) => {
          if (observer.current) {
            observer.current.disconnect();
          }
    
          observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              // Implement your logic here if needed
            }
          });
    
          if (node) {
            observer.current.observe(node);
          }
        },
        [observer]
      );
    
      const handleScroll = (e) => {
        const container = e.target;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        const contentHeight = scrollHeight - clientHeight;
        const progress = (scrollTop / contentHeight) * 100;

        setScrollProgress(progress);

        const remaining = 100 - progress;
        setRemainingProgress(remaining);
      };

      const scrollToTop = () => {
        const container = document.getElementById("blogs-section");
        if (container) {
          container.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      };
      const generateSlug = (text) => {
        return text.toString().toLowerCase()
          .replace(/\s+/g, '-')        // Replace spaces with -
          .replace(/[^\w-]+/g, '')     // Remove all non-word characters
          .replace(/--+/g, '-')        // Replace multiple - with single -
          .replace(/^-+/, '')          // Trim - from start of text
          .replace(/-+$/, '');         // Trim - from end of text
      };
      const handleTitleClick = useCallback((title, collection) => {
        const encodedTitle = encodeURIComponent(title);
        const matchingBlog = blogsData[collection].find((blog) => blog.title === title);
    
        if (matchingBlog) {
          const pageIndex =
            Math.ceil(blogsData[collection].indexOf(matchingBlog) / postsPerPage) + 1;
    
          const slug = generateSlug(title); // Generate slug from title
    
          navigate(`/blogs/${collection}/${slug}`, {
            replace: true,
          });
    
          setCurrentPage(pageIndex);
    
          // Set the title dynamically when a title is clicked
          document.title = `${matchingBlog.title} | Eduxcel`; 
        }
        setLastVisitedBlog({ title, collection });
      }, [blogsData, navigate, postsPerPage, setCurrentPage, setLastVisitedBlog]);
    
  useEffect(() => {
    const query = location.pathname.split("/blogs/search/")[1] || "";
    setSearchQuery(decodeURIComponent(query));
    fetchDataForAllCollections();

    if (clickedTitle) {
      // Reset the clicked title state
      setClickedTitle(null);
    }

    // Check for title in URL and display the content directly
    const urlTitleMatch = location.pathname.match(/\/blogs\/(.+?)\/(.+)/);
    if (urlTitleMatch) {
      const [, collection, encodedTitle] = urlTitleMatch;
      const urlTitle = decodeURIComponent(encodedTitle);
      const matchingBlog = blogsData[collection]?.find(
        (blog) =>
        slugify(blog.title) === urlTitle ||
        (blog.parentTitle && blog.parentTitle.title === urlTitle) ||
          (blog.extension1 && blog.extension1.title === urlTitle) ||
          (blog.extension2 && blog.extension2.title === urlTitle) ||
          (blog.extension3 && blog.extension3.title === urlTitle) ||
          (blog.extension4 && blog.extension4.title === urlTitle) ||
          (blog.extension5 && blog.extension5.title === urlTitle) ||
          (blog.needForAdvancedTechniques && blog.needForAdvancedTechniques.title === urlTitle) ||
          (blog.dask && blog.dask.title === urlTitle) ||
          (blog.vaex && blog.vaex.title === urlTitle) ||
          (blog.optimizationStrategies && blog.optimizationStrategies.title === urlTitle) ||
          (blog.parallelComputing && blog.parallelComputing.title === urlTitle) ||


          (blog.settingUpGit && blog.settingUpGit.title === urlTitle) ||

          (blog.configuringUsernameAndEmail && blog.configuringUsernameAndEmail.title === urlTitle) ||

          (blog.components && blog.components.title === urlTitle) ||
          (blog.settingUpJavaDevelopmentEnvironment && blog.settingUpJavaDevelopmentEnvironment.title === urlTitle) ||
          (blog.jvm && blog.jvm.title === urlTitle) ||

          // Add more checks for other extensions as needed
          // ...
          false
      );

   
      if (matchingBlog) {
        // Set the current page to the matched blog's page
        const pageIndex =
          Math.ceil(blogsData[collection].indexOf(matchingBlog) / postsPerPage) + 1;
        setCurrentPage(pageIndex);
        const pageTitle = `${matchingBlog.title} | EduXcel | Sanjay Patidar`;

        // Update Helmet to set the dynamically generated title
        const helmet = document.querySelector('title');
        if (helmet) {
          helmet.innerText = pageTitle;
        }
      }
    }

    if (lastVisitedBlog) {
      localStorage.setItem('lastVisitedBlog', JSON.stringify(lastVisitedBlog));
    }
  }, [location.pathname, clickedTitle, blogsData, fetchDataForAllCollections]);

      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = filteredBlogs("tools").slice(indexOfFirstPost, indexOfLastPost);

    

    const headerStyle = {
      position: "sticky",
      top:0,
      zIndex: 1,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      padding: "1rem",
      backdropFilter: "blur(10px)",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "0 0 20px 20px", // Adds rounded corners at the bottom
      color: "#fff", // Text color
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "Poppins, sans-serif", // Modern sans-serif font
    };


      const progressBarStyle = {
        width: `${scrollProgress}%`,
        height: "4px",
        backgroundColor: "green",
        borderRadius: "2px",
        transition: "width 0.3s",
      };

      const remainingBarStyle = {
        width: `${remainingProgress}%`,
        height: "4px",
        backgroundColor: "lightgray",
        borderRadius: "2px",
      };

      const scrollToTopButtonStyle = {
        position: "fixed",
        bottom: "30px",
        right: "1px",
        zIndex: 2,
        background: "green",
        color: "white",
        borderRadius: "50%",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background-color 0.3s",
        fontSize: "24px",
      };

      const contentSectionStyle = {
        borderRadius: "12px",
        
       justifyContent:"start",
       alignItems:"start",
      };
      
      
      const sidebarStyle = {
        position: "fixed",
        top: "190px",
        left: 0,
        height: "100%",
        width: "200px",
        backgroundColor: "black",
        borderRight: "1px solid lightgray",
        padding: "20px",
        zIndex: 2,
        transition: "left 0.3s",
        overflowX: "hidden",
        overflowY: "auto", 
  maxHeight: "calc(100% - 200px)", 
      };

      const toggleButtonStyle = {
        position: "fixed",
        top: "170px",
        transform: "translateY(-50%)",
        left: isOpen ? "240px" : "20px",
        zIndex: 2,
        background: isOpen ? "#e74c3c" : "#2ecc71", 
        color: "white",
        borderRadius: "50%",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "left 0.3s, background 0.3s",
        border: "2px solid #fff", // White border
        fontSize: "12px",
      };

      toggleButtonStyle.rotate = {
        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
        transition: "transform 0.3s",
      };

      // Hover effect
      toggleButtonStyle["&:hover"] = {
        background: isOpen ? "#c0392b" : "#27ae60", 
      };

      // Pulse animation on hover
      toggleButtonStyle["&:hover"].pulse = {
        animation: "pulse 0.5s infinite",
      };

      // Keyframe animation for pulse
      toggleButtonStyle["@keyframes pulse"] = {
        "0%": {
          transform: "scale(1)",
        },
        "50%": {
          transform: "scale(1.2)",
        },
        "100%": {
          transform: "scale(1)",
        },
      };

      
      const renderMediaContent = (content, title) => {
        if (!content) {
          return null;
        }
      
        if (!Array.isArray(content)) {
          content = [content];
        }
      
        return content.map((item, index) => {
          let element;
      
          if (Array.isArray(item)) {
            // Recursive call for nested arrays
            return (
              <VStack key={index} align="start" spacing={2} mt={2}>
                {renderMediaContent(item, title)}
              </VStack>
            );
          }
      
          if (typeof item === 'object' && item.title) {
            // Render object fields
            element = (
              <VStack key={index} align="start" spacing={2} mt={2}>
                <BlogTitle
                  title={item.title}
                  collection="tools"
                  onClick={() => handleTitleClick(item.title, 'tools')}
                />
                {Object.keys(item).map(key => {
                  if (key !== 'title') {
                    return renderMediaContent(item[key], title);
                  }
                  return null;
                })}
              </VStack>
            );
          }
      
          if (typeof item === 'string') {
            const videoRegex = /\.(mp4|webm|mkv)$/; // Regex to match video file extensions
      
            // Check for video URLs
            if (item.match(videoRegex)) {
              element = (
                <Box
                  key={index}
                  position="relative"
                  paddingTop="56.25%"
                  width="100%"
                  mb={2}
                  className="video-container"
                >
                  <video
                    id={`video-${index}`}
                    className="video-js vjs-default-skin"
                    controls
                    preload="auto"
                    width="100%"
                    height="100%"
                  >
                    <source src={item} type="video/mp4" /> 
                  </video>
                </Box>
              );
              
            } else if (item.match(/\.(jpeg|jpg|gif|png)$/)) {
              // Handle images
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
            } else {
              // Handle regular text
              element = <Text key={index}>{item}</Text>;
            }
          }
      
          return <Box key={index}>{element}</Box>;
        });
      };
      
   


      const navbarHeight = document.querySelector(".navbar")?.clientHeight || 0;
      
    const handleDownloadPDF = () => {
    alert("Please close the sidebar to ensure complete content is printed.");
  
    const scrollableContainer = document.getElementById('blogs-section');
    
    // Clone the container to avoid modifying the original content
    const containerClone = scrollableContainer.cloneNode(true);

    // Remove video elements from the cloned container
    const videoElements = containerClone.querySelectorAll('video');
    videoElements.forEach(video => {
        video.parentNode.removeChild(video);
    });

    // Get the HTML content of the cloned container
    const htmlContent = containerClone.innerHTML;
  
    const title = currentPosts.length > 0 ? currentPosts[0].title : "";
  
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>${title} | EduXcel | Sanjay Patidar</title>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
};

        return (
        <Box
          w="full"
          minH="100vh"
          mx="auto"
          d="flex"
          padding={`calc(${navbarHeight}px + 2rem) 2rem 2rem 2rem`}
          flexDir="column"
          alignItems="start"
          justifyContent="flex-start"
          id="blogs-section"
          overflowY="scroll"
          textAlign={"left"}
          maxHeight="calc(100vh - 100px)"
          height="auto"
          overflowX="hidden"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          onScroll={handleScroll}
          mt="0px"
        >
          {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          {loading && (
                    <>
                    <div style={{ marginRight: "20px" }}>
                      <ClipLoader color={"#FF6347"} loading={loading} size={20} />
                      <span style={{ color: "#FF6347", fontSize: "12px" }}>Fetching data...</span>
                    </div>
          
                    <div style={{ marginRight: "20px" }}>
                      <RingLoader color={"#36D7B7"} loading={loading} size={30} />
                      <span style={{ color: "#36D7B7", fontSize: "14px" }}>Preparing content...</span>
                    </div>
          
                    <div>
                      <SyncLoader color={"#5E35B1"} loading={loading} size={40} />
                      <span style={{ color: "#5E35B1", fontSize: "16px" }}>Almost there...</span>
                    </div>
                    {/* Add more loaders or customize the existing ones */}
                  </>
          
          )}
        </div>
         
          ) : (
            <>
              {/* Toggle Button */}
              <Button
                style={toggleButtonStyle}
                onClick={onToggle}
                leftIcon={isOpen ? <FaTimes /> : <FaBars />}
              >
                {isOpen ? "Close" : "Open"}
              </Button>
      
              {/* Sidebar */}
              <Collapse in={isOpen}>
                <Box style={sidebarStyle}>
                  <VStack align="start" spacing={2}>
                    {Object.keys(blogsData).map((collection) => (
                      <VStack key={collection} align="start" spacing={2}>
                        <Text fontSize="md" fontWeight="semibold" mb={2}>
                          {`${collection.charAt(0).toUpperCase()}${collection.slice(1)}`}
                        </Text>
                        {filteredBlogs(collection).map((blog) => (
                          <BlogTitle
                            key={blog.title}
                            title={blog.title}
                            collection={collection}
                            onClick={(title, collection) => handleTitleClick(title, collection)}
                            ref={(el) => (titleRefs.current[`${collection}-${blog.title}`] = el)}
                                                      location="sidebar" 

                          />
                        ))}
                      </VStack>
                    ))}
                  </VStack>
                </Box>
              </Collapse>
      
              {/* Main Content */}
              <Box mt={0} p={0} ml={isOpen ? "200px" : "0"}>
                <Box style={headerStyle}>
                  <VStack spacing={0} align="start" w="100%" marginTop="0">
                    <Input
                      type="text"
                      placeholder="Search for blogs"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      p={0}
                      marginTop={0}
                      borderWidth="5px"
                      rounded="md"
                      bg="white"
                      color="black"
                      mb={0}
                    />
                    <Box style={progressBarStyle} />
                    <Box style={remainingBarStyle} />
                  </VStack>
                  <IconButton
                    icon={<FaArrowCircleUp />}
                    aria-label="Scroll to Top"
                    onClick={scrollToTop}
                    style={scrollToTopButtonStyle}
                  />
                </Box>
      
                {currentPosts.map((blog, index) => (
                  <motion.div
                    key={blog.title}
                    ref={
                      index === currentPosts.length - 1
                        ? (node) => observeLastBlog("tools", node)
                        : null
                    }
                  >
                    <VStack align="start" spacing={2} id={`title-${blog.title}`} ref={(el) => (titleRefs.current[blog.title] = el)}>
                      <BlogTitle
                        key={blog.title}
                        title={blog.title}
                        collection="tools"
                        onClick={() => handleTitleClick(blog.title, "tools")}
                                                  location="main" 

                      />

<Button 
  onClick={handleDownloadPDF} 
  isLoading={loading} 
  loadingText="Downloading..."
  style={{
    marginLeft: '20px', 
    marginTop: '0.5rem',
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

                    </VStack>
       <VStack spacing={2} id={`content-${blog.title}-overview`} style={contentSectionStyle}>
  {renderMediaContent(blog.overview, blog.title)}
</VStack>

<VStack spacing={2} id={`content-${blog.title}-description`} style={contentSectionStyle}>
  {renderMediaContent(blog.description, blog.title)}
</VStack>
<VStack spacing={2} id={`content-${blog.title}-what`} style={contentSectionStyle}>
  {renderMediaContent(blog.what, blog.title)}
</VStack>
<VStack spacing={2} id={`content-${blog.title}-feature`} style={contentSectionStyle}>
  {renderMediaContent(blog.feature, blog.title)}
</VStack>

<VStack spacing={2} id={`content-${blog.title}-steps`} style={contentSectionStyle}>
  {renderMediaContent(blog.steps, blog.title)}
</VStack>

                      
<VStack spacing={2} id={`content-${blog.title}-university_info`} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.university_info, blog.title)}
</VStack>
<VStack spacing={2} id={`content-${blog.title}-short_detail`} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.university_info?.short_detail, blog.title)}
</VStack>

<VStack spacing={2} id={`content-${blog.title}-location`} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.university_info?.location, blog.title)}
</VStack>
<VStack spacing={2} id={`content-${blog.title}-established`} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.university_info?.established, blog.title)}
</VStack>

<VStack spacing={2} id={`content-${blog.title}-website`} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.university_info?.website, blog.title)}
</VStack>

<VStack spacing={2} id={`content-${blog.title}-motto`} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.university_info?.motto, blog.title)}
</VStack>
<VStack spacing={2} id={`content-${blog.title}-accreditations`} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.university_info?.accreditations, blog.title)}
</VStack>

<VStack spacing={2} id={`content-${blog.title}-affiliations`} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.university_info?.affiliations, blog.title)}
</VStack>

<VStack spacing={2} id={`content-${blog.title}-recognized_by`} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.university_info?.recognized_by, blog.title)}
</VStack>
<VStack spacing={2} id={`content-${blog.title}-academic_programs  `} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.academic_programs, blog.title)}
</VStack>
<VStack spacing={2} id={`content-${blog.title}-campus_facilities  `} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.campus_facilities, blog.title)}
</VStack>
<VStack spacing={2} id={`content-${blog.title}-international_relations  `} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.international_relations, blog.title)}
</VStack>
<VStack spacing={2} id={`content-${blog.title}-research_and_innovation  `} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.research_and_innovation, blog.title)}
</VStack>

<VStack spacing={2} id={`content-${blog.title}-student_support_services  `} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.student_support_services, blog.title)}
</VStack>


<VStack spacing={2} id={`content-${blog.title}-alumni_network  `} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.alumni_network, blog.title)}
</VStack>
<VStack spacing={2} id={`content-${blog.title}-chandigarh_university_information_management_system  `} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.chandigarh_university_information_management_system, blog.title)}
</VStack>

<VStack spacing={2} id={`content-${blog.title}-chandigarh_university_information_management_system  `} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.chandigarh_university_information_management_system?.functionality, blog.title)}
</VStack>
<VStack spacing={2} id={`content-${blog.title}-security_measures  `} style={contentSectionStyle}>
  {renderMediaContent(blog.details?.chandigarh_university_information_management_system?.security_measures, blog.title)}
</VStack>


                  </motion.div>
                ))}
      
              </Box>
            </>
          )}
        </Box>
      );
      };
      
      export default Blogs;
      
