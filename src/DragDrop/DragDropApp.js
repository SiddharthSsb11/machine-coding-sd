import DragAndDrop from "./components/DragAndDrop";
import "./styles.css";
const initialData = {
  Todo: [
    "Design UI mockups",
    "Set up project repository",
    "Write unit test",
    "Integrate payment gateway",
  ],
  "In Progress": ["Develop authentication flow", "Implement responsive design"],
  Completed: [
    "Set up CI/CD pipeline",
    "Conduct code reviews",
    "Deploy initial version to staging",
  ],
};

export default function App() {
  return <DragAndDrop initialState={initialData} />;
}
