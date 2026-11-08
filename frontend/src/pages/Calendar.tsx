import { useState, useEffect } from 'react';
import type { Task } from '../type/Type';

type Calendar = {
    tasks: Task[],
};

export default function Calendar({ tasks }: Calendar) {

    const [months, setMonths] = useState<string[]>([]);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
        }).replace(",", "");
    };

    const formatMonths = (date: string) => {
        return new Date(date).toLocaleString("en-GB", {
            month: "long",
            year: "numeric",
        }).replace(",", "");
    };


    const style: Record<string, string> = {
        "Todo": "todo",
        "In Progress": "in-progress",
        "Done": "done",
    }

    tasks.forEach((task: Task) => {
        const month = formatMonths(task.dueDate);
        if (!months.includes(month)) {
            setMonths([...months, month])
        }
    });

    console.log(months);

    return (
        <main>
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <h1 className="title">Calendar</h1>
                    </div>
                </div>
            </div>

            {months.map((month: string) => {
                const monthTasks = tasks.reverse().filter((task: Task) => formatMonths(task.dueDate) === month);

                return (
                    <div key={month}>
                        <h1 className="text-align-left m-1"><strong>{month}</strong></h1>
                        <table className="table is-fullwidth rounded-table task-table is-vcentered dashboard-calendar">
                            <tbody>
                                {monthTasks.map((task: Task, index: number) => (
                                    <tr key={`${month}-${index}`}
                                    className="my-1">
                                        <td>{formatDate(task.dueDate)}</td>
                                        <td>{task.title}</td>
                                        <td>
                                            <div className="status">
                                                <span className={style[task.status]}>{task.status}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </main>
    );
}