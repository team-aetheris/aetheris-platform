import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <span className="text-lg font-bold text-indigo-600">Aetheris</span>
        </div>
        <nav className="p-6">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `block text-sm px-3 py-2 rounded-md ${
                    isActive ? "text-indigo-600 font-medium bg-indigo-50" : "text-gray-600"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shipments"
                className={({ isActive }) =>
                  `block text-sm px-3 py-2 rounded-md ${isActive ? "text-indigo-600 font-medium bg-indigo-50" : "text-gray-600"}`
                }
              >
                Shipments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `block text-sm px-3 py-2 rounded-md ${isActive ? "text-indigo-600 font-medium bg-indigo-50" : "text-gray-600"}`
                }
              >
                Analytics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/alerts"
                className={({ isActive }) =>
                  `block text-sm px-3 py-2 rounded-md ${isActive ? "text-indigo-600 font-medium bg-indigo-50" : "text-gray-600"}`
                }
              >
                Alerts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/copilot"
                className={({ isActive }) =>
                  `block text-sm px-3 py-2 rounded-md ${isActive ? "text-indigo-600 font-medium bg-indigo-50" : "text-gray-600"}`
                }
              >
                Copilot
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <div className="flex-1">
            <div className="text-sm text-gray-600">Top Navbar</div>
          </div>
          <div className="ml-4 text-sm text-gray-500">User</div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
