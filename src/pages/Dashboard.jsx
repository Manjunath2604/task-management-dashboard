import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { TaskContext } from "../context/TaskContext";

function Dashboard() {
  const { tasks, setTasks } = useContext(TaskContext);

  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between mb-3">
        <h2>Task Dashboard ({tasks.length})</h2>

        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      {/* Statistics */}
      <div className="row mb-3">

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Total Tasks</h5>
            <h3>{tasks.length}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Completed</h5>
            <h3>
              {
                tasks.filter(
                  (task) => task.status === "Completed"
                ).length
              }
            </h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Pending</h5>
            <h3>
              {
                tasks.filter(
                  (task) => task.status === "Pending"
                ).length
              }
            </h3>
          </div>
        </div>

      </div>

      {/* Add Task */}
      <input
        className="form-control mb-2"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter New Task"
      />

      <button
        className="btn btn-primary mb-3"
        onClick={addTask}
      >
        Add Task
      </button>

      {/* Search */}
      <input
        className="form-control mb-3"
        type="text"
        placeholder="Search Task"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter */}
      <select
        className="form-select mb-3"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All Tasks</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      {/* No Task Found */}
      {tasks
        .filter((task) =>
          task.title
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .filter((task) =>
          filter === "All"
            ? true
            : task.status === filter
        ).length === 0 ? (

        <div className="alert alert-info">
          No Tasks Found
        </div>

      ) : (

        tasks
          .filter((task) =>
            task.title
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .filter((task) =>
            filter === "All"
              ? true
              : task.status === filter
          )
          .map((task) => (

            <div
              key={task.id}
              className="card p-3 mb-2"
            >

              <h4>{task.title}</h4>

              <p>
                Status:

                <span
                  className={
                    task.status === "Completed"
                      ? "badge bg-success ms-2"
                      : "badge bg-warning text-dark ms-2"
                  }
                >
                  {task.status}
                </span>
              </p>

              <p className="text-muted">
                Created: {task.createdAt}
              </p>

              <div>

                <button
                  className="btn btn-warning me-2"
                  onClick={() => {

                    const updatedTasks =
                      tasks.map((t) =>
                        t.id === task.id
                          ? {
                              ...t,
                              status:
                                t.status === "Pending"
                                  ? "Completed"
                                  : "Pending",
                            }
                          : t
                      );

                    setTasks(updatedTasks);
                  }}
                >
                  Change Status
                </button>

                <button
                  className="btn btn-info me-2"
                  onClick={() => {

                    const updatedTitle = prompt(
                      "Edit Task",
                      task.title
                    );

                    if (
                      updatedTitle === null ||
                      updatedTitle.trim() === ""
                    ) {
                      return;
                    }

                    const updatedTasks =
                      tasks.map((t) =>
                        t.id === task.id
                          ? {
                              ...t,
                              title: updatedTitle,
                            }
                          : t
                      );

                    setTasks(updatedTasks);

                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => {

                    const confirmDelete =
                      window.confirm(
                        "Are you sure you want to delete this task?"
                      );

                    if (!confirmDelete) return;

                    setTasks(
                      tasks.filter(
                        (t) => t.id !== task.id
                      )
                    );

                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          ))
      )}

      <Footer />

    </div>
  );
}

export default Dashboard;