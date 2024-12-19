import Swal from "sweetalert2";
import { checkedTaskCount } from "./selectors";

let countID = 1;

// Create a task element and task clone
export const createTaskElement = (task) => {
    const taskTemplateClone = taskTemplate.content.cloneNode(true);
    const taskGroupContainer = taskTemplateClone.querySelector(".task-list");
    console.log(taskGroupContainer);
    const delTaskButton = taskTemplateClone.querySelector("#delTaskButton");

    taskGroupContainer.id = "task-" + countID;
    // Assign unique ID for the checkbox
    const taskCheck = taskTemplateClone.querySelector(".task-done-check");
    taskCheck.id = "check-" + countID;
    const taskText = taskTemplateClone.querySelector(".task-text");
    taskText.textContent = task;

    // Add event listener for each checkbox (no delegation)
    taskCheck.addEventListener("click", () => {
        handleCheckboxClick(taskCheck, taskText);
        updateCheckedTaskCount();
    });

    // Delete Task
    delTaskButton.addEventListener("click", () => {
        handleDeleteButton(taskGroupContainer);
    });
    countID++;
    return taskTemplateClone;
};

// Add a new task
export const addNewTask = (text) => {
    if (text.trim() !== "") {
        const newTask = createTaskElement(text);
        taskGroup.appendChild(newTask);
        taskInput.value = null;
        updateTaskTotalCount();
        updateCheckedTaskCount();
    }
};

// Update task total count
export const updateTaskTotalCount = () => {
    const taskLists = document.querySelectorAll(".task-list");
    totalTaskCount.textContent = taskLists.length;
};

// Update checked task count
export const updateCheckedTaskCount = () => {
    const checkedTasks = document.querySelectorAll(".task-done-check:checked");
    checkedTaskCount.textContent = checkedTasks.length;
};

// Delete task
export const handleDeleteButton = (taskList) => {
    console.log("delete");
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            taskList.classList.add("animate__animated", "animate__hinge");
            taskList.addEventListener("animationend", () => {
                taskList.remove();
                updateTaskTotalCount();
                updateCheckedTaskCount();
            });
        }
    });
};

// Handle Checkbox Click
export const handleCheckboxClick = (checkbox, taskText) => {
    // const delAllTasksButton = document.querySelector("#delTaskButton");
    const displayIcons = checkbox
        .closest(".task-list")
        .querySelector(".display-icons");

    if (checkbox.checked) {
        checkbox.classList.add("bg-green-500", "border-2", "border-white");
        checkbox.classList.remove("bg-white", "border-green");
        taskText.classList.add("line-through");
        displayIcons.classList.add("opacity-100");
        setTimeout(() => {
            displayIcons.classList.remove("hidden");
        }, 200);
    } else {
        checkbox.classList.remove("bg-green-500", "border-white");
        checkbox.classList.add("bg-white", "border-green");
        taskText.classList.remove("line-through");
        setTimeout(() => {
            displayIcons.classList.add("hidden", "opacity-0");
        }, 200);
    }
};
