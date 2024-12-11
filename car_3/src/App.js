import { Link, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import User from "./User";
import Home from "./Home";
import Error from "./Error";
import Bulls from "./Bulls";
import Lakers from "./Lakers";
import Teams from "./Teams";
import ProtectedRoute from "./ProtectRoute";
import NotAuthorized from "./NotAuthorized";

import { useUser } from "@clerk/clerk-react";

function App() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">admin</Link>
          </li>
          <li>
            <Link to="/user">user</Link>
          </li>
          <li>
            <Link to="/teams">teams</Link>
          </li>
        </ul>
      </nav>
      <Login />
      <Routes>
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        {/* //nested */}
        <Route path="/teams">
          <Route index element={<Teams />} />
          <Route path="bulls" element={<Bulls />} />
          <Route path="lakers" element={<Lakers />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin" redirectTo="/not-authorized">
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
