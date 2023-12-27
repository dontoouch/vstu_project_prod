import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import React from "react";

function MainHeader(s) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const Logout = () => {
    localStorage.removeItem("user");
    signOut(() => navigate("/", { replace: true }));
  };

  return (
    <header className="main_header">
      <h1 className="journal_name">
        <div
          className="j_name"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Заполнялка диплома УО «ВГТУ»
        </div>
      </h1>

      {user && (
        <div className="right_block">
          <div className="block_of_name">
            <label className="name_of_teacher">{user.fio}</label>
          </div>
          <div>
            <input
              type="submit"
              className="btn_exit"
              value="Выйти"
              onClick={Logout}
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default MainHeader;
