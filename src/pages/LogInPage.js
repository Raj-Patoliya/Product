import React, { useContext, useRef, useState } from "react";
import "./LogInPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../store/user-context";
function LoginPage() {
  const navigate = useNavigate();
  const userCtx = useContext(UserAuthContext);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  let hasError = false;
  const submitHandler = async (event) => {
    console.log("hello");
    event.preventDefault();
    if (emailRef.current.value.length === 0) {
      hasError = true;
      setEmailError("Please Enter Valid Email Address");
    }
    if (passwordRef.current.value.length === 0) {
      hasError = true;
      setPasswordError("Please Enter Password");
    }
    if (!hasError) {
      const response = await userCtx.login(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (response) {
        navigate("/profile", { replace: true });
      }
    }
  };
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={submitHandler}>
              <div className="form-outline mb-4">
                <h1>Sign In</h1>
              </div>
              <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-3 mb-0"></p>
              </div>

              <div className="form-outline mb-4">
                <input
                  ref={emailRef}
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                />
                {emailError && <p style={{ color: "red" }}>{emailError}</p>}
              </div>

              <div className="form-outline mb-3">
                <input
                  ref={passwordRef}
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? &nbsp;&nbsp;
                  <NavLink to="/register" className="link-primary">
                    Register
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
