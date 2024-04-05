import  { useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PeopleCard from './components/PeopleCard';

import UserProfile from './components/UserProfile';
import ModuleDetails from './components/ModuleDetails';
import SubModuleDetails from './components/SubModuleDetails';
import Blogs from './components/Blogs';
import Footer from './components/Footer';
import SignInSignUp from './components/SignInSignUp';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PageTransition from "./components/PageTransition"; 
import Course from './components/Course';
import CourseDetailed from './components/CourseDetailed';
import CourseDetailes from './components/CourseDetailes';
import CareerOption from './pages/CareerOption';
import CareerPage from './components/CareerPage';
import CareerBlog from './components/CareerBlog';
import About from './components/About';
import Faq from './components/Faq';
import CourseList from './components/CourseList';
import  Founder from './components/Founder';
import CollegePage from './components/CollegePage';
import CollegePost from './components/CollegePost';
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
          <ScrollToTop />

          <Routes>     
             <Route path="/" element={<HomeWithBlogSuggestion />} />

                        <Route path="/sanjay-patidar-founder-eduxcel" element={<Founder/>} />
                        <Route path="/lic-jitendra-patidar" element={<PeopleCard/>} />

            <Route path="/courses" element={<Course />} />
            <Route path="/course/:category" element={<Course />} />
            <Route path="/courses/category/${category}" element={<CourseList />} />
            <Route path="/api/courses/details/:id" element={<CourseDetailed />} />


            <Route path="/profile" element={<UserProfile />} />
            <Route path="/about-us" element={<About />} />

            <Route path="/courses/:title" element={<CourseDetailes />} />
            <Route path="/courses/:title/:module" element={<ModuleDetails />} />
            <Route
              path="/courses/:title/:module/submodules/:submodule"
              element={<SubModuleDetails />}
            />
            <Route path="/signup" element={<SignInSignUp />} />
        <Route path="/signin" element={<SignInSignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset" element={<ResetPassword />} />
<Route path="/institutes/*" element={<CollegePage />} />
      <Route path="/institute/:institute/*" element={<CollegePost/>} />

            <Route path="/blogs/*" element={<Blogs />} />
            <Route path="/careers/*" element={<CareerOption />} />
            <Route path="/:category/*" element={<CourseDetailes/>} />
            <Route path="/careers/:vision" element={<CareerPage />} />
            <Route path="/career/:vision/*" element={<CareerBlog/>} />

          </Routes>
        </div>
        <div className='relative z-0'>
       <Footer />
        </div>
      </div>
    </Router>

    
  );
}
const HomeWithBlogSuggestion = () => {
  return (
    <>
      <Home />
            <Faq/>

   
    </>
  );
};


export default App;
