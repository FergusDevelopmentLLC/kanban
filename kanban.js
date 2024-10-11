document.addEventListener("DOMContentLoaded", function () {
  // Sample JSON data for the board
  const data = {
    tasks: [
      { id: 1, title: "Research new data visualization tools", status: "backlog", type: "unknown" },
      { id: 2, title: "Investigate customer pain points", status: "backlog", type: "unknown" },
      { id: 3, title: "Explore AI/ML integration", status: "backlog", type: "unknown" },
      { id: 4, title: "Evaluate cloud service providers", status: "backlog", type: "unknown" },
      { id: 5, title: "Assess alternative authentication methods", status: "backlog", type: "unknown" },
      { id: 6, title: "Set up load balancer for production servers", status: "doing", type: "infrastructure" },
      { id: 7, title: "Configure automated backups for critical databases", status: "doing", type: "infrastructure" },
      { id: 8, title: "Implement server-side caching", status: "doing", type: "infrastructure" },
      { id: 9, title: "Optimize server monitoring system", status: "review", type: "infrastructure" },
      { id: 10, title: "Update SSL certificates across all environments", status: "done", type: "infrastructure" },
      { id: 11, title: "Ingest monthly sales data from external API", status: "doing", type: "database" },
      { id: 12, title: "Design and populate customer segmentation tables", status: "doing", type: "database" },
      { id: 13, title: "Optimize query performance for reporting views", status: "review", type: "database" },
      { id: 14, title: "Write a stored procedure for handling bulk updates", status: "review", type: "database" },
      { id: 15, title: "Create a trigger for real-time order tracking", status: "done", type: "database" },
      { id: 16, title: "Build dashboard for displaying real-time sales data", status: "doing", type: "frontend" },
      { id: 17, title: "Implement search functionality for the user directory", status: "doing", type: "frontend" },
      { id: 18, title: "Integrate interactive data charts", status: "review", type: "frontend" },
      { id: 19, title: "Enhance mobile responsiveness of user profile pages", status: "review", type: "frontend" },
      { id: 20, title: "Refactor front-end code for improved performance", status: "done", type: "frontend" }
    ]
  };

  // Function to render tasks into columns
  function renderTasks() {
    const backlogColumn = document.getElementById("backlog-tasks");
    const doingColumn = document.getElementById("doing-tasks");
    const reviewColumn = document.getElementById("review-tasks");
    const doneColumn = document.getElementById("done-tasks");

    // Clear existing tasks
    backlogColumn.innerHTML = "";
    doingColumn.innerHTML = "";
    reviewColumn.innerHTML = "";
    doneColumn.innerHTML = "";

    // Loop through tasks and place them in the correct column
    data.tasks.forEach(task => {
      const taskElement = document.createElement("li");
      taskElement.classList.add("kanban-task");
      taskElement.dataset.taskId = task.id; // Store the task ID for identification

      // Determine label and color class based on task type
      let circleColorClass = "";
      let typeLabel = "";
      if (task.type === "frontend") {
        circleColorClass = "frontend";
        typeLabel = "FE";
      } else if (task.type === "infrastructure") {
        circleColorClass = "infrastructure";
        typeLabel = "IN";
      } else if (task.type === "database") {
        circleColorClass = "database";
        typeLabel = "DB";
      } else if (task.type === "unknown") {
        circleColorClass = "unknown";
        typeLabel = "UN";
      }

      // Adding task content with colored circle and label inside
      taskElement.innerHTML = `
        <p>${task.title}</p>
        <div class="circle ${circleColorClass}">${typeLabel}</div>
      `;

      // Append the task to the appropriate column based on status
      if (task.status === "backlog") {
        backlogColumn.appendChild(taskElement);
      } else if (task.status === "doing") {
        doingColumn.appendChild(taskElement);
      } else if (task.status === "review") {
        reviewColumn.appendChild(taskElement);
      } else if (task.status === "done") {
        doneColumn.appendChild(taskElement);
      }
    });

    // Initialize SortableJS for all columns, allowing cross-column dragging
    initializeSortable([backlogColumn, doingColumn, reviewColumn, doneColumn]);
  }

  // Initialize SortableJS on columns, allowing cross-column drag-and-drop
  function initializeSortable(columns) {
    columns.forEach(column => {
      Sortable.create(column, {
        group: 'kanban', // Allows moving tasks between columns
        animation: 150, // Animation for smooth dragging
        ghostClass: "sortable-ghost", // Class applied to the element being dragged
        onEnd: function (evt) {
          const movedTaskId = evt.item.dataset.taskId;
          const newColumn = evt.to.id; // The new column's ID

          // Update task status based on new column
          updateTaskStatus(movedTaskId, newColumn);
        }
      });
    });
  }

  // Function to update task status when moved between columns
  function updateTaskStatus(taskId, newColumnId) {
    const task = data.tasks.find(t => t.id == taskId);
    switch (newColumnId) {
      case 'backlog-tasks':
        task.status = 'backlog';
        break;
      case 'doing-tasks':
        task.status = 'doing';
        break;
      case 'review-tasks':
        task.status = 'review';
        break;
      case 'done-tasks':
        task.status = 'done';
        break;
    }
    console.log(`Task ${taskId} moved to ${newColumnId}`);
  }

  // Render tasks on page load
  renderTasks();
});
