  /* eslint-disable react/prop-types */
    /* eslint-disable react/display-name */
    import React, { useState, useEffect, useRef } from "react";
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

    import { motion } from "framer-motion";
    import ModalImage from "react-modal-image"; 

    import { FaArrowCircleUp, FaBars, FaTimes } from "react-icons/fa";
   
    import { useNavigate, useLocation } from "react-router-dom";
    import ReactPlayer from "react-player";
    import "../styles/Blogs.css";

    import { Link } from "react-router-dom";

    const BlogTitle = React.forwardRef(({ title, collection, onClick }, ref) => (
      <motion.div
        whileHover={{
          textDecoration: "underline",
          
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={() => onClick(title, collection)}
        ref={ref}
        style={{ cursor: "pointer" }}
      >
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          _hover={{ textDecoration: "none" }}
          color="#ffffff" // White text color
          fontFamily="Quicksand, sans-serif" // Clean sans-serif font
          textAlign="left"
          p={2}
        >
       <Link
            to={`/blogs/${collection}/${encodeURIComponent(title)}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {title}
          </Link>

        </Text>
      </motion.div>
    ));
    


    const Blogs = () => {
      const [blogsData, setBlogsData] = useState({
        tools: [],
        working: [],
      });
      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(1); 
      const navigate = useNavigate();
      const titleRefs = useRef({});
      const { isOpen, onToggle } = useDisclosure();

    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };  
      const observer = useRef();

      const [searchQuery, setSearchQuery] = useState("");
      const [scrollProgress, setScrollProgress] = useState(0);
      const [remainingProgress, setRemainingProgress] = useState(100);

      const location = useLocation();
      const [clickedTitle, setClickedTitle] = useState(null);
      const handleTitleClick = (title, collection) => {
        const encodedTitle = encodeURIComponent(title);
        const matchingBlog = blogsData[collection].find(
          (blog) => blog.title === title
        );
      
        if (matchingBlog) {
          const pageIndex =
            Math.ceil(blogsData[collection].indexOf(matchingBlog) / postsPerPage) + 1;
          setCurrentPage(pageIndex);
          setClickedTitle(title);
      
          // Update the URL based on the collection
          navigate(`/blogs/${collection}/${encodedTitle}`, {
            replace: true,
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
            `https://edu-back-j3mz.onrender.com/api/${collection}`
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

      const observeLastBlog = (collection, node) => {
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
      };

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
      const filteredBlogs = (collection) => {
        const blogsCollection = blogsData[collection] || [];
        return blogsCollection.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      };  
      useEffect(() => {
        const query = location.pathname.split("/blogs/search/")[1] || "";
        setSearchQuery(decodeURIComponent(query));
        fetchData("tools");
        fetchData("working");
      
        if (clickedTitle) {
          // Scroll to the clicked title
          const [collection, title] = clickedTitle.split("-");
          const titleRef = titleRefs.current[`${collection}-${title}`];
          if (titleRef) {
            titleRef.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          setClickedTitle(null); // Reset the clicked title state
        }
      
        // Check for title in URL and display the content directly
        const urlTitleMatch = location.pathname.match(/\/blogs\/(.+?)\/(.+)/);
        if (urlTitleMatch) {
          const [, collection, encodedTitle] = urlTitleMatch;
          const urlTitle = decodeURIComponent(encodedTitle);
          const matchingBlog = blogsData[collection]?.find(
            (blog) => blog.title === urlTitle
          );
      
          if (matchingBlog) {
            // Set the current page to the matched blog's page
            const pageIndex =
              Math.ceil(blogsData[collection].indexOf(matchingBlog) / postsPerPage) + 1;
            setCurrentPage(pageIndex);
      
            // Render the content of the matched blog directly
            const contentSection = document.getElementById(`content-${matchingBlog.title}`);
            if (contentSection) {
              contentSection.scrollIntoView({
                behavior: "auto",
                block: "start",
              });
            }
          }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [location.pathname, clickedTitle, blogsData]);
      

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
        background: isOpen ? "#e74c3c" : "#2ecc71", // Red when open, green when closed
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

      // Rotating animation on toggle
      toggleButtonStyle.rotate = {
        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
        transition: "transform 0.3s",
      };

      // Hover effect
      toggleButtonStyle["&:hover"] = {
        background: isOpen ? "#c0392b" : "#27ae60", // Darker red when open, darker green when closed
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

      const renderMediaContent = (content) => {
        if (!content) {
          return null;
        }

        return content.map((item, index) => {
          if (Array.isArray(item)) {
            return (
              <VStack key={index} align="start" spacing={2} mt={2}>
                {renderMediaContent(item)}
              </VStack>
            );
          }

          let element;

          if (typeof item === "string") {
            if (item.startsWith("*") && item.endsWith("*")) {
              const styledText = item.substring(1, item.length - 1);
              element = (
                <Text key={index} fontWeight="bold" textColor="gold" fontStyle="italic"> 
                  {styledText}
                </Text>
              );
            } else if (item.startsWith("$") && item.endsWith("$")) {
              const styledText = item.substring(1, item.length - 1);
              element = (
                <Text key={index} fontWeight="bold" textColor="red" fontStyle="bold">
                  {styledText}
                </Text>
              );
            } else if (item.startsWith("~") && item.endsWith("~")) {
              const styledText = item.substring(1, item.length - 1);
              element = (
                <Text key={index} fontWeight="bold" textColor="lime" fontStyle="bold">
                  {styledText}
                </Text>
              );
            } else if (item.startsWith("http")) {
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
                  >
                    <ReactPlayer
                      url={item}
                      controls
                      width="100%"
                      height="100%"
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </Box>
                );
              } else {
                element = <Text key={index}>{item}</Text>;
              }
            } else {
              element = <Text key={index}>{item}</Text>;
            }
          }

          return <Box key={index} mb={2}>{element}</Box>;
        });
      };

      const navbarHeight = document.querySelector(".navbar")?.clientHeight || 0;

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
          backgroundColor={"black"}
          maxHeight="calc(100vh - 100px)"
          height="auto"
          overflowX="hidden"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          onScroll={handleScroll}
          mt="50px"
        >
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
      />
    ))}
  </VStack>
))}

              </VStack>
            </Box>
          </Collapse>

          {/* Main Content */}
          <Box mt={0} p={0} ml={isOpen ? "200px" : "0"}>
            <Box
              style={headerStyle}
            >
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
                key={index}
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
/>
                  </VStack>

      <VStack spacing={2} id={`content-${blog.title}-overview`} style={contentSectionStyle}>
  {renderMediaContent(blog.overview, blog.title)}
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
<VStack spacing={2} id={`content-${blog.title}-issues`} style={contentSectionStyle}>
  {renderMediaContent(blog.issues, blog.title)}
</VStack>
              </motion.div>
            ))}

