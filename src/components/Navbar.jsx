import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { APP_CONFIG } from "../constants/appConfig";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <span className="text-2xl">♻️</span>
          <span className="text-xl font-bold text-green-600">
            {APP_CONFIG.appName}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to={ROUTES.HOME}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive(ROUTES.HOME)
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to={ROUTES.LOG_WASTE}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive(ROUTES.LOG_WASTE)
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            + Log Waste
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;