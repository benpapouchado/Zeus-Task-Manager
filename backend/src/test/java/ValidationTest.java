import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import backend.validation.Validation;
import backend.BackendApplication;
import backend.task.Task;

@SpringBootTest(classes = BackendApplication.class)
public class ValidationTest {

    @Test
    public void validTitleTest() {
        assertTrue(Validation.isValidTitle("Valid Title"));
    }

    @Test
    public void emptyTitleTest() {

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            Validation.isValidTitle("");
        });
        assertEquals("Title cannot be null or empty", exception.getMessage());
    }

    @Test
    public void nullTitleTest() {

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            Validation.isValidTitle(null);
        });
        assertEquals("Title cannot be null or empty", exception.getMessage());
    }

    @Test
    public void longTitleTest() {
        String longTitle = "This title is definitely longer than fifty characters, which is not allowed.";
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            Validation.isValidTitle(longTitle);
        });
        assertEquals("Title cannot exceed 50 characters", exception.getMessage());
    }

    @Test
    public void validStatus() {
        assertTrue(Validation.isValidStatus("Todo"));
        assertTrue(Validation.isValidStatus("In Progress"));
        assertTrue(Validation.isValidStatus("Done"));
    }

    @Test
    public void invalidStatus() {
        String invalid = "Halfway done";

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            Validation.isValidStatus(invalid);
        });
        assertEquals("Invalid status: " + invalid, exception.getMessage());
    }

    @Test
    public void validDescriptionTest() {
        assertTrue(Validation.isValidDescription("This is a valid description."));
        assertTrue(Validation.isValidDescription(""));
    }

    @Test
    public void longDescriptionTest() {
        String longDescription = "This description is definitely longer than two hundred characters. "
                + "This description is definitely longer than two hundred characters. "
                + "This description is definitely longer than two hundred characters. "
                + "This description is definitely longer than two hundred characters. "
                + "This description is definitely longer than two hundred characters. ";
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            Validation.isValidDescription(longDescription);
        });
        assertEquals("Description cannot exceed 200 characters", exception.getMessage());
    }

    @Test
    public void validDueDateTest() {
        assertTrue(Validation.isValidDueDate(LocalDateTime.now().plusDays(3)));
    }

    @Test
    public void invalidDueDateTest() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            Validation.isValidDueDate(null);
        });
        assertEquals("Invalid due date: null", exception.getMessage());
    }

    @Test
    public void pastDueDate() {
        LocalDateTime dueDate = LocalDateTime.now().minusMonths(3);
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            Validation.isFutureDate(dueDate);
        });
        assertEquals("Due date must be in the future: " + dueDate, exception.getMessage());
    }

    @Test
    public void validId() {
        assertTrue(Validation.isValidId(10L));
        assertTrue(Validation.isValidId(100L));
        assertTrue(Validation.isValidId(5L));
        assertTrue(Validation.isValidId(77L));
    }

    @Test
    public void validTask() {
        Task task = new Task(10L, "title", "Short Description", "Todo", LocalDateTime.now().plusDays(4),
                LocalDateTime.now());
        assertTrue(Validation.isValidTask(task));
    }

}
