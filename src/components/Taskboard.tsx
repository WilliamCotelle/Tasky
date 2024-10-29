import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Task } from "../types"; // Le type Task est importé pour gérer les données des tâches
import { Plus, Check, Edit3, X } from "lucide-react"; // Icônes utilisées dans l'interface pour l'ajout, l'édition, la validation et la suppression

// Définition des props que le composant Taskboard attend, incluant les fonctions de gestion des tâches
interface TaskboardProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  removeTask: (id: number) => void;
}

// Fonction principale pour le tableau de bord des tâches
export default function Taskboard({
  tasks,
  addTask,
  updateTask,
  removeTask,
}: TaskboardProps) {
  // État pour gérer le contenu de la nouvelle tâche à ajouter
  const [newTask, setNewTask] = useState("");
  // État pour gérer la tâche actuellement en cours d'édition
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  // État pour organiser les tâches par statut
  const [columns, setColumns] = useState({
    todo: tasks.filter((task) => task.status === "todo"),
    inProgress: tasks.filter((task) => task.status === "inProgress"),
    done: tasks.filter((task) => task.status === "done"),
  });

  // Fonction pour ajouter une nouvelle tâche
  const handleAddTask = () => {
    if (newTask.trim()) {
      // On vérifie si le texte n'est pas vide avant d'ajouter
      const task = {
        id: Date.now(), // ID unique basé sur le timestamp
        title: newTask,
        status: "todo", // Par défaut, une nouvelle tâche est en statut "à faire"
        priority: "medium",
      };

      // On ajoute la nouvelle tâche dans la colonne "todo" et on met à jour l'état
      setColumns((prevColumns) => ({
        ...prevColumns,
        todo: [...prevColumns.todo, task],
      }));

      addTask(task); // Ajout global de la tâche avec addTask prop
      setNewTask(""); // Réinitialisation de l'input de la nouvelle tâche
    }
  };

  // Fonction pour mettre à jour la tâche en cours d'édition
  const handleUpdateTask = () => {
    if (editingTask) {
      updateTask(editingTask); // Appel pour sauvegarder les modifications
      setEditingTask(null); // On arrête l'édition
    }
  };

  // Colonnes de statut avec étiquettes pour chaque section de tâches
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

      {/* Section pour ajouter une nouvelle tâche avec un input et un bouton */}
      <div className="flex items-center mb-8 space-x-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // Mise à jour de newTask à chaque saisie
          placeholder="Nouvelle tâche..."
          className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <button
          onClick={handleAddTask} // Bouton pour lancer l'ajout de tâche
          className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-1"
        >
          <Plus size={20} />
          <span>Ajouter</span>
        </button>
      </div>

      {/* Boucle pour afficher chaque colonne de statut avec les tâches correspondantes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusColumns.map(({ key, label }) => (
          <div
            key={key}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {label}
            </h3>
            <ReactSortable
              list={columns[key]}
              setList={(newList) =>
                setColumns((prev) => ({
                  ...prev,
                  [key]: newList,
                }))
              }
              group={{ name: "tasks", pull: true, put: true }} // Permet le drag-and-drop
              animation={150}
              className="space-y-4"
            >
              {columns[key].map((task) => (
                <div
                  key={task.id}
                  className="relative p-4 rounded-xl shadow-lg flex flex-col border border-coolGray-200 transition-all duration-300 bg-white"
                >
                  {/* Boutons d'action (éditer et supprimer) en haut à droite avec des infobulles */}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {/* Bouton pour éditer la tâche */}
                    <div className="group relative">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none transition-all"
                      >
                        <Edit3 size={12} color="white" />
                      </button>
                      {/* Infobulle pour le bouton Éditer */}
                      <span className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Éditer
                      </span>
                    </div>
                    {/* Bouton pour supprimer la tâche */}
                    <div className="group relative">
                      <button
                        onClick={() => removeTask(task.id)}
                        className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 focus:outline-none transition-all"
                      >
                        <X size={12} color="white" />
                      </button>
                      {/* Infobulle pour le bouton Supprimer */}
                      <span className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Supprimer
                      </span>
                    </div>
                  </div>

                  {/* Affichage ou édition du texte de la tâche */}
                  <div className="flex-1 mt-6">
                    {" "}
                    {/* Espace ajouté entre boutons et texte */}
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
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none text-gray-700"
                      />
                    ) : (
                      <p className="text-gray-900 font-semibold text-lg">
                        {task.title} {/* Affichage du titre de la tâche */}
                      </p>
                    )}
                  </div>

                  {/* Bouton pour valider la modification en cours */}
                  {editingTask?.id === task.id && (
                    <button
                      onClick={handleUpdateTask}
                      className="text-blue-600 hover:text-blue-800 mt-2"
                    >
                      <Check size={20} />
                    </button>
                  )}
                </div>
              ))}
            </ReactSortable>
          </div>
        ))}
      </div>
    </div>
  );
}
