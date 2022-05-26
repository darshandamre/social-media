import { Route, Routes } from "react-router-dom";
import { AlertContainer } from "./features/alert";
import { AuthPagesLayout, Login, Register, RequireAuth } from "./features/auth";
import { BookmarksPage } from "./features/bookmarks";
import { Layout } from "./features/common";
import { ExploreFeed, UserFeed } from "./features/feed";
import { LikesPage } from "./features/likes";
import { Profile } from "./features/user";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route index element={<UserFeed />} />
            <Route path="explore" element={<ExploreFeed />} />
            <Route path="likes" element={<LikesPage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="u/:username" element={<Profile />} />
          </Route>
        </Route>

        <Route path="/" element={<AuthPagesLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>

      <AlertContainer />
    </>
  );
};

export { App };
