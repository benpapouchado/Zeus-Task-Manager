package backend;

import java.util.List;
import java.time.LocalDateTime;
import backend.task.TaskRepository;
import backend.task.Task;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TaskRepositoryTest {

    @Autowired
    private TaskRepository repository;

    @Test
    public void deleteRowsTest() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime dueDate = now.plusDays(3);

        Task request1 = repository.save(new Task(
                "Test task", "Description", "Todo", dueDate, now));

        Task request2 = repository.save(new Task(
                "Test task 2", "Description of the second task", "In Progress", dueDate, now));

        Task request3 = repository.save(new Task(
                "Test task 3", "Description but its the third task again", "Done", dueDate, now));

        assertTrue(repository.existsById(request1.getId()));
        assertTrue(repository.existsById(request2.getId()));
        assertTrue(repository.existsById(request3.getId()));

        repository.deleteRows(List.of(request1.getId(), request2.getId(), request3.getId()));

        assertFalse(repository.existsById(request1.getId()));
        assertFalse(repository.existsById(request2.getId()));
        assertFalse(repository.existsById(request3.getId()));
    }

    @Test
    public void updateTaskByIdTest() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime dueDate = now.plusDays(3);

        Task task = repository.save(new Task("Test task", "Description", "Todo", dueDate, now));
        long id = task.getId();

        repository.updateTaskById(id, "In Progress");

        assertEquals("In Progress", repository.findById(id).orElseThrow().getStatus());

        repository.deleteRows(List.of(id));
    }

}
