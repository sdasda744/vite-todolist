import Swal from "sweetalert2";
import {
    addNewTask,
    handleCheckboxClick,
    updateCheckedTaskCount,
    updateTaskTotalCount,
} from "./list";

export const addTaskButtonHandler = () => {
    addNewTask(taskInput.value);
};

export const addTaskInputHandler = (event) => {
    if (event.key === "Enter") addNewTask(taskInput.value);
};

// Delete all tasks
export const delAllTasksHandler = () => {
    const taskLists = document.querySelectorAll(".task-list");
    Swal.fire({
        title: "Are you sure want to remove all tasks?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            taskLists.forEach((taskList, index) => {
                // Add animation class with a delay using setTimeout
                setTimeout(() => {
                    taskList.classList.add(
                        "animate__animated",
                        "animate__zoomOutRight"
                    );

                    // Listen for the animation end before removing the element
                    taskList.addEventListener("animationend", () => {
                        taskList.remove();
                        updateTaskTotalCount();
                        updateCheckedTaskCount();
                    });
                }, index * 300); // Delay increases by 300ms for each task
            });
        }
    });
};

// Select all tasks
export const selAllTasksHandler = () => {
    const taskLists = document.querySelectorAll(".task-list");
    const allChecked = Array.from(taskLists).every((taskList) => {
        return taskList.querySelector(".task-done-check").checked;
    });

    taskLists.forEach((taskList) => {
        const taskCheck = taskList.querySelector(".task-done-check");
        const taskText = taskList.querySelector(".task-text");

        if (allChecked) {
            // Deselect all if everything was checked
            taskCheck.checked = false;
        } else {
            // Select all if anything was unchecked
            taskCheck.checked = true;
        }

        handleCheckboxClick(taskCheck, taskText);
    });

    updateCheckedTaskCount();
};
