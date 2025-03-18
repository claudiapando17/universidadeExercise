import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function HomePage() {
  const dataLink = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app/courses";
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${dataLink}.json`)
      .then(({ data }) => {
        if (data) {
          const coursesArray = Object.entries(data).map(([id, course]) => ({ id, ...course }));
        setCourses(coursesArray);
        } else {
          setCourses([]);
        }
      })
      .catch(() => setError("Error loading courses. Please try again later."));
  }, []); 

  if (error) return <h2 className="text-red-500 text-center mt-10">{error}</h2>;


  return (

    <div className="min-h-screen bg-gray-100 p-8 text-center mb-16">
      <h1 className="text-7xl font-bold uppercase">
        Global University
        </h1>
      <h2 className="text-2xl text-gray-700 mt-2">
        Explore our Courses
        </h2>

      {courses === null ? (
        <h2 className="text-gray-500 mt-6">
          Loading...
          </h2>
      ) : courses.length > 0 ? (

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
          {courses.toReversed().map(({ id, name, description, image }) => (
            <div key={id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              
              <NavLink to={`/courses/${id}`}>
                <img 
                src={image} 
                alt={name} 
                className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                  <p className="text-gray-600 text-sm mt-2">{description}</p>
                </div>
              </NavLink>
            
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">No courses available.</p>
      )}
    </div>
  );
}

export default HomePage;