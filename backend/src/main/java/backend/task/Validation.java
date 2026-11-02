package backend.task;

import java.time.LocalDateTime;

public class Validation {

    public static boolean isValidStatus(String status) {
        if (status.equals("Todo") || status.equals("In Progress") || status.equals("Done")) {
            return true;
        }
        throw new IllegalArgumentException("Invalid status: " + status);
    }

    public static boolean isValidTitle(String title) {
        if (title == null || title.isEmpty()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }

        if (title.length() > 50) {
            throw new IllegalArgumentException("Title cannot exceed 50 characters");
        }
        return true;
    }

    public static boolean isValidDescription(String description) {
        if (description.length() > 1000) {
            throw new IllegalArgumentException("Description cannot exceed 1000 characters");
        }
        return true;
    }

    public static boolean isValidDueDate(LocalDateTime dueDate) {
        if (dueDate != null) {
            return true;
        }
        throw new IllegalArgumentException("Invalid due date: " + dueDate);
    }

    public static boolean isFutureDate(LocalDateTime dueDate) {
        if (dueDate.isAfter(LocalDateTime.now())) {
            return true;
        }
        throw new IllegalArgumentException("Due date must be in the future: " + dueDate);
    }

    public static boolean isValidTask(Task task) {
        return isValidTitle(task.getTitle()) &&
                isValidDescription(task.getDescription()) &&
                isValidStatus(task.getStatus()) &&
                isValidDueDate(task.getDueDate()) &&
                isFutureDate(task.getDueDate());
    }

    public static boolean isValidId(Long id) {
        if (id != null && id > 0) {
            return true;
        }
        throw new IllegalArgumentException("Invalid ID: " + id);
    }

}
