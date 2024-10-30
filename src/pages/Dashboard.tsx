import React from "react";
import Sidebar from "../components/ui/Sidebar";
import Calendar from "../components/Calendar";
import ProductivityTimer from "../components/ProductivityTimer";
import Taskboard from "../components/Taskboard";
import QuickLinksCard from "../components/QuickLinksCard";
import ProfileCard from "../components/ProfileCard";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-100 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-8">Bienvenue sur le Dashboard</h1>

        <div
          className="grid grid-cols-4 grid-rows-[2fr,1fr,1fr] gap-5"
          style={{ width: "70em" }}
        >
          {/* Calendar - En haut à gauche, prend 2 colonnes */}
          <div className="col-span-2 row-span-1">
            <Calendar />
          </div>

          {/* Timer - En dessous du calendrier, prend 1 colonne */}
          <div className="col-span-1 row-span-1">
            <ProductivityTimer />
          </div>

          {/* Profile Card - Sous le Timer, prend 1 colonne */}
          <div className="col-span-1 row-span-1">
            <ProfileCard />
          </div>

          {/* Quick Links Card (Favoris) - À droite du Timer et du Profil, prend 1 colonne et 2 rangées */}
          <div className="col-span-1 row-span-2">
            <QuickLinksCard favorites={[]} openFavoritesPage={() => {}} />
          </div>

          {/* Futur - Espace en dessous du calendrier à droite du Profil */}
          <div className="col-span-1 row-span-1">
            <div className="bg-gray-200 h-full rounded-lg shadow-md flex items-center justify-center">
              Futur
            </div>
          </div>

          {/* Taskboard - Placé en bas, prend 2 colonnes et peut s'étendre */}
          <div className="col-span-4 row-span-1">
            <Taskboard
              tasks={[]}
              addTask={(task) => {}}
              updateTask={(task) => {}}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