{/* Pagination */}
<Box mt={8} display="flex" justifyContent="center">
  {Array.from({ length: Math.ceil(filteredBlogs("tools").length / postsPerPage) }, (_, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        onClick={() => handlePageChange(index + 1)}
        mx={4} // Add some margin between the buttons
        borderRadius="full" // Make the buttons circular
        fontWeight="bold"
        fontSize="xl" // Increase the font size
        padding="1rem 2rem" // Increase padding for larger buttons
        _focus={{ outline: "none" }} // Remove the default focus outline
        colorScheme={currentPage === index + 1 ? "green" : "gray"} // Use Chakra UI color schemes
        variant="solid"
        size="lg" // Larger button size
        position="relative"
        overflow="hidden"
      >
        {index + 1}
        <Box
          position="absolute"
          top="-2px"
          left="-2px"
          right="-2px"
          bottom="-2px"
          borderWidth="2px"
          borderColor="white"
          opacity={0.5}
          borderRadius="full"
        />
        <Box
          position="absolute"
          top="-2px"
          left="-2px"
          right="-2px"
          bottom="-2px"
          borderWidth="2px"
          borderColor="white"
          opacity={0.5}
          borderRadius="full"
          transform="rotate(45deg)"
        />
      </Button>
    </motion.div>
  ))}
</Box>




          </Box>
        </Box>
      );
    };

    export default Blogs;
