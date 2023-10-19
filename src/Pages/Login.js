import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseurl, errorNotify, successNotify } from "../constants";
import { Toaster } from "react-hot-toast";
import useLoader from "../Components/loader/useLoader";

var userName;
var password;

export default function Login() {
  var [errors, setErrors] = useState();
  const navigateTo = useNavigate()
  const [loader, showLoader, hideLoader] = useLoader(); 

  const login = async () => {
      showLoader()
    const form = new FormData()

    console.log(userName + "  " + password);

    if (!userName) {
      setErrors(
        "اكتب اسم المستخدم",
      );
      return;
    }
    if (!password) {
      setErrors(
        "اكتب كلمة المرور",
      );
      return;
    }

    form.append("userName", userName)
    form.append("password", password)
    try {
      const response = await fetch(baseurl + "admin-login", {

        method: "POST",
        referrerPolicy: "unsafe-url",
        body: form
      });
      const json = await response.json();
      hideLoader()
      // successNotify()

      console.log(json);
      if (json.token) {
        localStorage.setItem("token", json.token)
        localStorage.setItem("id", json.user.id)
        navigateTo("/admin")
      } else {
        setErrors(
          "اسم المستخدم أو كلمة المرور"
        );
      }
      return json;
    } catch (error) {
      hideLoader()

      console.error(error);
      errorNotify()

    }
  };


  return <main className="authentication-content mt-5">
    {loader}

<Toaster
  toastOptions={{
    success: {
      style: {
        background: 'green',
        color:"white",
        width:'300px',
        height:'70px'
      },
    },
    error: {
        style: {
            background: 'red',
            color:"white",
            width:'300px',
            height:'70px'
          },
    },
  }}
/>
    <div className="row">
      <div className="col-12 col-lg-4 mx-auto">
        <div className="card shadow rounded-5 overflow-hidden">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title">تسجيل الدخول</h5>
            <p className="card-text mb-5">لوحة التحكم والإدارة - Recovery Zone</p>
            <div className="login-separater text-center mb-4"> <span> أدخل اسم المستخدم وكلمة المرور</span>
              <hr />
            </div>
            <div className="row g-3 text-start">
              <div className="col-12 ">
                <label htmlFor="inputEmailAddress" className="form-label"> اسم المستخدم</label>
                <div className="ms-auto position-relative">
                  <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                    <i className="bi bi-envelope-fill" /></div>
                  <input onChange={(e) => (e.target.value != undefined ? userName = e.target.value : console.log(""))}
                    type="text" asp-for="UserName" className="form-control ps-5" id="inputEmailAddress" placeholder=" اسم المستخدم" />
                  <span asp-validation-for="UserName" className="text-danger" />
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="inputChoosePassword" className="form-label"> كلمة المرور</label>
                <div className="ms-auto position-relative">
                  <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                    <i className="bi bi-lock-fill" /></div>
                  <input onChange={(e) => (e.target.value != undefined ? password = e.target.value : console.log(""))}
                    asp-for="Password" type="password" className="form-control  ps-5" id="inputChoosePassword" placeholder=" كلمة المرور" />
                  <span asp-validation-for="Password" className="text-danger" />
                </div>
              </div>

              <div className="col-6 text-end">
              </div>


              <div className="col-12">
                <div className="d-grid">

                  <button onClick={login} type="submit" className="btn btn-primary radius-5">تسجيل
                    الدخول</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

}