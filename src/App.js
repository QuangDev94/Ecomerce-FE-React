import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Default from "./components/Default/Default";
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const Layout = route.isShowHeader ? Default : Fragment;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Layout>{route.page}</Layout>}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;