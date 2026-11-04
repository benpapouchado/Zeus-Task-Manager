type Task = {
    title: string;
    description: string;
    status: string;
    dueDate: string;
};

export function isNonEmptyTitle(title : string): string | boolean {
    if (!title || title.trim() === "") {
        return "Title cannot be empty";
    }
    return true;
}

export function isValidTitle(title: string): string | boolean {
    if (title.length > 50) {
        return "Title cannot exceed 50 characters";
    }
    return true;
}

export function isValidDescription(description: string): string | boolean {
    if (description.length > 1000) {
        return "Description cannot exceed 1000 characters";
    }
    return true;
}

export function isValidStatus(status: string): string | boolean {
    const validStatuses = ["Todo", "In Progress", "Done"];
    if (!validStatuses.includes(status)) {
        return "Invalid status";
    }
    return true;
}

export function isValidDueDate(dueDate: string): string | boolean {
    const date = new Date(dueDate);
    const now = new Date();
    if (date <= now) {
        return "Due date must be in the future";
    }
    // if(date instanceof Date && isNaN(date.getTime())) {
    //     return "Invalid date format";
    // }
    return true;
}

export function isValidTask(task: Task): string | boolean {
    const nonEmptyTitleError = isNonEmptyTitle(task.title);
    const titleError = isValidTitle(task.title);
    const statusError = isValidStatus(task.status);
    const descriptionError = isValidDescription(task.description);
    const dueDateError = isValidDueDate(task.dueDate);

    if (typeof nonEmptyTitleError === "string") {
        return nonEmptyTitleError;
    }    

    if (typeof titleError === "string") {
        return titleError;
    }

    if (typeof descriptionError === "string") {
        return descriptionError;
    }

    if (typeof statusError === "string") {
        return statusError;
    }

    if (typeof dueDateError === "string") {
        return dueDateError;
    }

    return true;
}

export function isValidId(id: string): string| boolean {
    if (!id || id.trim() === "" || Number.isNaN(Number(id)) || Number(id) <= 0) {
        return "ID cannot be empty";
    }
    return true;
}