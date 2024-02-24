import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route ,useNavigate } from 'react-router-dom';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Home from './pages/Home';
import UserProfile from './components/UserProfile';
import ModuleDetails from './components/ModuleDetails';
import CourseDetails from './components/CourseDetails';
import SubModuleDetails from './components/SubModuleDetails';
import Blogs from './components/Blogs';
import Footer from './components/Footer';
import SignInSignUp from './components/SignInSignUp';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Career from './components/Career';
import PageTransition from "./components/PageTransition"; 
import Course from './components/Course';
import CourseDetailed from './components/CourseDetailed';
import CourseList from './components/CourseList';
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};
// Custom hook to manage the current route state
const useCurrentRoute = () => {
  const [isBlogsRoute, setIsBlogsRoute] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsBlogsRoute(window.location.pathname.startsWith('/blogs'));
    };

    // Attach the event listener
    window.addEventListener('popstate', handleRouteChange);

    // Call it once to set the initial state
    handleRouteChange();

    // Detach the event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    // Additional check to handle initial rendering
    setIsBlogsRoute(window.location.pathname.startsWith('/blogs'));
  }, []);

  return isBlogsRoute;
};

function App() {
  const isBlogsRoute = useCurrentRoute();



 
  return (
    <Router>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Header />
          <SubHeader />
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/courses/:category" element={<PageTransition><Course /></PageTransition>} />
            <Route path="/courses/category/${category}" element={<PageTransition><CourseList /></PageTransition>} />
            <Route path="/api/courses/details/:id" element={<PageTransition><CourseDetailed /></PageTransition>} />


            <Route path="/profile" element={<PageTransition><UserProfile /></PageTransition>} />
            <Route path="/courses/:title" element={<CourseDetails />} />
            <Route path="/courses/:title/:module" element={<ModuleDetails />} />
            <Route
              path="/courses/:title/:module/submodules/:submodule"
              element={<SubModuleDetails />}
            />
            <Route path="/signup" element={<PageTransition><SignInSignUp /></PageTransition>} />
        <Route path="/signin" element={<PageTransition><SignInSignUp /></PageTransition>} />
            <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
            <Route path="/reset" element={<PageTransition><ResetPassword /></PageTransition>} />

            <Route path="/blogs/*" element={<Blogs />} />
            <Route path="/careers/*" element={<Career />} />

          </Routes>
        </div>
        <div className='relative z-0'>
        {!isBlogsRoute && <Footer />}
        </div>
      </div>
    </Router>
  );
}

export default App;
