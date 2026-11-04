import { useEffect, useState, useContext, createContext } from 'react';

type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: string;
};

const TaskContext = createContext<Task[]>([]);
const API_URL = import.meta.env.VITE_API_URL;

export default function FetchTaskData() {

    const contextData = useContext(TaskContext);

    const [tasks, setTasks] = useState<Task[]>(contextData);

    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                const response = await fetch(`${API_URL}/api/tasks/retrieve`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data: Task[] = await response.json();
                setTasks(data);

            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchAllTasks();
    }, []);

    return tasks;
}