import React from "react";
import { Bookmark, Plus } from "lucide-react"; // Icône pour les favoris et l'ajout

// Types pour les favoris et catégories
interface FavoriteLink {
  id: number;
  title: string;
  url: string;
  category: string;
}

interface QuickLinksCardProps {
  favorites: FavoriteLink[];
  openFavoritesPage: () => void; // Fonction pour rediriger vers la page complète
}

const QuickLinksCard: React.FC<QuickLinksCardProps> = ({
  favorites,
  openFavoritesPage,
}) => {
  // Limite le nombre de favoris affichés par catégorie pour garder le style minimaliste
  const maxLinksToShow = 3;

  // Filtrer les catégories uniques et organiser les favoris par catégorie
  const categories = Array.from(
    new Set(favorites.map((link) => link.category))
  );
  const categorizedLinks = categories.map((category) => ({
    category,
    links: favorites
      .filter((link) => link.category === category)
      .slice(0, maxLinksToShow),
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col items-start space-y-4 w-48">
      <h3 className="text-lg font-semibold text-gray-800">Favoris</h3>

      {/* Liste des favoris par catégorie */}
      <div className="space-y-3 w-full">
        {categorizedLinks.map(({ category, links }) => (
          <div key={category} className="w-full">
            <h4 className="text-sm font-semibold text-gray-500">{category}</h4>
            <ul className="mt-1 space-y-1">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm truncate block"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bouton pour ouvrir la page complète des favoris */}
      <button
        onClick={openFavoritesPage}
        className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors"
      >
        <Plus size={16} className="mr-1" />
        Voir tous les favoris
      </button>
    </div>
  );
};

export default QuickLinksCard;
