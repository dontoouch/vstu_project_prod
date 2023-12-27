import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
// import { useSelector } from 'react-redux';

export default function RequireAuth({ children, role }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    let stateRole = null;
    if (localStorage.getItem("user") !== null) {
      JSON.parse(localStorage.getItem("user")).roles.forEach((el) => {
        stateRole = stateRole + role.includes(el);
      });
    }
    if (user) {
      if (stateRole === 0) {
        navigate("/teacher_profile");
      }
    }
  });
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // if (user) {
  //   user.roles.forEach((element) => {
  //     if (!role.some(() => checkRole(element, role))) {
  //       navigate("/teacher_profile");
  //       console.log(role.indexOf(element), element);
  //     }
  //   });
  // }

  return children;
}
