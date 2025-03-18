import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function CourseDetailsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dataLink = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app";

  const [course, setCourse] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para verificar se o nome do professor contém a palavra "teacher"
  const isValidTeacher = (teacherName) => {
    return teacherName && teacherName.toLowerCase().includes("teacher");
  };

  useEffect(() => {
    if (!courseId) return;

    const courseUrl = `${dataLink}/courses/${courseId}.json`;

    axios
      .get(courseUrl)
      .then(response => {
        console.log("Fetched course data:", response.data);
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
      console.log("Fetching subjects with IDs:", subjectIds); 

      const subjectRequests = subjectIds.map(subjectId =>
        axios.get(`${dataLink}/subjects/${subjectId}.json`).catch(() => null)
      );

      const subjectResponses = await Promise.all(subjectRequests);
      const subjectsData = subjectResponses.map(res => res?.data ? { id: res.data.id, ...res.data } : null).filter(Boolean);

      console.log("Fetched subjects data:", subjectsData);

      const teacherRequests = subjectsData.map(subject =>
        subject.teacherId
          ? axios.get(`${dataLink}/teachers/${subject.teacherId}.json`).catch(() => null)
          : null
      );

      const teacherResponses = await Promise.all(teacherRequests);
      const teachersData = teacherResponses.map(res => res?.data?.name || "Unknown Teacher");

      const subjectsWithTeachers = subjectsData.map((subject, index) => ({
        ...subject,
        teacherName: teachersData[index]
      }));

      setSubjects(subjectsWithTeachers);
    } catch (error) {
      console.error("Error fetching subjects and teachers:", error);
      setError("Error fetching subjects and teachers.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${dataLink}/courses/${courseId}.json`);
      navigate("/"); // Redireciona para a home
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  if (loading) return <h2 className="text-center text-gray-500 mt-10">Loading course details...</h2>;
  if (error) return <h2 className="text-red-500 text-center mt-10">{error}</h2>;
  if (!course) return <h2 className="text-center text-gray-500 mt-10">Course not found.</h2>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-1">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-3xl font-bold text-center uppercase">{course.name}</h2>

        <img
          src={course.image}
          alt={course.name}
          className="w-full h-64 object-cover mt-4 rounded-lg shadow"
        />
        <p className="text-gray-700 mt-2 text-center">{course.description}</p>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center w-full">
        <h2 className="text-3xl font-semibold">Subjects</h2>

        {subjects.length > 0 ? (
          <ul className="m-5 flex flex-row gap-5 w-full items-center justify-center">
            {subjects.map((subject) => (
              <li key={subject.id} className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-l font-bold text-center mb-3">
                  {subject.name}
                </h4>
                <p className="text-gray-500 text-sm">
                  Semester: {subject.semester || "N/A"}
                </p>
                <p className="text-gray-600 inline-block">Taught by:</p>

                {/* Exibe o NavLink somente se o nome do professor contém "teacher" */}
                {isValidTeacher(subject.teacherName) ? (
                  <NavLink
                    to={`/teachers/${subject.teacherId}?courseId=${courseId}`}
                    className="text-black font-semibold inline-block ml-2 hover:underline"
                  >
                    {subject.teacherName}
                  </NavLink>
                ) : (
                  <span className="text-gray-500 ml-2">{subject.teacherName}</span>
                )}

                {/* Agora, o NavLink para os alunos também está dentro do map */}
                {isValidTeacher(subject.teacherName) ? (
                  <NavLink to={`/students/${courseId}`} className="text-xl font-semibold hover:underline mt-3">
                    Check our Students
                  </NavLink>
                ) : (
                  <span className="text-gray-500 ml-2">No Students</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No subjects available for this course.</p>
        )}
      </div>

      {/* Botão de deletar curso */}
      {!courseId.startsWith("course") && (
        <div className="mt-5 flex justify-center">
          <button
            onClick={handleDelete}
            className="border-red-600 border-2 text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white text-md"
          >
            Delete Course
          </button>
        </div>
      )}

      <div className="mt-20 text-center">
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
