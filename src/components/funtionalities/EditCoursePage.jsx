import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditCoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dataLink = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app";

  const [course, setCourse] = useState({
    name: "",
    description: "",
    image: "",
    subjects: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar as matérias e professores ao carregar o curso
  useEffect(() => {
    if (!courseId) return;

    const courseUrl = `${dataLink}/courses/${courseId}.json`;

    axios
      .get(courseUrl)
      .then(response => {
        if (response.data) {
          setCourse(response.data);
        } else {
          setError("Course not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching course details.");
        setLoading(false);
      });
  }, [courseId]);

  // Função para atualizar o estado de edição do curso
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value
    }));
  };

  // Função para atualizar o estado das matérias
  const handleSubjectChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubjects = [...course.subjects];
    updatedSubjects[index][name] = value;
    setCourse((prevCourse) => ({
      ...prevCourse,
      subjects: updatedSubjects
    }));
  };

  // Função para adicionar nova matéria
  const handleAddSubject = () => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      subjects: [...prevCourse.subjects, { name: "", semester: "1", teacherName: "" }]
    }));
  };

  // Função para remover matéria
  const handleRemoveSubject = (index) => {
    const updatedSubjects = [...course.subjects];
    updatedSubjects.splice(index, 1);
    setCourse((prevCourse) => ({
      ...prevCourse,
      subjects: updatedSubjects
    }));
  };

  // Enviar os dados do curso para atualização
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${dataLink}/courses/${courseId}.json`, {
        name: course.name,
        description: course.description,
        image: course.image,
        subjects: course.subjects.map(subject => subject.name)  // Aqui você pode salvar apenas os nomes das matérias ou o ID se necessário
      });
      navigate(`/courses/${courseId}`);
    } catch (error) {
      setError("Error updating course.");
    }
  };

  if (loading) return <h2 className="text-center text-gray-500 mt-10">Loading course details...</h2>;
  if (error) return <h2 className="text-red-500 text-center mt-10">{error}</h2>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-1">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-3xl font-bold text-center uppercase">Edit Course</h2>
        
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Course Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={course.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Course Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={course.image}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Matérias */}
          <div>
            <h3 className="text-lg font-semibold">Subjects</h3>
            {course.subjects.map((subject, index) => (
              <div key={index} className="flex flex-col space-y-3 mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Subject Name"
                    name="name"
                    value={subject.name}
                    onChange={(e) => handleSubjectChange(e, index)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Teacher Name"
                    name="teacherName"
                    value={subject.teacherName}
                    onChange={(e) => handleSubjectChange(e, index)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <select
                    name="semester"
                    value={subject.semester}
                    onChange={(e) => handleSubjectChange(e, index)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  >
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSubject}
              className="border-cyan-900 border-2 text-cyan-900 px-4 py-2 rounded hover:bg-cyan-900 hover:text-white text-sm"
            >
              Add Subject
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="border-cyan-900 border-2 text-cyan-900 px-4 py-2 rounded hover:bg-cyan-900 hover:text-white text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCoursePage;
