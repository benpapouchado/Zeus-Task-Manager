import type { Task } from '../type/Type';

type DashboardProps = {
    tasks: Task[],
}

export default function Dashboard({ tasks }: DashboardProps) {

    const icons = {
        todo: "far fa-list-alt",
        inProgress: "far fa-clock",
        done: "far fa-check-circle",
        overdue: "fas fa-exclamation-triangle"
    }

    const icon = (icon: string, label: string) => (
        <div className="box is-flex-grow-1 has-text-left" >
            <div >
                <span className="mr-2">
                    <i className={icon}></i>
                </span>
                {label}
            </div>
        </div>
    )

    return (
        <main>
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <h1 className="title">Dashboard</h1>
                    </div>
                </div>
            </div>

            <div className="is-flex is-justify-content-space-between" style={{ margin: "1rem 0" }}>
                {icon(icons.todo, "Todo")}
                {icon(icons.inProgress, "In Progress")}
                {icon(icons.done, "Done")}
                {icon(icons.overdue, "Overdue")}
            </div>

        </main >
    );
}