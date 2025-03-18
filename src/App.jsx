import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

import Header from './components/bars/Header';
import Footer from './components/bars/Footer';

import HomePage from './components/pages/HomePage';
import NotFoundPage from './components/pages/NotFoundPage';
import CourseDetailsPage from './components/pages/CourseDetailsPage';
import TeacherDetailsPage from './components/pages/TeacherDetailsPage';
import StudentsDetailsPage from './components/pages/StudentsDetailsPage';
import AddCoursePage from './components/funtionalities/AddCoursePage';
import EditCoursePage from './components/funtionalities/EditCoursePage';
import { Routes, Route } from 'react-router-dom';


function App() {
  const dataLinkCourses = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app/courses";
  const dataLinkStudents = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app/students";
  const dataLinkSubjects = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app/subjects";
  const dataLinkTeachers = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app/teachers";

  return (
    <>
      <div className='flex flex-col min-h-screen bg-gray-100'>
        <Header id="header" />

        <div className='flex-grow'>
          <Routes>

            <Route path="/" element={<HomePage />} />

            <Route path="/homepage/add" element={<AddCoursePage dataLink={dataLinkCourses} />} />

            <Route path="/homepage/:courseId/edit" element={<EditCoursePage dataLink={dataLinkCourses} />} />

            <Route path="*" element={<NotFoundPage />} />

            <Route path="/courses/:courseId" element={<CourseDetailsPage dataLink={dataLinkSubjects} />} />

            <Route path="/teachers/:teacherId" element={<TeacherDetailsPage dataLink={dataLinkTeachers} />} />

            <Route path="/students/:courseId" element={<StudentsDetailsPage dataLink={dataLinkStudents} />} />

            <Route path="/courses/addCourse" element={<AddCoursePage dataLink={dataLinkCourses} />} />

            <Route path="/courses/editCourse/:courseId" element={<EditCoursePage dataLink={dataLinkCourses} />} />

          </Routes>
        </div>

        <Footer id="footer" />
      </div >
    </>
  )
}

export default App;
