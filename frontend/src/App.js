import logo from "./logo.svg";
import "./App.css";
import FocusedTest from './Components/FocusedTest'

import NavbarComp from "./Components/NavbarComp";
import Hero from "./Components/Hero";

import RegisterPage from "./Pages/RegisterPage";

import AuthContext, { AuthProvider } from "./Context/AuthContext";

import PrivateRoutes from "./Utils/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Categories from "./Components/Categories";
import ProfileCard from "./Pages/ProfilePage";
import CombinationQuestions from "./Components/CombinationQuestions";
import TestManagementPage from "./Pages/TestManagementDashboardPage";
import CreateCategoriesComp from "./Components/CreateCategoriesComp";
import CreateCombinedCategories from "./Components/CreateCombinedCategories";
import CreateGroupTestSessions from "./Components/CreateGroupTestSessions";
import GroupQuestionsCard from "./Components/GroupQuestionCard";
import GroupCombinationQuestions from "./Components/GroupCombinationQuestions";
import CreateGroupSubTest from "./Components/CreateGroupSubTest";
import Tests from "./Components/Tests";
import Footer from './Components/Footer'
import ForgotPassowordPage from "./Pages/ForgotPassowordPage";
import ChangePasswordPage from "./Pages/ChangePasswordPage";
import StudentInfoChange from "./Pages/StudentInfoChange";

function App() {
  console.log(process.env.REACT_APP_DEP_URL)
  return (
    <div className="min-h-screen min-w-screen">
      <Router>
        <AuthProvider>
          <NavbarComp />
          <Routes>
          <Route index element={<Hero />}  />
          <Route path="/test" element={<Tests />} />
          <Route path='/categories/:type/' element={<Categories />} />;
          <Route path='/forgot_password' element={<ForgotPassowordPage />} />;
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<ProfileCard/>} />
              <Route path='/change_password' element={<ChangePasswordPage />} />;
          <Route path='/edit_information' element={<StudentInfoChange />} />;
              <Route path='/dyn_test/:categoryId' element ={<FocusedTest />} />
              <Route path='/comb_dyn_test/:categoryId' element ={<CombinationQuestions />} />
              <Route path='/upload_questions' element ={<CreateGroupSubTest />} />
              <Route path='/create_categories' element ={<CreateCategoriesComp />} />
              <Route path='/create_combined_categories' element ={<CreateCombinedCategories />} />

              <Route path='/institution_dashboard' element ={<TestManagementPage />} />
              <Route path='/institution_dashboard/create_group_sub_test' element ={<CreateGroupSubTest />} />
              <Route path='/institution_dashboard/create_categories' element ={<CreateCategoriesComp />} />
              <Route path='/institution_dashboard/create_combined_categories' element ={<CreateCombinedCategories />} />
              <Route path='/institution_dashboard/create_test_sessions/:type' element ={<CreateGroupTestSessions />} />
              {/* <Route path='/institution_dashboard/sub_tests/' element ={<CreateCategoryTestSession />} /> */}

              <Route path='/sub_test/:instId/:sessionId/' element ={<GroupQuestionsCard />} />
              <Route path='/category_group_test/:instId/:sessionId/' element ={<GroupQuestionsCard />} />
              <Route path='/comb_category_group_test/:instId/:sessionId/' element ={<GroupCombinationQuestions />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

          </Routes>
        </AuthProvider>
      </Router>
      <Footer />
    </div>
  );
}

export default App;


