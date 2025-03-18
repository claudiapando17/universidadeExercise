import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddCoursePage() {
  const navigate = useNavigate();
  const dataLink = "https://universidade-1cbf8-default-rtdb.europe-west1.firebasedatabase.app";

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [semester, setSemester] = useState("1");
  const [teacherName, setTeacherName] = useState("");

  const handleAddSubject = () => {
    if (newSubject.trim() && teacherName.trim() && !subjects.some(s => s.name === newSubject)) {
      setSubjects([...subjects, { name: newSubject, semester, teacherName }]);
      setNewSubject("");
      setSemester("1");
      setTeacherName("");
    }
  };

  const handleRemoveSubject = (subjectToRemove) => {
    setSubjects(subjects.filter(subject => subject.name !== subjectToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!courseName || !description || !image || subjects.length === 0) {
      alert("Please fill all fields and add at least one subject.");
      return;
    }

    try {
      // Criar cada teacher e subject na API
      const subjectIds = await Promise.all(
        subjects.map(async ({ name, semester, teacherName }) => {
          // Criar o professor
          const teacherResponse = await axios.post(`${dataLink}/teachers.json`, { name: teacherName });
          const teacherId = teacherResponse.data.name; // ID gerado pelo Firebase

          // Criar a disciplina associada ao professor
          const subjectResponse = await axios.post(`${dataLink}/subjects.json`, { 
            name, 
            semester, 
            teacherId 
          });

          return subjectResponse.data.name; // ID do subject gerado pelo Firebase
        })
      );

      // Criar o curso associando os IDs dos subjects
      await axios.post(`${dataLink}/courses.json`, {
        name: courseName,
        description,
        image,
        subjects: subjectIds, // Enviar os IDs ao invés dos nomes
      });

      navigate("/");
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center">Add New Course</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>

        <div>
          <h3 className="text-lg font-semibold">Subjects</h3>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="New Subject"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Teacher Name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
            />
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
            <button
              type="button"
              onClick={handleAddSubject}
              className="border-cyan-900 border-2 text-cyan-900 px-4 py-2 rounded hover:bg-cyan-900 hover:text-white text-sm"
            >
              Add
            </button>
          </div>

          {subjects.length > 0 && (
            <ul className="mt-3 space-y-1">
              {subjects.map((subject, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded">
                  {subject.name} - Semester {subject.semester} - {subject.teacherName}
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(subject.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="border-cyan-900 border-2 text-cyan-900 px-4 py-2 rounded hover:bg-cyan-900 hover:text-white text-sm">
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddCoursePage;
