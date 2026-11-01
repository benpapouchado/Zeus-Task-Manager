import { useEffect, useState, useContext, createContext } from 'react';
import { CreateTaskModal } from '../components/CreateTaskModal';
import { DeleteTaskModal } from '../components/DeleteTaskModal';
import { EditTaskDropdown } from '../components/EditTaskDropdown';

import "bulma/css/bulma.min.css";
import "../App.css";

type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export default function Tasks() {

    const taskActions = {
        newTask: "+ New Task",
        delete: "\u2716 Delete Task"
    };

    const statuses = {
        all: "All",
        todo: "Todo",
        inProgress: "In Progress",
        done: "Done",
    }

    const [tasks, setTasks] = useState<Task[]>([]);
    const [count, setCount] = useState(0);
    const [selectedTaskButton, setSelectedTaskButton] = useState<string | null>(null);
    const [selectedFilterButton, setSelectedFilterButton] = useState<string | null>(statuses.all);
    const [searchID, setSearchID] = useState('');
    const [allChecked, setAllChecked] = useState(false);
    const [checked, setChecked] = useState<number[]>([]);
    const [dropdownOpenOnRow, setDropdownOpenOnRow] = useState<number | null>(null);

    const taskButton = (label: string) =>
        <div className="level-item">
            <button className="button is-fullwidth is-responsive is-rounded"
                style={{
                    color: "white",
                    backgroundColor: "#7e1212",
                }}
                onClick={() => setSelectedTaskButton(label)}>
                {label}
            </button>
        </div>

    const deleteTaskButton = (label: string, rows?: string) => {
        if (checked.length === 0) {
            return (
                <div className="level-item">
                    <button className="button is-fullwidth is-disabled is-rounded"
                        style={{
                            color: "white",
                            backgroundColor: "#bb5e5e",
                        }}>
                        {label + rows}
                    </button>
                </div>
            );
        } else {
            return (
                <div className="level-item">
                    <button className="button is-fullwidth is-responsive is-rounded"
                        style={{
                            color: "white",
                            backgroundColor: "#7e1212",
                        }}
                        onClick={() => setSelectedTaskButton(label)}>
                        {label + rows}
                    </button>
                </div>
            );
        }
    }

    const filterButton = (label: string) =>
        <button
            key={label}
            className={"button is-fullwidth is-responsive is-rounded "}
            style={{
                color: label === selectedFilterButton ? "white" : "black",
                backgroundColor: label === selectedFilterButton ? "#7e1212" : "white",
            }}
            onClick={() => setSelectedFilterButton(label)}>
            {label}
        </button>

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
            setCount(data.length);
            setTasks(data);

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const checkboxAddsToDeleteList = (id: number) => {
        setChecked(checked.includes(id) ? checked.filter(checkedId => checkedId !== id) : [...checked, id]);
    }

    const checkAllBoxes = (allBoxesChecked: boolean) => {
        setAllChecked(allBoxesChecked);
        setChecked(allBoxesChecked ? tasks.map((row) => row.id) : []);
    }

    return (
        <main >
            <section>
                {selectedTaskButton === taskActions.newTask && <CreateTaskModal
                    setSelectedTaskButton={setSelectedTaskButton}
                    fetchAllTasks={fetchAllTasks} />}
            </section>

            <section>
                {selectedTaskButton === taskActions.delete && DeleteTaskModal(checked, {
                    setSelectedTaskButton,
                    fetchAllTasks,
                })}
            </section>

            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <h1 className="title">TASKS</h1>
                    </div>
                </div>

                <div className="level-right">
                    {taskButton(taskActions.newTask)}
                    {deleteTaskButton(taskActions.delete, " (" + checked.length + ")")}
                </div>
            </div>


            <div className="columns is-vcentered">
                <div className="column is-narrow">
                    <p className="subtitle is-5">
                        <strong>{count}</strong> tasks
                    </p>
                </div>

                <div className="column is-narrow">
                    <div className="field has-addons">
                        <p className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Find a task"
                            />
                        </p>
                        <p className="control">
                            <button className="button">Search</button>
                        </p>
                    </div>
                </div>

                <div className="column">
                    <div className="columns is-variable is-2">
                        <div className="column">
                            {filterButton(statuses.all)}
                        </div>
                        <div className="column">
                            {filterButton(statuses.todo)}
                        </div>
                        <div className="column">
                            {filterButton(statuses.inProgress)}
                        </div>
                        <div className="column">
                            {filterButton(statuses.done)}
                        </div>
                    </div>
                </div>
            </div>


            <table className="table is-hoverable is-fullwidth is-rounded">
                <thead>
                    <tr>
                        <th><label className="checkbox">
                            <input type="checkbox"
                                checked={allChecked}
                                onChange={(e) => checkAllBoxes(e.target.checked)}
                            />
                        </label></th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task: Task) => (
                        <tr key={task.id}>
                            <td><label className="checkbox">
                                <input type="checkbox"
                                    value={task.id}
                                    checked={checked.includes(task.id)}
                                    onChange={(e) => checkboxAddsToDeleteList(Number(e.target.value))}
                                />
                            </label></td>
                            <td>#{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>
                                <EditTaskDropdown
                                    id={task.id}
                                    isOpen={dropdownOpenOnRow === task.id}
                                    taskStatus={task.status}
                                    setDropdownOpenOnRow={setDropdownOpenOnRow}
                                    fetchAllTasks={fetchAllTasks}
                                />
                            </td>
                            <td>{task.dueDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}   
