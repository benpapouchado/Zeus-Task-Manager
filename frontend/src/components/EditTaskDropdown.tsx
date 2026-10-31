import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export function EditTaskDropdown(id: number, row: number, taskStatus: string, changeStatus: string, {
    setDropdownOpenOnRow,
    setChangeStatus,
    fetchAllTasks,
}: {
    setDropdownOpenOnRow: (value: number) => void;
    setChangeStatus: (newStatus: string) => void;
    fetchAllTasks: () => void;
}) {



    const statuses = {
        todo: "Todo",
        inProgress: "In Progress",
        done: "Done",
    }

    const editTaskStatus = async (newStatus : string) => {
        try {
            const response = await fetch(`${API_URL}/api/tasks/update/${row}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },                
                body: JSON.stringify({ status: newStatus }),

            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (response.ok) {
                console.log("birb");
                fetchAllTasks();
            }

            console.log(response.status)

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const dropdownActive = "dropdown " + (row === id ? "is-active" : "");

    const handleChange = (val : string) => {
        setChangeStatus(val)
        editTaskStatus(changeStatus)
        setDropdownOpenOnRow(-1)
    }

    console.log(row, changeStatus);

    return (
        <div id={String(id)} className={dropdownActive}>
            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3"
                    onClick={() => setDropdownOpenOnRow(id)}>
                    <span>{taskStatus}</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                <div className="dropdown-content">

                    <a key={statuses.todo} className="dropdown-item"
                        onClick={() => {handleChange(statuses.todo)}}>{statuses.todo}</a>

                    <a key={statuses.inProgress} className="dropdown-item"
                    onClick={() => {handleChange(statuses.inProgress)}}>{statuses.inProgress} </a>

                    <a key={statuses.done} className="dropdown-item"
                    onClick={() => {handleChange(statuses.done)}}>{statuses.done}</a>

                </div>
            </div>
        </div>
    )
}