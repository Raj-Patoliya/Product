import { useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import ProfilePic from "../../assets/profilePic.jpg";
import { UserAuthContext } from "../../store/user-context";
function ProfilePage() {
  const userCtx = useContext(UserAuthContext);
  const navigate = useNavigate();
  if (!userCtx.isLoggedIn) {
    console.log(userCtx.isLoggedIn);
    navigate("")
  }
  return (
    <div className="container col-3">
      <div className="card" style={{ width: "25rem" }}>
        <img
          src={ProfilePic}
          className="card-img-top"
          alt="..."
          style={{ width: "25rem", height: "25rem" }}
        />
        <div className="card-body">
          <h5 className="card-title">{userCtx.user.displayName}</h5>

          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
