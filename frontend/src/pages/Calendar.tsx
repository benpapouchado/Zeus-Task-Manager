import { useState, useEffect } from 'react';
import type { Task } from '../type/Type';
import { overdue, overdueTag, statusDisplay, dueSoon, dueSoonTag } from '../shared/Shared';

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

    [...tasks].sort((a : Task, b : Task) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
    .forEach((task: Task) => {
        const month = formatMonths(task.dueDate);
        if (!months.includes(month)) {
            setMonths([...months, month])
        }
    });

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
                const monthTasks = tasks.filter((task: Task) => formatMonths(task.dueDate) === month);

                return (
                    <div key={month}>
                        <h1 className="text-align-left is-size-4 m-3"><strong>{month}</strong></h1>
                        <div className="rounded-table">
                            <table className="table is-fullwidth rounded-table task-table is-vcentered dashboard-calendar">
                                <tbody>
                                    {monthTasks.map((task: Task) => (
                                        <tr key={task.id}>
                                            <td width="120"
                                                className="py-4">{formatDate(task.dueDate)}
                                                {overdue(task) && overdueTag}
                                                {dueSoon(task) && dueSoonTag}
                                            </td>
                                            <td width="120" 
                                            className="py-4">{task.title}</td>
                                            <td width="120">
                                                {statusDisplay(task.status)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
        </main>
    );
}