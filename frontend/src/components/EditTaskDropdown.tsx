import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
    id: number;
    isOpen: boolean;
    taskStatus: string;
    setDropdownOpenOnRow: (value: number | null) => void;
    fetchAllTasks: () => Promise<void>;
};

export function EditTaskDropdown({
    id,
    isOpen,
    taskStatus,
    setDropdownOpenOnRow,
    fetchAllTasks,
}: Props) {

    const statuses = [
        "Todo",
        "In Progress",
        "Done",
    ];

const statusStyles: Record<string, string> = {
    "Todo": "is-warning",
    "In Progress": "is-info",
    "Done": "is-success",
};

    const buttonStyle = "button is-rounded is-fullwidth is-dark is-outlined " + statusStyles[taskStatus];

    const editTaskStatus = async (newStatus: string) => {
        try {
            const response = await fetch(`${API_URL}/api/tasks/update/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            await fetchAllTasks();

        } catch (error) {
            console.error("Error updating task:", error);
        } finally {
            setDropdownOpenOnRow(null);
        }
    };

    return (
        <div className={`dropdown ${isOpen ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
                <button
                    className={buttonStyle}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() =>
                        setDropdownOpenOnRow(isOpen ? null : id)
                    }
                >
                    <span>{taskStatus}</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" />
                    </span>
                </button>
            </div>

            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {statuses.map((status) => (
                        <button
                            key={status}
                            type="button"
                            className="dropdown-item"
                            onClick={() => editTaskStatus(status)                              
                            }
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
