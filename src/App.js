import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Default from "./components/Default/Default";
import { Fragment, useEffect, useState } from "react";
import { isJsonString } from "./utils.js";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from "./redux/slices/userSlice.js";
import Loading from "./components/Loading/Loading.jsx";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setIsLoading(true);
    const { decoded, storageData } = handleDecoded();
    if (decoded?.payload?.id) {
      handleGetDetailsUser(decoded?.payload?.id, storageData);
    }
    setIsLoading(false);
  }, []);

  const handleDecoded = () => {
    let storageData =
      user?.access_token || localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };
  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem("refresh_token");
    const refresh_token = JSON.parse(storageRefreshToken);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res.data, access_token: token, refresh_token }));
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentItem = new Date();
      const { decoded } = handleDecoded();
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storageRefreshToken);
      const decodeRefreshToken = jwtDecode(refreshToken);
      if (decoded?.exp < currentItem.getTime() / 1000) {
        if (decodeRefreshToken?.exp > currentItem.getTime() / 1000) {
          const data = await UserService.refreshToken();
          config.headers["token"] = `Bearer ${data?.access_token}`;
        } else {
          dispatch(resetUser());
        }
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  return (
    <Loading spinning={isLoading}>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Layout = route.isShowHeader ? Default : Fragment;
            const isCheckAuth = !route.isPrivate || user.isAdmin;
            return (
              <Route
                key={route.path}
                path={(isCheckAuth && route.path) || "/fsdfsdfsdf"}
                element={<Layout>{route.page}</Layout>}
              />
            );
          })}
        </Routes>
      </Router>
    </Loading>
  );
}

export default App;
