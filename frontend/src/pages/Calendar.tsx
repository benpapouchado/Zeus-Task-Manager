import type { Task } from '../type/Type';

type Calendar = {
    tasks: Task[],
}

export default function Calendar({ tasks }: Calendar) {
    return (
        <main>
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <h1 className="title">Calendar</h1>
                    </div>
                </div>
            </div>
        </main>
    );
}