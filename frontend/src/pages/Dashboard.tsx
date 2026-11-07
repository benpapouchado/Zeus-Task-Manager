import type { Task } from '../type/Type';

type DashboardProps = {
    tasks: Task[],
}

export default function Dashboard({ tasks }: DashboardProps) {

    const icons = {
        "Todo": ["far fa-list-alt fa-lg", "icon is-light has-text-info"],
        "In Progress": ["far fa-clock fa-lg", "icon is-light has-text-warning"],
        "Done": ["far fa-check-circle fa-lg", "icon is-light has-text-success"],
        "Overdue": ["fas fa-exclamation-triangle fa-lg", "icon is-light has-text-danger"]
    }

    const todo =
        tasks.filter((row) => row.status === "Todo");


    const inProgress =
        tasks.filter((row) => row.status === "In Progress");


    const done =
        tasks.filter((row) => row.status === "Done");


    const overdue =
        tasks.filter((row) => {
            const now = new Date();
            return (new Date(row.dueDate) < now)
        });

    const icon = (label: keyof typeof icons, count: number) => (
        <div className="box column is-flex-grow-1 has-text-left is-one-fifth mg-large pg-large" >
            <span className="icon-text m-3">
                <span className={icons[label][1]}>
                    <i className={icons[label][0]}></i>
                </span>
                <span className="ml-3">
                    {label}
                </span>
            </span>
            <h1 className="ml-3" style={{ fontSize: "1.8em" }}>
                <strong>{count}</strong>
            </h1>
        </div>
    )

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).replace(",", "");
    };

    return (
        <main>
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <h1 className="title">Dashboard</h1>
                    </div>
                </div>
            </div>

            <div className="columns is-flex is-justify-content-space-between is-3">
                {icon("Todo", todo.length)}
                {icon("In Progress", inProgress.length)}
                {icon("Done", done.length)}
                {icon("Overdue", overdue.length)}
            </div>

            <div className="rounded-table">
                <table className="table is-hoverable is-fullwidth rounded-table task-table is-vcentered">

                    <thead>
                        <tr>
                            <th>
                                Due Next
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {inProgress.map((task: Task) => (
                            <tr key={task.id}>
                                <td>{task.status}</td>
                                <td>{task.title}</td>
                                <td>{formatDate(task.dueDate)}</td>
                            </tr>
                        ))}
                        {overdue.map((task: Task) => (
                            <tr key={task.id}>
                                <td>{task.status}</td>
                                <td>{task.title}</td>
                                <td>{formatDate(task.dueDate)}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </main >
    );
}