import { NavLink, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function TeacherDetailsPage() {
  const { teacherId } = useParams();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const dataLink = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app";

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    if (!teacherId) return;

    const teacherUrl = `${dataLink}/teachers/${teacherId}.json`;

    axios
      .get(teacherUrl)
      .then(response => {
        if (response.data) {
          setTeacher(response.data);
        } else {
          setError("Teacher not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching teacher details. Please try again.");
        setLoading(false);
      });
  }, [teacherId]);

  if (loading) return <h2 className="text-center text-gray-500 mt-10">Loading teacher details...</h2>;
  if (error) return <h2 className="text-red-500 text-center mt-10">{error}</h2>;
  if (!teacher) return <h2 className="text-center text-gray-500 mt-10">Teacher not found.</h2>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-5">
      <h2 className="text-3xl font-bold text-center uppercase mb-4">
        Teacher
        </h2>
      <div className="bg-gray-300 h-96 rounded-lg shadow-lg p-6 flex flex-row gap-20 justify-center items-center mb-10">
        <img
          src={teacher.photo}
          alt={teacher.name}
          className="w-auto h-48 object-contain rounded-lg shadow"
        />
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-center uppercase">{teacher.name}</h2>
          <p className="text-gray-700 mt-4 text-center"><strong>Birth Date:</strong> {teacher.birthDate}</p>
          <p className="text-gray-700 mt-4 text-center"><strong>Email:</strong> {teacher.email}</p>
          <p className="text-gray-700 mt-4 text-center"><strong>Salary:</strong> ${teacher.salary.toLocaleString()}</p>
        </div>
      </div>

       <div className="mt-20 text-center">
        
          <NavLink to={`/courses/${courseId}`}>
            <button className="border-cyan-900 border-2 text-cyan-900 px-4 py-2 rounded hover:bg-cyan-900 hover:text-white text-sm">
              Back
            </button>
          </NavLink>
      </div>
    </div>
  );
}

export default TeacherDetailsPage;
