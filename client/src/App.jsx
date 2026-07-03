// The starting point for your actual user interface and layout.
// Executes second (imported and rendered inside main.jsx).
import axios from "axios";
import DashboardLayout from "./layouts/DashboardLayout";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return <DashboardLayout />;
}

export default App;
