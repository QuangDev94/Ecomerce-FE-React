import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Default from "./components/Default/Default";
import { Fragment, useEffect } from "react";
import { isJsonString } from "./utils.js";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slices/userSlice.js";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { decoded, storageData } = handleDecoded();
    if (decoded?.payload?.id) {
      handleGetDetailsUser(decoded?.payload?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    console.log(decoded);
    return { decoded, storageData };
  };
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res.data, access_token: token }));
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentItem = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentItem.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );
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
