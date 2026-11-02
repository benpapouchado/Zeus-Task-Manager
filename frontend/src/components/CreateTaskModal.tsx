import "bulma/css/bulma.min.css";
import "../App.css";
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export function CreateTaskModal({
    setSelectedTaskButton,
    fetchAllTasks,
}: {
    setSelectedTaskButton: (value: string) => void;
    fetchAllTasks: () => void;
}) {



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

    const selectStatusButton = (label: string) =>
        <button
            key={label}
            className={"button is-fullwidth is-responsive"}
            style={{
                color: label === selectedStatusButton ? "white" : "black",
                backgroundColor: label === selectedStatusButton ? "#7e1212" : "white",
            }}
            onClick={() => {
                setSelectedStatusButton(label)
                setStatus(label)
            }}>
            {label}
        </button>

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

            if (response.ok) {
                fetchAllTasks();
                setSelectedTaskButton("");
            }

        } catch (error) {
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
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea className="textarea"
                                placeholder="Optional details"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}>
                            </textarea>
                        </div>
                    </div>

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

                    <div className="field">
                        <label className="label">Due Date</label>
                        <div className="control">
                            <input
                                className="datetime-picker task-datetime is-fullwidth"
                                aria-label="Due date time"
                                type="datetime-local"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                onClick={(e) => {
                                    try {
                                        e.currentTarget.showPicker
                                    }
                                    catch {
                                        console.error("Wont work");
                                    }
                                }} />
                        </div>
                    </div>

                    <div className="my-4">
                        <button
                            className="button is-rounded"
                            onClick={createNewTask}
                            style={{
                                backgroundColor: "#7e1212",
                                color: "white",
                            }}>
                            Create task
                        </button>
                        <button
                            className="button is-rounded"
                            onClick={() => setSelectedTaskButton("")}>
                            Cancel
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
}