import type { Task } from '../type/Type';

type DashboardProps = {
    tasks: Task[],
}

export default function Dashboard({ tasks }: DashboardProps) {

    const icons = {
        todo: "far fa-list-alt fa-lg",
        inProgress: "far fa-clock fa-lg",
        done: "far fa-check-circle fa-lg",
        overdue: "fas fa-exclamation-triangle fa-lg"
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

    const icon = (icon: string, label: string, count: number) => (
        <div className="box column is-flex-grow-1 has-text-left is-one-fifth mg-medium" >
            <div >
                <span className="icon is-medium">
                    <span className="mr-2">
                        <i className={icon}></i>
                    </span>
                </span>
                {label}
                <h1 style={{ fontSize: "1.7em" }}>
                    <strong>{count}</strong>
                </h1>
            </div>
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
                {icon(icons.todo, "Todo", todo.length)}
                {icon(icons.inProgress, "In Progress", inProgress.length)}
                {icon(icons.done, "Done", done.length)}
                {icon(icons.overdue, "Overdue", overdue.length)}
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