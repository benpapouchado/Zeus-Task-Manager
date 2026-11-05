package backend;

import java.util.List;
import java.time.LocalDateTime;
import backend.task.TaskController;
import backend.task.TaskRepository;
import backend.task.Task;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        LocalDateTime dueDate = LocalDateTime.now().plusDays(3);

        Task request1 = repository.save(new Task(
                "Test task", "Description", "Todo", dueDate));

        Task request2 = repository.save(new Task(
                "Test task 2", "Description of the second task", "In Progress", dueDate));

        Task request3 = repository.save(new Task(
                "Test task 3", "Description but its the third task again", "Done", dueDate));

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
        LocalDateTime dueDate = LocalDateTime.now().plusDays(3);

        Task task = repository.save(new Task("Test task", "Description", "Todo", dueDate));
        long id = task.getId();

        repository.updateTaskById(id, "In Progress");

        assertEquals("In Progress", repository.findById(id).orElseThrow().getStatus());

        repository.deleteRows(List.of(id));
    }

}
