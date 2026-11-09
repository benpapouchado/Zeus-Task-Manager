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
class TaskControllerTest {

        @Autowired
        private TaskController taskController;

        @Autowired
        private TaskRepository repository;

        @Test
        public void createTaskTest() {
                LocalDateTime dueDate = LocalDateTime.now().plusDays(3);

                TaskController.CreateTaskRequest request = new TaskController.CreateTaskRequest(
                                "Test task", "Description", "Todo", dueDate, LocalDateTime.now());

                ResponseEntity<Task> responseEntity = taskController.createTask(request);

                assertNotNull(responseEntity);
                assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());

                Task response = responseEntity.getBody();

                assertNotNull(response);

                assertNotNull(response.getId());
                assertTrue(repository.existsById(response.getId()));

                assertEquals("Test task", response.getTitle());
                assertEquals("Todo", response.getStatus());
                assertEquals("Description", response.getDescription());
                assertEquals(dueDate, response.getDueDate());

                repository.deleteById(response.getId());
        }

        @Test
        public void deleteTaskTest() {
                LocalDateTime dueDate = LocalDateTime.now().plusDays(3);

                TaskController.CreateTaskRequest request1 = new TaskController.CreateTaskRequest(
                                "Test task", "Description", "Todo", dueDate, LocalDateTime.now());

                TaskController.CreateTaskRequest request2 = new TaskController.CreateTaskRequest(
                                "Test task 2", "Description of the second task", "In Progress", dueDate,
                                LocalDateTime.now());

                TaskController.CreateTaskRequest request3 = new TaskController.CreateTaskRequest(
                                "Test task 3", "Description but its the third task again", "Done", dueDate,
                                LocalDateTime.now());

                ResponseEntity<Task> responseEntity1 = taskController.createTask(request1);
                ResponseEntity<Task> responseEntity2 = taskController.createTask(request2);
                ResponseEntity<Task> responseEntity3 = taskController.createTask(request3);

                assertNotNull(responseEntity1);
                assertNotNull(responseEntity2);
                assertNotNull(responseEntity3);

                Task response1 = responseEntity1.getBody();
                Task response2 = responseEntity2.getBody();
                Task response3 = responseEntity3.getBody();

                assertTrue(repository.existsById(response1.getId()));
                assertTrue(repository.existsById(response2.getId()));
                assertTrue(repository.existsById(response3.getId()));

                taskController.deleteMultipleTasks(List.of(response1.getId()));
                assertFalse(repository.existsById(response1.getId()));

                taskController.deleteMultipleTasks(List.of(response2.getId(), response3.getId()));
                assertFalse(repository.existsById(response2.getId()));
                assertFalse(repository.existsById(response3.getId()));
        }

        @Test
        public void fetchAllTasksTest() {
                LocalDateTime dueDate = LocalDateTime.now().plusDays(3);

                TaskController.CreateTaskRequest request1 = new TaskController.CreateTaskRequest(
                                "Test task", "Description", "Todo", dueDate, LocalDateTime.now());

                TaskController.CreateTaskRequest request2 = new TaskController.CreateTaskRequest(
                                "Test task 2", "Description of the second task", "In Progress", dueDate,
                                LocalDateTime.now());

                TaskController.CreateTaskRequest request3 = new TaskController.CreateTaskRequest(
                                "Test task 3", "Description but its the third task again", "Done", dueDate,
                                LocalDateTime.now());

                ResponseEntity<Task> responseEntity1 = taskController.createTask(request1);
                ResponseEntity<Task> responseEntity2 = taskController.createTask(request2);
                ResponseEntity<Task> responseEntity3 = taskController.createTask(request3);

                assertNotNull(responseEntity1);
                assertNotNull(responseEntity2);
                assertNotNull(responseEntity3);

                List<Long> allTasks = List.of(responseEntity1.getBody().getId(),
                                responseEntity2.getBody().getId(), responseEntity3.getBody().getId());

                for (Long taskId : allTasks) {
                        assertTrue(allTasks.contains(taskId));
                }

                taskController.deleteMultipleTasks(allTasks);
        }

        @Test
        public void fetchTaskTest() {
                LocalDateTime dueDate = LocalDateTime.now().plusDays(3);

                TaskController.CreateTaskRequest request = new TaskController.CreateTaskRequest(
                                "Test task", "Description", "Todo", dueDate,
                                LocalDateTime.now());

                Task responseEntity = taskController.createTask(request).getBody();
                Task retrieveTask = taskController.getTask(responseEntity.getId()).getBody();

                assertEquals(retrieveTask.getId(), responseEntity.getId());

                taskController.deleteMultipleTasks(List.of(retrieveTask.getId()));
        }

        @Test
        public void updateTaskTest() {
                LocalDateTime dueDate = LocalDateTime.now().plusDays(3);

                TaskController.CreateTaskRequest request = new TaskController.CreateTaskRequest(
                                "Test task", "Description", "Todo", dueDate,
                                LocalDateTime.now());

                Task responseEntity = taskController.createTask(request).getBody();
                taskController.updateTaskStatusById(responseEntity.getId(), new Task("Done"));

                Task retrieveTask = taskController.getTask(responseEntity.getId()).getBody();

                assertEquals("Done", retrieveTask.getStatus());

                taskController.deleteMultipleTasks(List.of(retrieveTask.getId()));
        }
}
