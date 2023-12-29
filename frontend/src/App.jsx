import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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

const ScrollToTop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unlisten = navigate(() => {
      window.scrollTo(0, 0);
    });

    return () => {}; // Use an empty function as the cleanup
  }, [navigate]);

  return null;
};

function App() {
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
  return (
    <Router>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Header />
    <SubHeader/>
          
       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/courses/:title" element={<CourseDetails />} />
            <Route path="/courses/:title/:module" element={<ModuleDetails />} />
            <Route
              path="/courses/:title/:module/submodules/:submodule"
              element={<SubModuleDetails />}
            />
            <Route path="/signup" element={<SignInSignUp />} /> {/* Use SignInSignUp component for sign-up */}
            <Route path="/signin" element={<SignInSignUp />} /> {/* Use SignInSignUp component for sign-in */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/blogs/*" element={<Blogs />} />
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
