import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

import Header from './components/bars/Header';
import Footer from './components/bars/Footer';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

import { Routes, Route } from'react-router-dom';


function App() {
  const dataLinkCourses = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app/courses";
  const dataLinkStudents = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app/students";
  const dataLinkSubjects = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app/subjects";
  const dataLinkTeachers = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app/teachers";

  return (
    <>
      <div>
      <Header id= "header"/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer id="footer"/>
    </div >
    </>
  )
}

export default App
