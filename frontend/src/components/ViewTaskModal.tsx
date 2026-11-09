import type { Task } from "../type/Type";
import { formatDate, overdue, overdueTag, statusDisplay, dueSoon, dueSoonTag } from '../shared/Shared';
import type { Dispatch, SetStateAction } from 'react';

type ViewTaskModal = {
    viewIsOpen: Task;
    setViewIsOpen: Dispatch<SetStateAction<Task | null>>;
};

export function ViewTask({
    viewIsOpen,
    setViewIsOpen }: ViewTaskModal) {

    const formatTimeAgo = (task: Task): string => {
        const createdAt = new Date(task.createdAt).getTime();
        const now = Date.now();
        const msDifference = now - createdAt;

        const seconds = Math.floor(msDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30.4375);
        const years = Math.floor(days / 365.25);

        if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

        return seconds > 10 ? `${seconds} seconds ago` : 'Just now';
    };

    const dueDateDisplay = dueSoon(viewIsOpen) ? (
        <span>
            <span>{formatDate(viewIsOpen.dueDate)}</span>
            <span className="pt-2">{dueSoonTag}</span>
        </span>) : (<span>{formatDate(viewIsOpen.dueDate)}</span>);

    const column = {
        "Title": viewIsOpen.title,
        "Status": <span>{statusDisplay(viewIsOpen.status)}</span>,
        "Description": viewIsOpen.description,
        "Due Date": dueDateDisplay,
    };

    const section = (columnName: keyof typeof column) => (
        <div>
            <header >
                <h3 className="text-align-left my-3 is-size-4"><strong>{columnName}</strong></h3>
            </header>
            <p className="text-align-left my-3">{column[columnName]}</p>
        </div>
    );

    return (
        <div className="modal is-active">
            <div className="modal-background"
                onClick={() => { setViewIsOpen(null) }} />

            <div className="modal-card custom-modal">

                <section className="modal-card-body">

                    <span className="icon-text m-3 status">
                        <i className="far fa-clock"></i>
                        {formatTimeAgo(viewIsOpen)}
                    </span>

                    <table className="table is-fullwidth">
                        <tbody>
                            <tr>
                                <td width="100">
                                    {section("Title")}
                                </td>
                                <td width="100">
                                    {section("Status")}
                                </td>
                            </tr>
                            <tr>
                                <td width="120">
                                    <div>
                                        {section("Description")}
                                    </div>
                                </td>
                                <td width="100">
                                    {section("Due Date")}
                                    {overdue(viewIsOpen) && overdueTag}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button
                        className="button is-rounded mt-2"
                        onClick={() => setViewIsOpen(null)}>
                        Close
                    </button>
                </section>
            </div>
        </div>
    );
}