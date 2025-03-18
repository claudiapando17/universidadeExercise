import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function StudentsListPage() {
  const { courseId } = useParams();
  const dataLink = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    axios
      .get(`${dataLink}/students.json`)
      .then(response => {
        if (response.data) {
          const studentsArray = Object.values(response.data);
          const filteredStudents = studentsArray.filter(student => student.courseId === courseId);
          setStudents(filteredStudents);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching students.");
        setLoading(false);
      });
  }, [courseId]);

  if (loading) return <h2 className="text-center text-gray-500 mt-10">Loading students...</h2>;
  if (error) return <h2 className="text-red-500 text-center mt-10">{error}</h2>;
  if (students.length === 0) return <h2 className="text-center text-gray-500 mt-10">No students found.</h2>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-2">
      <h2 className="text-3xl font-bold text-center">Students in this Course</h2>

      <ul className="mt-4 flex flex-wrap justify-center gap-4">
        {students.map(student => (
          <li key={student.id} className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-64">
            <h4 className="text-lg font-bold">
              <NavLink to={`/students/${student.id}`} className="text-blue-600 font-semibold hover:underline">
                {student.name}
              </NavLink>
            </h4>
            <p className="text-gray-600">Enrollment: {student.enrollmentNumber}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <NavLink to={`/courses/${courseId}`}>
          <button className="border-cyan-900 border-2 text-cyan-900 px-4 py-2 rounded hover:bg-cyan-900 hover:text-white text-sm">
            Back to Course
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default StudentsListPage;
