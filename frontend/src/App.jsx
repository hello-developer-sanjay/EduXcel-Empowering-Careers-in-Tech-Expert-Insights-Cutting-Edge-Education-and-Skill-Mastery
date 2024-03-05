import  { useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import CourseDetailes from './components/CourseDetailes';

import CourseList from './components/CourseList';
import  Founder from './components/Founder';

import { useLocation } from 'react-router-dom';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  



 
  return (
    <Router>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Header />
          <SubHeader />
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Home />} />
                        <Route path="/sanjay-patidar-founder-eduxcel" element={<Founder/>} />

            <Route path="/courses" element={<Course />} />
            <Route path="/course/:category" element={<Course />} />
            <Route path="/courses/category/${category}" element={<CourseList />} />
            <Route path="/api/courses/details/:id" element={<CourseDetailed />} />


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
            <Route path="/:category/*" element={<CourseDetailes/>} />

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
