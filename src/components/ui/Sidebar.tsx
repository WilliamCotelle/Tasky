import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IconHome,
  IconCalendar,
  IconListCheck,
  IconSettings,
} from "@tabler/icons-react";
import TaskyLogo from "../../assets/Tasky2.png";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon,
  label,
  isOpen,
}) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
  >
    {icon}
    {isOpen && (
      <span className="text-gray-700 dark:text-gray-200 text-sm">{label}</span>
    )}
  </Link>
);

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.aside
      className="bg-gray-800 text-white flex flex-col items-start p-4 shadow-lg z-30"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      animate={{ width: open ? 240 : 80 }} // taille quand ouverte et fermée
      transition={{ duration: 0.3 }}
    >
      {/* Logo de la Sidebar */}
      <div className="flex items-center justify-center mb-8">
        <img
          src={TaskyLogo}
          alt="Tasky Logo"
          className={`rounded-full transition-all duration-300 ${
            open ? "h-20 w-20" : "h-20 w-20"
          }`}
        />
      </div>

      {/* Liens de la Sidebar */}
      <SidebarLink
        to="/dashboard"
        icon={<IconHome size={20} />}
        label="Dashboard"
        isOpen={open}
      />
      <SidebarLink
        to="/calendar"
        icon={<IconCalendar size={20} />}
        label="Calendar"
        isOpen={open}
      />
      <SidebarLink
        to="/tasks"
        icon={<IconListCheck size={20} />}
        label="Tasks"
        isOpen={open}
      />
      <SidebarLink
        to="/settings"
        icon={<IconSettings size={20} />}
        label="Settings"
        isOpen={open}
      />
    </motion.aside>
  );
};

export default Sidebar;
