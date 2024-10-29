import React from "react";
import Sidebar from "../components/ui/Sidebar";
import Calendar from "../components/Calendar";
import Taskboard from "../components/Taskboard";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-100 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-8">Bienvenue sur le Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Calendar />
          <Taskboard
            tasks={[]}
            addTask={(task) => {}}
            updateTask={(task) => {}}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
