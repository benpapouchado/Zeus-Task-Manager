import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import type { Task } from "./type/Type";
import { useEffect, useState } from 'react';
import "./App.css";
import "bulma/css/bulma.min.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>(null);

  const fetchAllTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/retrieve`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      data.sort((a: Task, b: Task) => a.id - b.id);
      setError(null);
      setTasks(data);

    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError("3");
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/tasks" element={<Tasks
            tasks={tasks}
            setTasks={setTasks}
            success={success}
            setSuccess={setSuccess}
            error={error}
            setError={setError}
          />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
