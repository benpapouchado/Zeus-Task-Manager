
import { useLayoutEffect, useRef, useState } from "react";
import type { Task } from "../type/Type";

const API_URL = import.meta.env.VITE_API_URL;

type Dropdown = {
    id: number;
    isOpen: boolean;
    taskStatus: string;
    setDropdownOpenOnRow: (value: number | null) => void;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
};

export function EditTaskDropdown({
    id,
    isOpen,
    taskStatus,
    setDropdownOpenOnRow,
    setTasks,
    setError,
    setSuccess
}: Dropdown) {

    const statuses = ["Todo", "In Progress", "Done"];

    const statusStyles: Record<string, string> = {
        "Todo": "is-warning",
        "In Progress": "is-info",
        "Done": "is-success",
    };

    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const [openUp, setOpenUp] = useState(false);
    const [maxMenuHeight, setMaxMenuHeight] = useState<number | undefined>();

    useLayoutEffect(() => {
        if (!isOpen || !dropdownRef.current || !menuRef.current) {
            return;
        }

        const trigger = dropdownRef.current.querySelector(
            ".dropdown-trigger"
        );

        if (!trigger) return;

        const triggerRect = trigger.getBoundingClientRect();
        const menu = menuRef.current;

        const menuHeight = menu.scrollHeight;

        const spaceBelow = window.innerHeight - triggerRect.bottom - 8;
        const spaceAbove = triggerRect.top - 8;

        const shouldOpenUp =
            spaceBelow < menuHeight && spaceAbove > spaceBelow;

        setOpenUp(shouldOpenUp);

        const availableSpace = Math.max(spaceAbove, spaceBelow);

        setMaxMenuHeight(
            Math.min(menuHeight, Math.max(0, availableSpace))
        );

    }, [isOpen]);

    const editTaskStatus = async (newStatus: string) => {
        try {
            const response = await fetch(
                `${API_URL}/api/tasks/update/${id}`,
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

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id
                        ? { ...task, status: newStatus }
                        : task
                )
            );

            setSuccess("2");
            setError(null);

        } catch (error) {
            console.error("Error updating task:", error);
            setError("2");
            setSuccess(null);

        } finally {
            setDropdownOpenOnRow(null);
        }
    };

    const buttonStyle =
        "button is-rounded is-fullwidth is-light " +
        statusStyles[taskStatus];

    return (
        <div
            ref={dropdownRef}
            className={`dropdown ${openUp ? "is-up" : ""} ${isOpen ? "is-active" : ""}`}
        >
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

            <div
                ref={menuRef}
                className="dropdown-menu"
                role="menu"
                style={{
                    maxHeight: maxMenuHeight,
                }}
            >
                <div className="dropdown-content">
                    {statuses.map((status) => (
                        <button
                            key={status}
                            type="button"
                            className="dropdown-item"
                            onClick={() => editTaskStatus(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
