import React from "react";

const ProfileCard: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
      <img
        src="https://via.placeholder.com/100" // Remplacer par l'image de profil réelle
        alt="Profil"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold">Mon Profil</h2>
      <p className="text-gray-600 mb-4">Personnaliser mon profil</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={() => {
          // Redirige vers la personnalisation du profil
          console.log("Redirection vers la personnalisation du profil");
        }}
      >
        Modifier Profil
      </button>
    </div>
  );
};

export default ProfileCard;
