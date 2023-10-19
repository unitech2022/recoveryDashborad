import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import validator from "validator";
import axios from "axios";
import { baseurl, successNotify, errorNotifyMessage } from "../../constants";

export default function CreateSetting() {

  var [name, setName] = useState("");
  var [value, setValue] = useState("");
  const [loader, showLoader, hideLoader] = useLoader();

  const navigateTo = useNavigate();


  


  useEffect(() => {
    // if (location.state != null) {
    //  setName(row.value);
    // }
  }, []);

  const postForm = async () => {
    showLoader();
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("value", value );

      const response = await fetch(baseurl + "setting/add-setting", {
        method: "POST",
        //   headers: {
        //     Authorization: "Bearer " + localStorage.getItem("token"),
        //   },
        body: formdata,
      });

      hideLoader();
      successNotify();

      const json = await response.json();
      console.log(json);
      navigateTo("/admin/Sittings");
    } catch (error) {
      hideLoader();
      console.error(error + "kjjjjjjj");
    }
  };

  return (
    <div>
      {loader}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">الاعدادات</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <a href="javascript:;">
                  <i className="bx bx-home-alt" />
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                تعدبل
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/*end breadcrumb*/}
      <hr />
      <div className="col-xl-12 mx-auto">
        <div className="card">
          <div className="card-body">
            <div className="border p-3 rounded">
              <div asp-validation-summary="ModelOnly" className="text-danger" />
              <div className="row g-3">
                {/* title */}
                <div className="col-6">
                  <label className="form-label">الإسم </label>
                  <input
                   
                   onChange={(e) =>{
                    setName(e.target.value)
                  }}
                    autoComplete="off"
                    asp-for="Title"
                    type="text"
                    required
                    className="form-control"
                  />
                  <span asp-validation-for="Name" className="text-danger" />
                </div>
                <div className="col-6">
                  <label className="form-label">القيمة </label>
                  <input
                   onChange={(e) =>{
                    setValue(e.target.value)
                  }}
                  required
                    autoComplete="off"
                    asp-for="Title"
                    type="text"
                    className="form-control"
                  />
                  <span asp-validation-for="Name" className="text-danger" />
                </div>
                <div onClick={postForm} className="col-12">
                  <div className="d-grid">
                    <input
                      type="submit"
                      value="حفظ"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
