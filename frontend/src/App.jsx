import  { useEffect } from "react";
import React from 'react';
import { BrowserRouter as Router, Routes, Route  , useLocation} from 'react-router-dom';
import Header from './components/Header';
 import SubHeader from './components/SubHeader';
import Home from './pages/Home';
import UserProfile from './components/UserProfile';
import ModuleDetails from './components/ModuleDetails';
import CourseDetails from './components/CourseDetails';
import SubModuleDetails from './components/SubModuleDetails';
import Blogs from './components/Blogs';
import { Analytics } from '@vercel/analytics/react';

import Footer from './components/Footer';
import SignInSignUp from './components/SignInSignUp'; // Import the SignInSignUp component
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the route changes.
  }, [pathname]);

  return null; // This component doesn't render anything.
};

function App() {
  return (
    <Router>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Header />
    <SubHeader/>
          <ScrollToTop />
        <Analytics />

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
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
