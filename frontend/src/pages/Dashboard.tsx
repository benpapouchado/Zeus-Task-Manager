import type { Task } from '../type/Type';
import { overdue, overdueTag, statusDisplay } from '../shared/Shared';

type DashboardProps = {
    tasks: Task[],
}

export default function Dashboard({ tasks }: DashboardProps) {

    const style = {
        "Todo": ["far fa-list-alt fa-lg", "icon is-light has-text-info", "todo"],
        "In Progress": ["far fa-clock fa-lg", "icon is-light has-text-warning", "in-progress"],
        "Done": ["far fa-check-circle fa-lg", "icon is-light has-text-success", "done"],
        "Overdue": ["fas fa-exclamation-triangle fa-lg", "icon is-light has-text-danger"]
    }

    const todo =
        tasks.filter((row) => row.status === "Todo");


    const inProgress =
        tasks.filter((row) => row.status === "In Progress");


    const done =
        tasks.filter((row) => row.status === "Done");


    const overDue = tasks.filter((row) =>
        row.status !== "Done" && new Date(row.dueDate) < new Date()
    );

    const dueNext = [...inProgress, ...todo];

    const icon = (label: keyof typeof style, count: number) => (
        <div className="box column is-flex-grow-1 has-text-left is-one-fifth mg-large pg-large" >
            <span className="icon-text m-3">
                <span className={style[label][1]}>
                    <i className={style[label][0]}></i>
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
                {icon("Overdue", overDue.length)}
            </div>

            <div className="rounded-table my-4">
                <table className="table is-fullwidth rounded-table task-table dashboard-calendar">

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
                        {dueNext.map((task: Task) => (
                            <tr key={task.id}>
                                <td className="is-vcentered">
                                    {statusDisplay(task.status)}
                                </td>
                                <td className="is-vcentered">{task.title}</td>
                                <td className="is-vcentered has-text-right">
                                    <span className="mx-3">{overdue(task) && overdueTag}</span>
                                {formatDate(task.dueDate)}
                                    
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </main >
    );
}