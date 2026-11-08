import type { Task } from "../type/Type";

type ViewTaskModal = {
    viewIsOpen: Task;
    setViewIsOpen: React.Dispatch<React.SetStateAction<Task | null>>;
    formatDate: (date: string) => string;
};

export function ViewTask({
    viewIsOpen,
    setViewIsOpen,
    formatDate }: ViewTaskModal) {

    const column = {
        "Title": viewIsOpen.title,
        "Status": viewIsOpen.status,
        "Description": viewIsOpen.description,
        "Due Date": formatDate(viewIsOpen.dueDate)
    }

    const section = (columnName: keyof typeof column) => (
        <div>
            <header >
                <h3 className="text-align-left"><strong>{columnName}</strong></h3>
            </header>
            <p className="text-align-left">{column[columnName]}</p>
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