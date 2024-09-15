import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { removeLogAction } from "../store/userReducer";
import { logOut } from "../server";
export const Nav = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const deleteLogUser = () => {
    dispatch(removeLogAction({}));
  };

  useEffect(() => {
    if (user.id !== undefined) setIsLoggedIn(true);
  }, [user]);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <h1 className="navbar-brand">Top navbar</h1>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todos">
                ToDos
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {isLoggedIn ? (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  onClick={() => {
                    deleteLogUser();
                    logOut().then(() => setIsLoggedIn(false));
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registration">
                  Registration
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
