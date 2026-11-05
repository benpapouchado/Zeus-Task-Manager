import "bulma/css/bulma.min.css";
import "../App.css";
import { useState } from 'react';
import { isValidTask, isValidTitle, isValidDescription, isValidStatus, isValidDueDate } from "../validate/Validation";
import type { Task } from "../pages/Tasks";

const API_URL = import.meta.env.VITE_API_URL;

type CreateTaskModalProps = {
    setSelectedTaskButton: (value: string) => void;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export function CreateTaskModal({
    setSelectedTaskButton,
    setError,
    setSuccess,
    setTasks
}: CreateTaskModalProps) {

    const statuses = {
        todo: "Todo",
        inProgress: "In Progress",
        done: "Done",
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(statuses.todo);
    const [dueDate, setDueDate] = useState("");

    const [selectedStatusButton, setSelectedStatusButton] = useState<string | null>(statuses.todo);

    const [errorForm, setErrorForm] = useState({
        title: "",
        description: "",
        status: "",
        dueDate: "",
    })

    const selectStatusButton = (label: string) =>
        <button
            key={label}
            className={"button is-fullwidth is-responsive"}
            style={{
                color: label === selectedStatusButton ? "white" : "black",
                backgroundColor: label === selectedStatusButton ? "#7e1212" : "white",
            }}
            onClick={() => {
                if (isValidStatus(label) === true) {
                    setSelectedStatusButton(label)
                    setStatus(label)
                    setErrorForm({ ...errorForm, status: "" });
                } else {
                    setErrorForm({ ...errorForm, status: isValidStatus(label) as string });
                }
            }}>
            {label}
        </button>
    { errorForm.status && <p className="help is-danger">{errorForm.status}</p> }

    const createNewTask = async () => {
        try {
            const response = await fetch(`${API_URL}/api/tasks/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title, description: description,
                    status: status, dueDate: dueDate
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const createdTask: Task = await response.json();
            setTasks((prevTasks) => [...prevTasks, createdTask]);
            setSelectedTaskButton("");
            setSuccess("0");
            setError(null);

        } catch (error) {
            setError("0");
            setSuccess(null);
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <div className="modal is-active">
            <div className="modal-background"
                onClick={() => setSelectedTaskButton("")} /
            >

            <div className="modal-card custom-modal">

                <section className="modal-card-body">
                    <header >
                        <h3 className="modal-card-title md-2 text-align-left"><strong>New task</strong></h3>
                    </header>
                    <div className="mb-4 text-align-left">Add it to the board with a status and a due date</div>

                    <div className="field">
                        <label className="label ">Title</label>
                        <div className="control">
                            <input className="input"
                                type="text"
                                placeholder="What needs doing?"
                                value={title}
                                onChange={(e) => {
                                    const validationResult = isValidTitle(e.target.value);
                                    if (validationResult === true) {
                                        setTitle(e.target.value)
                                        setErrorForm({ ...errorForm, title: "" });
                                    } else {
                                        setErrorForm({ ...errorForm, title: validationResult as string });
                                    }
                                }} />
                        </div>
                    </div>
                    {errorForm.title && <p className="help is-danger">{errorForm.title}</p>}

                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea className="textarea"
                                placeholder="Optional details"
                                value={description}
                                onChange={(e) => {
                                    const validationResult = isValidDescription(e.target.value);
                                    if (validationResult === true) {
                                        setErrorForm({ ...errorForm, description: "" });
                                        setDescription(e.target.value);
                                    } else {
                                        setErrorForm({ ...errorForm, description: validationResult as string });
                                    }
                                }}>
                            </textarea>
                        </div>
                    </div>
                    {errorForm.description && <p className="help is-danger">{errorForm.description}</p>}

                    <div>
                        <label className="label">Status</label>
                    </div>
                    <div className="column">
                        <div className="columns is-variable is-1">
                            <div className="column">
                                {selectStatusButton(statuses.todo)}
                            </div>
                            <div className="column">
                                {selectStatusButton(statuses.inProgress)}
                            </div>
                            <div className="column">
                                {selectStatusButton(statuses.done)}
                            </div>
                        </div>
                    </div>
                    {errorForm.status && <p className="help is-danger">{errorForm.status}</p>}

                    <div className="field">
                        <label className="label">Due Date</label>
                        <div className="control">
                            <input
                                className="datetime-picker task-datetime is-fullwidth"
                                aria-label="Due date time"
                                type="datetime-local"
                                value={dueDate}
                                onChange={(e) => {
                                    if (isValidDueDate(e.target.value) === true) {
                                        setDueDate(e.target.value)
                                        setErrorForm({ ...errorForm, dueDate: "" });
                                    } else {
                                        setErrorForm({ ...errorForm, dueDate: isValidDueDate(e.target.value) as string });
                                    }
                                }}
                                onClick={(e) => {
                                    try {
                                        e.currentTarget.showPicker
                                    }
                                    catch {
                                        setErrorForm({ ...errorForm, dueDate: "Invalid date format" });
                                    }
                                }} />
                        </div>
                    </div>
                    {errorForm.dueDate && <p className="help is-danger">{errorForm.dueDate}</p>}

                    <div className="my-4">
                        <button
                            className="button is-rounded"
                            onClick={() => {
                                if (isValidTask({ title, description, status, dueDate }) === true) {
                                    createNewTask();
                                }
                            }
                            }
                            disabled={errorForm.title !== "" || errorForm.description !== "" || errorForm.status !== "" || errorForm.dueDate !== ""}
                            style={{
                                backgroundColor: "#7e1212",
                                color: "white",
                            }}>
                            Create task
                        </button>
                        <button
                            className="button is-rounded"
                            onClick={() => setSelectedTaskButton("")}
                            disabled={errorForm.title !== "" || errorForm.description !== ""
                                || errorForm.status !== "" || errorForm.dueDate !== ""}>
                            Cancel
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
}