import React, { useState } from "react";
import { Task } from "../types";
import { Plus, Edit2, Trash2, Check } from "lucide-react";

interface TaskboardProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
}

const Taskboard: React.FC<TaskboardProps> = ({
  tasks,
  addTask,
  updateTask,
}) => {
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask({
        id: Date.now(),
        title: newTask,
        status: "todo",
        priority: "medium",
      });
      setNewTask("");
    }
  };

  const handleUpdateTask = () => {
    if (editingTask) {
      updateTask(editingTask);
      setEditingTask(null);
    }
  };

  const statusColumns = [
    { key: "todo", label: "À faire" },
    { key: "inProgress", label: "En cours" },
    { key: "done", label: "Terminé" },
  ];

  return (
    <div className="bg-gray-50 p-8 rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 tracking-wide">
        Mes Tâches
      </h2>

      {/* Section d'ajout de tâches */}
      <div className="flex items-center mb-8 space-x-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nouvelle tâche..."
          className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-1"
        >
          <Plus size={20} />
          <span>Ajouter</span>
        </button>
      </div>

      {/* Colonnes de tâches */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusColumns.map(({ key, label }) => (
          <div
            key={key}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {label}
            </h3>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === key)
                .map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl shadow-sm flex items-start justify-between border-l-4 transition-all hover:shadow-md ${
                      task.priority === "high"
                        ? "border-red-500 bg-red-50"
                        : task.priority === "medium"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-green-500 bg-green-50"
                    }`}
                  >
                    <div className="flex-1">
                      {editingTask?.id === task.id ? (
                        <input
                          type="text"
                          value={editingTask.title}
                          onChange={(e) =>
                            setEditingTask({
                              ...editingTask,
                              title: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 mb-2 border border-gray-300 rounded-lg text-gray-700"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {task.title}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {editingTask?.id === task.id ? (
                        <button
                          onClick={handleUpdateTask}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Check size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingTask(task)}
                          className="text-gray-500 hover:text-gray-600"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => updateTask({ ...task, status: "done" })}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Taskboard;
