import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import LogWaste from "./pages/LogWaste";
import NotFound from "./pages/NotFound";

import { ROUTES } from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOG_WASTE} element={<LogWaste />} />
        </Route>

        <Route
          path={ROUTES.NOT_FOUND}
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;