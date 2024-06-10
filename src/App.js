import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Default from "./components/Default/Default";
import { Fragment, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  // useEffect(() => {
  //   fetchAPI();
  // }, []);
  const fetchAPI = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all`
    );
    return res.data;
  };
  const query = useQuery({ queryKey: ["todos"], queryFn: fetchAPI });
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
