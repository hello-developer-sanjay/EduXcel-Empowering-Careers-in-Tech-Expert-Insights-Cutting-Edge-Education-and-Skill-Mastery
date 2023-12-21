/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  VStack,
  Text,
  Image,
  IconButton,
 
  useDisclosure,
  Collapse,
  Button,
} from "@chakra-ui/react";
import { FaArrowCircleUp, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import "../styles/Blogs.css";

const BlogTitle = React.forwardRef(({ title, onClick }, ref) => (
  <Text
    fontSize="lg"
    fontWeight="semibold"
    cursor="pointer"
    onClick={() => onClick(title)}
    ref={ref}
  >
    {title}
  </Text>
));

const Blogs = () => {
  const [blogsData, setBlogsData] = useState({
    tools: [],
    working: [],
  });
  const navigate = useNavigate();
  const titleRefs = useRef({});
  const { isOpen, onToggle } = useDisclosure();

  const scrollToTitle = (title) => {
    const titleRef = titleRefs.current[title];
    if (titleRef) {
      titleRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };



  const observer = useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [remainingProgress, setRemainingProgress] = useState(100);

  const location = useLocation();
  const [clickedTitle, setClickedTitle] = useState(null);

  const handleTitleClick = (title) => {
    setClickedTitle(title);
    const encodedTitle = encodeURIComponent(title);
    navigate(`/blogs/${encodedTitle}`);
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

  useEffect(() => {
    const query = location.pathname.split("/blogs/search/")[1] || "";
    setSearchQuery(decodeURIComponent(query));
    fetchData("tools");
    fetchData("working");
  
    if (clickedTitle) {
      // Scroll to the clicked title
      const titleRef = titleRefs.current[clickedTitle];
      if (titleRef) {
        titleRef.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      setClickedTitle(null); // Reset the clicked title state
    }
  
    // Check for title in URL and scroll to it
    const urlTitleMatch = location.pathname.match(/\/blogs\/(.*)/);
    if (urlTitleMatch) {
      const urlTitle = decodeURIComponent(urlTitleMatch[1]);
      const matchingTitle = Object.keys(blogsData)
        .flatMap((collection) => blogsData[collection])
        .find((blog) => blog.title === urlTitle);
  
      if (matchingTitle) {
        const titleRef = titleRefs.current[matchingTitle.title];
        if (titleRef) {
          // Scroll to the matched title almost instantly
          setTimeout(() => {
            titleRef.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
        }
      }
    }
  }, [location.pathname, clickedTitle, blogsData]);
  const filteredBlogs = (collection) => {
    const blogsCollection = blogsData[collection] || [];
    return blogsCollection.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const headerStyle = {
    position: "sticky",
    top: -20,
    zIndex: 1,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
    backdropFilter: "blur(10px)",
    background: "white",
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
    bottom: "20px",
    right: "20px",
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

  const sidebarStyle = {
    position: "fixed",
    top: "165px",
    left: 0,
    height: "100%",
    width: "220px",
    backgroundColor: "yellow",
    borderRight: "1px solid lightgray",
    padding: "20px",
    zIndex: 2,
    transition: "left 0.3s",
    overflowX: "hidden",
  };
   const toggleButtonStyle = {
      position: "fixed",
      top: "25%",
      transform: "translateY(-50%)",
      left: isOpen ? "240px" : "20px",
      zIndex: 2,
      background: isOpen ? "#e74c3c" : "#2ecc71", // Red when open, green when closed
      color: "white",
      borderRadius: "50%",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
      padding: "12px",
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
              <Image
                key={index}
                src={item}
                alt={`Image ${index}`}
                maxW="100%"
                h="auto"
              />
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
      alignItems="center"
      justifyContent="flex-start"
      id="blogs-section"
      overflowY="scroll"
      maxHeight="calc(100vh - 100px)"
      height="auto"
      overflowX="hidden"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      onScroll={handleScroll}
      mt="0px"
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
                    onClick={() => handleTitleClick(blog.title)}
                    ref={(el) => (titleRefs.current[blog.title] = el)}
                  />
                ))}
              </VStack>
            ))}
          </VStack>
        </Box>
      </Collapse>

      {/* Main Content */}
      <Box mt={8} p={4} ml={isOpen ? "250px" : "0"}>
        <Box style={headerStyle}>
          <VStack spacing={0} align="start" w="100%" marginTop="0">
            <Input
              type="text"
              placeholder="Search for blogs"
              value={searchQuery}
              onChange={handleSearchChange}
              p={2}
              borderWidth="1px"
              rounded="md"
              bg="white"
              color="black"
              mb={2}
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

        {Object.keys(blogsData).map((collection) => (
          <Box key={collection} w="full" mt={8}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              {`${collection.charAt(0).toUpperCase()}${collection.slice(1)} Blog`}
            </Text>

            {filteredBlogs(collection).map((blog, index) => (
              <motion.div
                key={index}
                ref={
                  index === filteredBlogs(collection).length - 1
                    ? (node) => observeLastBlog(collection, node)
                    : null
                }
              >
                {/* Add 'id' attribute to the title section */}
                <VStack align="start" spacing={2} id={`title-${blog.title}`} ref={(el) => (titleRefs.current[blog.title] = el)}>
                  <BlogTitle
                    key={blog.title}
                    title={blog.title}
                    onClick={() => handleTitleClick(blog.title)}
                  />
                </VStack>
                {/* Add 'id' attribute to the content section */}
                <VStack spacing={2} id={`content-${blog.title}`}>
                  {renderMediaContent(blog.overview)}
                </VStack>
                <VStack spacing={2} id={`content-${blog.title}`}>
                  {renderMediaContent(blog.what)}
                </VStack>
                <VStack spacing={2} id={`content-${blog.title}`}>
                  {renderMediaContent(blog.feature)}
                </VStack>
                <VStack spacing={2} id={`content-${blog.title}`}>
                  {renderMediaContent(blog.setting)}
                </VStack>
              </motion.div>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Blogs;
