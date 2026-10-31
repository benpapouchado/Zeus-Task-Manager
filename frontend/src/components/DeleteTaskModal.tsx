
const API_URL = import.meta.env.VITE_API_URL;

export function DeleteTaskModal(ids: number[], {
    setSelectedTaskButton,
    fetchAllTasks,
}: {
    setSelectedTaskButton: (value: string) => void;
    fetchAllTasks: () => void;
}) {


    const deleteTasks = async () => {
        try {
            const response = await fetch(`${API_URL}/api/tasks/delete?ids=${ids.join(",")}`, {
                method: "DELETE",

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

    const modalHeader = ids.length > 1 ? "Delete Task" : "Delete Tasks";
    const modalContent = ids.length > 1 ? "Are you sure you want to delete " + ids.length + " tasks?" :
        "Are you sure you want to delete " + ids.length + " task?";

    return (
        <div className="modal is-active">
            <div className="modal-background"
                onClick={() => setSelectedTaskButton("")} />

            <div className="modal-card custom-modal">

                <section className="modal-card-body">
                    <header >
                        <h3 className="modal-card-title md-2 text-align-left"><strong>{modalHeader}</strong></h3>
                    </header>

                    <div className="my-3 text-align-left">{modalContent}</div>

                    <div className="my-4">
                        <button
                            className="button is-rounded"
                            onClick={deleteTasks}
                            style={{
                                backgroundColor: "#7e1212",
                                color: "white",
                            }}>
                            Delete task
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