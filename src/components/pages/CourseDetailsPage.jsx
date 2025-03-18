import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function CourseDetailsPage() {
  const { courseId } = useParams();
  const dataLink = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app";

  const [course, setCourse] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const courseUrl = `${dataLink}/courses/${courseId}.json`;

    axios
      .get(courseUrl)
      .then(response => {
        if (response.data) {
          setCourse(response.data);

          const subjectIds = response.data.subjects || [];
          if (Array.isArray(subjectIds) && subjectIds.length > 0) {
            fetchSubjects(subjectIds);
          } else {
            setSubjects([]);
          }
        } else {
          setError("Course not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching course details. Please try again.");
        setLoading(false);
      });
  }, [courseId]);

  const fetchSubjects = async (subjectIds) => {
    try {
      const subjectRequests = subjectIds.map(subjectId =>
        axios.get(`${dataLink}/subjects/${subjectId}.json`).catch(() => null)
      );

      const subjectResponses = await Promise.all(subjectRequests);
      const subjectsData = subjectResponses.map(res => res?.data).filter(Boolean);

      // Buscar professores para cada subject
      const teacherRequests = subjectsData.map(subject =>
        subject.teacherId
          ? axios.get(`${dataLink}/teachers/${subject.teacherId}.json`).catch(() => null)
          : null
      );

      const teacherResponses = await Promise.all(teacherRequests);
      const teachersData = teacherResponses.map(res => res?.data?.name || "Unknown Teacher");

      // Atualizar subjects com os nomes dos professores
      const subjectsWithTeachers = subjectsData.map((subject, index) => ({
        ...subject,
        teacherName: teachersData[index]
      }));

      setSubjects(subjectsWithTeachers);
    } catch {
      setError("Error fetching subjects and teachers.");
    }
  };

  if (loading) return <h2 className="text-center text-gray-500 mt-10">Loading course details...</h2>;
  if (error) return <h2 className="text-red-500 text-center mt-10">{error}</h2>;
  if (!course) return <h2 className="text-center text-gray-500 mt-10">Course not found.</h2>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-2">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center uppercase">
          {course.name}
        </h2>

        <img
          src={course.image}
          alt={course.name}
          className="w-full h-64 object-cover mt-4 rounded-lg shadow"
        />
        <p className="text-gray-700 mt-4 text-center">{course.description}</p>
      </div>


      <div className="mt-6 flex flex-col items-center justify-center w-full">
        <h3 className="text-2xl font-semibold">
          Subjects
        </h3>

        {subjects.length > 0 ? (

          <ul className="m-5 flex flex-row gap-5 w-full items-center justify-center">
            {subjects.map((subject, index) => (
              <li key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-center mb-3">{
                  subject.name || "Unknown Subject"}
                </h4>
                <p className="text-gray-500 text-sm">
                  Semester: {subject.semester}
                </p>
                <p className="text-gray-600 inline-block">
                  Taught by:
                </p>
                <NavLink to={`/teachers/${subject.teacherId}`}
                  className="text-black font-semibold inline-block ml-2 hover:underline">
                  {subject.teacherName || "Unknown Teacher"}
                </NavLink>
                <NavLink to={`/students/${subject.studentId}`}
                  className="text-black font-semibold inline-block ml-2 hover:underline">
                  {subject.studentName || "Unknown Students"}
                </NavLink>
              </li>
            ))}
          </ul>

        ) : (
          <p className="text-gray-500 mt-2">No subjects available for this course.</p>
        )}
      </div>

      <div className="mt-6 text-center">
        <NavLink to="/">
          <button className="border-cyan-900 border-2 text-cyan-900 px-4 py-2 rounded hover:bg-cyan-900 hover:text-white text-sm">
            Back
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default CourseDetailsPage;
