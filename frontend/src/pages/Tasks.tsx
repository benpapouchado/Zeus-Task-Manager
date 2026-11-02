import { useEffect, useState } from 'react';
import { FetchTaskById } from '../components/RetrieveTask';
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
        newTask: "New Task",
        delete: "Delete Task"
    };

    const statuses = {
        all: "All",
        todo: "Todo",
        inProgress: "In Progress",
        done: "Done",
    }

    const [tasks, setTasks] = useState<Task[]>([]);

    const [selectedTaskButton, setSelectedTaskButton] = useState<string | null>(null);
    const [selectedFilterButton, setSelectedFilterButton] = useState<string | null>(statuses.all);

    const [searchId, setSearchId] = useState<number | null>(null);
    const [searchResult, setSearchResult] = useState<Task | null>(null);
    const [searchError, setSearchError] = useState<boolean>(false);

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
                <span className="icon mr-1">
                    <i className="far fa-plus-square"></i>
                </span>
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
                        <span className="icon mr-1">
                            <i className="fas fa-trash"></i>
                        </span>
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
                        <span className="icon mr-1">
                            <i className="fas fa-trash"></i>
                        </span>
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
            setTasks(data);

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, [searchResult]);

    const checkboxAddsToDeleteList = (id: number) => {
        setChecked(checked.includes(id) ? checked.filter(checkedId => checkedId !== id) : [...checked, id]);
    }

    const checkAllBoxes = (allBoxesChecked: boolean) => {
        setAllChecked(allBoxesChecked);
        setChecked(allBoxesChecked ? tasks.map((row) => row.id) : []);
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
        }).replace(",", "");
    };

    const filteredTasks = selectedFilterButton === statuses.all ? tasks :
        tasks.filter((t: Task) => t.status === selectedFilterButton);

    const filteredTasksWithSearch = searchResult ? [searchResult] : filteredTasks;

    useEffect(() => {
        if (!searchError) return;

        const timeout = setTimeout(() => {
            setSearchError(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [searchError]);

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
                        <strong>{filteredTasksWithSearch.length}</strong> tasks
                    </p>
                </div>

                <FetchTaskById
                    searchId={searchId?.toString() ?? null}
                    setSearchId={setSearchId}
                    setSelectedFilterButton={setSelectedFilterButton}
                    setSearchResult={setSearchResult}
                    setSearchError={setSearchError}
                />

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
            {searchError && (
                <div className="notification is-danger is-light ">
                    <p className="has-text-danger is-large">Task not found</p>
                </div>
            )}
            {/* {clearErrorMessage} */}
            <div className="rounded-table">
                <table className="table is-hoverable is-fullwidth rounded-table task-table">
                    <thead>
                        <tr>
                            <th><label className="checkbox">
                                <input type="checkbox"
                                    checked={allChecked}
                                    onChange={(e) => checkAllBoxes(e.target.checked)}
                                />
                            </label></th>
                            <th>ID</th>
                            <th>TITLE</th>
                            <th>STATUS</th>
                            <th>DESCRIPTION</th>
                            <th>DUE DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasksWithSearch.map((task: Task) => (
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
                                <td>
                                    <EditTaskDropdown
                                        id={task.id}
                                        isOpen={dropdownOpenOnRow === task.id}
                                        taskStatus={task.status}
                                        setDropdownOpenOnRow={setDropdownOpenOnRow}
                                        fetchAllTasks={fetchAllTasks}
                                    />
                                </td>
                                <td>{task.description}</td>

                                <td>{formatDate(task.dueDate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}   
