import type { Task } from "../type/Type";

export const statuses = {
    all: "All",
    todo: "Todo",
    inProgress: "In Progress",
    done: "Done",
}

    const style = {
        "Todo":  "todo",
        "In Progress":  "in-progress",
        "Done": "done",
    }

export const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).replace(",", "");
};

export const overdue = (task: Task) => {
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    return dueDate < now && task.status !== statuses.done;
};

export const overdueTag = <span className="tag is-danger is-light is-outlined ml-3">Overdue</span>;

export const statusDisplay = (label: string) => (
    <div className="status">
    <div className={style[label as keyof typeof style]}>
        <span className="text-align-left">{label}</span>
    </div>
</div>
)