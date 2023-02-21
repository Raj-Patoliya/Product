import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [nameError, setnameError] = useState(null);
  const [emailError, setemailError] = useState(null);
  const [passwordError, setpasswordError] = useState(null);
  const [confirmpasswordError, setconfirmpasswordError] = useState(null);
  const [error, seterror] = useState({
    nameError: null,
    emailError: null,
    passwordError: null,
    confirmpasswordError: null,
  });
  let hasError = false;
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const submitHandler = async (event) => {
    setnameError(null);
    setemailError(null);
    setpasswordError(null);
    setconfirmpasswordError(null);
    event.preventDefault();
    console.log("hello");
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmpassword = confirmpasswordRef.current.value;
    if (name.length === 0) {
      hasError = true;
      setnameError("Please Enter Valid Name");
    }
    if (email.length === 0 && !email.includes("@")) {
      hasError = true;
      setemailError("Please Enter Valid Email");
    }
    if (password.length < 8) {
      hasError = true;
      setpasswordError("Password must be Alpha numaric");
    }
    if (confirmpassword.length === 0 || confirmpassword !== password) {
      hasError = true;
      setconfirmpasswordError("Both Password are not matched");
    }
    if (!hasError) {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaxn-rSpnjSy8NudFDLXnQPxK5PsB5cBg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName: name,
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("data inserted successfully");
        navigate("/login", { replace: true });
      }
    }
  };
  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt={"Sample"}
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={submitHandler}>
                <div className="form-outline mb-4">
                  <h1>Sign-up</h1>
                </div>
                <div class="divider d-flex align-items-center my-4">
                  <p class="text-center fw-bold mx-3 mb-0"></p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    ref={nameRef}
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Full Name"
                  />
                  {nameError && <p style={{ color: "red" }}>{nameError}</p>}
                </div>
                <div className="form-outline mb-4">
                  <input
                    ref={emailRef}
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="E-mail address"
                  />
                  {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                </div>

                <div className="form-outline mb-3">
                  <input
                    ref={passwordRef}
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Create password"
                  />
                  {passwordError && (
                    <p style={{ color: "red" }}>{passwordError}</p>
                  )}
                </div>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    ref={confirmpasswordRef}
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Confirm password"
                  />
                  {confirmpasswordError && (
                    <p style={{ color: "red" }}>{confirmpasswordError}</p>
                  )}
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Register
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account? &nbsp;&nbsp;
                    <NavLink to="/login" className="link-primary">
                      Login
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
