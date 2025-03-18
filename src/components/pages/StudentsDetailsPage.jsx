import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function StudentsDetailsPage() {
  const { courseId } = useParams();
  const dataLink = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app";

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    axios
      .get(`${dataLink}/students.json`)
      .then(response => {
        if (response.data) {
          const filteredStudents = Object.values(response.data).filter(student => student.courseId === courseId);
          setStudents(filteredStudents);


          const allSubjectIds = [...new Set(filteredStudents.flatMap(student => Object.keys(student.grades || {})))];
          fetchSubjects(allSubjectIds);
        } else {
          setError("No students found for this course.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching students.");
        setLoading(false);
      });
  }, [courseId]);

  const fetchSubjects = async (subjectIds) => {
    try {
      const subjectRequests = subjectIds.map(subjectId =>
        axios.get(`${dataLink}/subjects/${subjectId}.json`).catch(() => null)
      );

      const subjectResponses = await Promise.all(subjectRequests);
      const subjectsData = subjectResponses.reduce((acc, res, index) => {
        if (res?.data) {
          acc[subjectIds[index]] = res.data.name;
        }
        return acc;
      }, {});

      setSubjects(subjectsData);
    } catch {
      setError("Error fetching subjects.");
    }
  };

  if (loading) return <h2 className="text-center text-gray-500 mt-10">Loading students...</h2>;
  if (error) return <h2 className="text-red-500 text-center mt-10">{error}</h2>;
  if (students.length === 0) return <h2 className="text-center text-gray-500 mt-10">No students found for this course.</h2>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-1">
      <h2 className="text-3xl font-bold text-center uppercase">
        Students
        </h2>

      <div className="mt-10 flex justify-center">
        
      <table className="w-full border-collapse border border-gray-300 text-center table-auto shadow-lg">
  <thead>
    <tr className="bg-gray-200">
      <th className="border border-gray-300 p-2">Photo</th>
      <th className="border border-gray-300 p-2">Name</th>
      <th className="border border-gray-300 p-2 whitespace-nowrap">Enrollment Number</th>
      <th className="border border-gray-300 p-2">Birthdate</th>
      {Object.values(subjects).map((subjectName, index) => (
        <th key={index} className="border border-gray-300 p-2">Grades: {subjectName}</th>
      ))}
    </tr>
  </thead>
  <tbody className="bg-white">
    {students.map(student => (
      <tr key={student.id}>
        <td className="border border-gray-300 p-2">
          <div className="flex justify-center">
            <img
              src={student.photo}
              alt={student.name}
              className="w-auto h-20 object-contain rounded-lg"
            />
          </div>
        </td>
        <td className="border border-gray-300 p-2 whitespace-nowrap">{student.name}</td>
        <td className="border border-gray-300 p-2 whitespace-nowrap">{student.enrollmentNumber}</td>
        <td className="border border-gray-300 p-2 whitespace-nowrap">{student.birthdate}</td>
        {Object.keys(subjects).map((subjectId, index) => (
          <td key={index} className="border border-gray-300 p-2">
            {student.grades?.[subjectId] ?? "-"}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>


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

export default StudentsDetailsPage;
