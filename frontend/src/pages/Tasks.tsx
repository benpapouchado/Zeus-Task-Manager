import { useEffect, useState } from 'react';
import { FetchTaskById } from '../components/RetrieveTask';
import { CreateTaskModal } from '../components/CreateTaskModal';
import { DeleteTaskModal } from '../components/DeleteTaskModal';
import { EditTaskDropdown } from '../components/EditTaskDropdown';
import { ViewTask } from '../components/ViewTaskModal';
import type { Task } from "../type/Type";
import { statuses, overdue, overdueTag, formatDate, dueSoon, dueSoonTag } from '../shared/Shared';

import "bulma/css/bulma.min.css";
import "../App.css";

type TaskProps = {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    success: string | null,
    setSuccess: React.Dispatch<React.SetStateAction<string | null>>,
    error: string | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
}

export default function Tasks({ tasks, setTasks, success, setSuccess, error, setError }
    : TaskProps) {

    const taskActions = {
        newTask: "New Task",
        delete: "Delete Task"
    };

    const [selectedTaskButton, setSelectedTaskButton] = useState<string | null>(null);
    const [selectedFilterButton, setSelectedFilterButton] = useState<string | null>(statuses.all);

    const [viewIsOpen, setViewIsOpen] = useState<Task | null>(null);

    const [searchId, setSearchId] = useState<number | null>(null);
    const [searchResult, setSearchResult] = useState<Task | null>(null);

    const [checked, setChecked] = useState<number[]>([]);

    const [dropdownOpenOnRow, setDropdownOpenOnRow] = useState<number | null>(null);

    const successText = [
        "Task created successfully",
        "Task(s) deleted successfully",
        "Task updated successfully"];

    const successMessage = (index: number) => {
        return (
            <div className="notification is-success is-light ">
                <p className="has-text-success is-large">{successText[index]}</p>
            </div>
        )
    }

    const errorText = [
        "Error creating task",
        "Error deleting task(s)",
        "Error updating task",
        "Error fetching tasks",
        "Error retrieving task"];

    const errorMessage = (index: number) => (
        <div className="notification is-danger is-light ">
            <p className="has-text-danger is-large">{errorText[index]}</p>
        </div>
    )

    useEffect(() => {
        if (!success) return;

        const timeout = setTimeout(() => {
            setSuccess(null);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [success]);

    useEffect(() => {
        if (!error) return;

        const timeout = setTimeout(() => {
            setError(null);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [error]);

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

        return (
            <div className="level-item">
                <button className="button is-fullwidth is-responsive is-rounded"
                    style={{
                        color: "white",
                        backgroundColor: "#7e1212",
                    }}
                    disabled={checked.length === 0}
                    onClick={() => setSelectedTaskButton(label)}>
                    <span className="icon mr-1">
                        <i className="fas fa-trash"></i>
                    </span>
                    {label + rows}
                </button>
            </div>
        );
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

    const checkboxAddsToDeleteList = (id: number) => {
        setChecked(prev => prev.includes(id) ? prev.filter(checkedId => checkedId !== id) : [...prev, id]);
    };

    const checkAllBoxes = (allBoxesChecked: boolean) => {
        setChecked(allBoxesChecked ? tasks.map(row => row.id) : []);
    };

    const allChecked = tasks.length > 0 &&
        tasks.every(task => checked.includes(task.id));

    const filteredTasks = selectedFilterButton === statuses.all ? tasks :
        tasks.filter((t: Task) => t.status === selectedFilterButton);

    const filteredTasksWithSearch = searchResult ? [searchResult] : filteredTasks;

    const expandRow = (description: string) => (
        description.length > 20 ? "Click to expand" : null
    );

    const rowWidth = 35;

    return (
        <main >

            <section>
                {selectedTaskButton === taskActions.newTask && <CreateTaskModal
                    setSelectedTaskButton={setSelectedTaskButton}
                    setError={setError}
                    setSuccess={setSuccess}
                    setTasks={setTasks} />}
            </section>

            <section>
                {selectedTaskButton === taskActions.delete && DeleteTaskModal({
                    ids: checked,
                    setIds: setChecked,
                    setSelectedTaskButton,
                    setError: setError,
                    setSuccess: setSuccess,
                    setTasks
                })}
            </section>

            <section>
                {viewIsOpen !== null && ViewTask({
                    viewIsOpen,
                    setViewIsOpen,
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
                    setError={setError}
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

            {success !== null && (successMessage(parseInt(success)))}
            {error !== null && (errorMessage(parseInt(error)))}

            <div className="rounded-table">
                <table className="table is-fullwidth rounded-table task-table is-vcentered">
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
                                <td className="is-vcentered"><label className="checkbox">
                                    <input type="checkbox"
                                        value={task.id}
                                        checked={checked.includes(task.id)}
                                        onChange={(e) => checkboxAddsToDeleteList(Number(e.target.value))}
                                    />
                                </label></td>
                                <td className="is-vcentered">#{task.id}</td>
                                <td className="is-vcentered">
                                    <span onClick={() => setViewIsOpen(task)} style={{ cursor: 'pointer' }}>
                                        {task.title.length > rowWidth && <small> {expandRow(task.title)}</small>}
                                        {task.title.length > rowWidth ? <br /> : ""}
                                        {task.title.slice(0, rowWidth) + (task.title.length > rowWidth ? "..." : "")}
                                    </span>
                                </td>
                                <td className="is-vcentered">
                                    <EditTaskDropdown
                                        id={task.id}
                                        isOpen={dropdownOpenOnRow === task.id}
                                        taskStatus={task.status}
                                        setDropdownOpenOnRow={setDropdownOpenOnRow}
                                        setTasks={setTasks}
                                        setError={setError}
                                        setSuccess={setSuccess}
                                    />
                                </td>
                                <td className="is-vcentered">
                                    <span onClick={() => setViewIsOpen(task)} style={{ cursor: 'pointer' }}>
                                        {task.description.length > rowWidth && <small> {expandRow(task.description)}</small>}
                                        {task.description.length > rowWidth ? <br /> : ""}
                                        {task.description.slice(0, rowWidth) + (task.description.length > rowWidth ? "..." : "")}
                                    </span>
                                </td>
                                <td className="is-vcentered">
                                    {formatDate(task.dueDate)}
                                    {overdue(task) && overdueTag}
                                    {dueSoon(task) && dueSoonTag}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}   
