import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { format, addDays, startOfMonth, endOfMonth } from "date-fns";
import { fr } from "date-fns/locale";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar2() {
  const SLOT_HEIGHT = 64;
  const MAX_HEIGHT = 500;
  const scrollRef = useRef<HTMLDivElement>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Petit déjeuner",
      startTime: 6,
      endTime: 7,
      color: "blue",
      date: format(new Date(), "yyyy-MM-dd"),
    },
  ]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const days = Array.from({ length: endMonth.getDate() }).map((_, index) => {
    const date = addDays(startMonth, index);
    return {
      date: format(date, "yyyy-MM-dd"),
      isToday: date.toDateString() === new Date().toDateString(),
      hasEvent: events.some(
        (event) => event.date === format(date, "yyyy-MM-dd")
      ),
    };
  });

  useEffect(() => {
    if (scrollRef.current) {
      const now = new Date();
      const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
      const totalMinutesInDay = 24 * 60;
      const scrollPosition =
        (currentTimeInMinutes / totalMinutesInDay) * (24 * SLOT_HEIGHT) -
        MAX_HEIGHT / 2;
      scrollRef.current.scrollTop = scrollPosition;
    }
  }, []);

  const openModal = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50 p-8 rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 tracking-wide">
        Mon Calendrier
      </h2>

      {/* Contenu principal du calendrier */}
      <div className="flex-auto overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-7 gap-1 bg-gray-100 p-4 rounded-lg">
          {days.map((day) => (
            <button
              key={day.date}
              onClick={() => openModal(day.date)}
              className={classNames(
                "p-4 bg-white rounded-lg relative hover:bg-gray-100 transition duration-200 ease-in-out",
                day.isToday
                  ? "bg-blue-100 border border-blue-400 font-semibold text-blue-700"
                  : ""
              )}
            >
              <time
                dateTime={day.date}
                className="block text-sm leading-6 text-gray-800"
              >
                {day.date.split("-").pop()}
              </time>
              {day.hasEvent && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-500"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-lg" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white bg-opacity-90 p-6 shadow-2xl backdrop-blur-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {selectedDate &&
                    format(new Date(selectedDate), "d MMMM yyyy", {
                      locale: fr,
                    })}
                </Dialog.Title>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-4">
                    Événements du jour
                  </h4>
                  <ul className="space-y-2">
                    {events
                      .filter((event) => event.date === selectedDate)
                      .map((event) => (
                        <li
                          key={event.id}
                          className="flex items-center p-3 bg-gray-100 rounded-lg shadow-sm border border-gray-300"
                        >
                          <span className="text-blue-600 font-medium">
                            {event.title}
                          </span>
                          <span className="ml-auto text-xs text-gray-500">
                            ({event.startTime}h - {event.endTime}h)
                          </span>
                        </li>
                      ))}
                  </ul>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-gray-600">
                      Ajouter un événement
                    </h4>
                    <input
                      type="text"
                      placeholder="Titre"
                      className="px-4 py-2 mb-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <input
                      type="number"
                      placeholder="Début (0-24)"
                      className="px-4 py-2 mb-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <input
                      type="number"
                      placeholder="Fin (0-24)"
                      className="px-4 py-2 mb-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <button className="mt-4 w-full bg-indigo-600 px-4 py-2 text-white rounded-lg shadow-lg transition duration-200 ease-in-out hover:bg-indigo-500">
                      Ajouter
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
