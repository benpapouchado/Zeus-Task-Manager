import type { Task } from "../type/Type";
import { formatDate, overdue, overdueTag, statusDisplay } from '../shared/Shared';


type ViewTaskModal = {
    viewIsOpen: Task;
    setViewIsOpen: React.Dispatch<React.SetStateAction<Task | null>>;
};

export function ViewTask({
    viewIsOpen,
    setViewIsOpen }: ViewTaskModal) {

    const dueDateDisplay = overdue(viewIsOpen) ? (
        <span>
            <span>{formatDate(viewIsOpen.dueDate)}</span>
            <span>{overdueTag}</span>
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
                    {section("Title")}
                    {section("Status")}
                    {section("Description")}
                    {section("Due Date")}

                    <button
                        className="button is-rounded"
                        onClick={() => setViewIsOpen(null)}>
                        Close
                    </button>
                </section>
            </div>
        </div>
    );
}