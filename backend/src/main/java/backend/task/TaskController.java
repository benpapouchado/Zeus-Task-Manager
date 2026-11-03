package backend.task;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.validation.annotation.Validated;

@RestController
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
@RequestMapping("/api/tasks")
@Validated
public class TaskController {

    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    public record CreateTaskRequest(
            @NotBlank @Size(max = 50) String title,
            @Size(max = 1000) String description,
            @Size(max = 50) String status,
            LocalDateTime dueDate) {
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }

    @GetMapping("/retrieve")
    public ResponseEntity<List<Task>> getTasks() {
        List<Task> tasks = repository.findAll();
        if (Validation.isValidTasks(tasks)) {
        return ResponseEntity.ok(repository.findAll());
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/retrieve/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        if (Validation.isValidId(id) && repository.existsById(id)) {

        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Task> createTask(
            @Valid @RequestBody CreateTaskRequest request) {

        if (Validation.isValidCreateTask(new Task(
                request.title().trim(),
                request.description().trim(),
                request.status().trim(),
                request.dueDate()))) {

        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(new Task(
                request.title().trim(),
                request.description().trim(),
                request.status().trim(),
                request.dueDate())));
        }
        return ResponseEntity.badRequest().build();
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Void> updateTaskStatusById(@PathVariable Long id, @RequestBody Task entity) {

        if (Validation.isValidId(id) && repository.existsById(id)) {
            repository.updateTaskById(id, entity.getStatus());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteMultipleTasks(@RequestParam List<Long> ids) {
        for (Long id : ids) {
            if (!Validation.isValidId(id) || !repository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
        }
        repository.deleteRows(ids);
        return ResponseEntity.noContent().build();
    }
}