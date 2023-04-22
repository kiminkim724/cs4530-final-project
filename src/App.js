
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/navigation";
import { Routes, Route } from "react-router";
import Home from "./screens/home-screen";
import AdminScreen from "./screens/admin-screen";
import LoginScreen from "./screens/login-screen";
import ProfileScreen from "./screens/profile-screen";
import store from "./reducers/store";
import SpotifySearchScreen from "./screens/search-screen"
import SpotifyAlbumScreen from "./screens/spotify/album-screen";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"
import CurrentUserContext from "./reducers/current-user-context";
import "./App.css";


function App() {
  return (
    <div className="container-fluid">
      <Provider store={store}>
        <CurrentUserContext>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route
                path="/spotify/album/:id"
                element={<SpotifyAlbumScreen />}
              />
              <Route path="/search" element={<SpotifySearchScreen />} />
              <Route
                path="/search/:searchType/:searchTerm"
                element={<SpotifySearchScreen />}
              />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/profile/:username" element={<ProfileScreen />} />
              <Route path="/admin" element={<AdminScreen />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </CurrentUserContext>
      </Provider>
    </div>
  );
}

export default App;