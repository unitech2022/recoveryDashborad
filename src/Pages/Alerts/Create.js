import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import validator from "validator";
import axios from "axios";
import { baseurl, successNotify, errorNotifyMessage } from "../../constants";

export default function CreateAlert() {

  var [name, setName] = useState("");
  var [value, setValue] = useState("");
  const [loader, showLoader, hideLoader] = useLoader();

  const navigateTo = useNavigate()


  


  useEffect(() => {
    // if (location.state != null) {
    //  setName(row.value);
    // }
  }, []);

  const postForm = async (event) => {
    showLoader();
    try {
      event.preventDefault();
      const formdata = new FormData(event.target);
      formdata.append("topic", "users");
      const response = await fetch(baseurl + "alerts/send-Alert", {
        method: "POST",
        //   headers: {
        //     Authorization: "Bearer " + localStorage.getItem("token"),
        //   },
        body: formdata,
      });
      const json = await response.json();
      hideLoader();
      successNotify();

     
      console.log(json);
      navigateTo("/admin/alerts");
    } catch (error) {
      hideLoader();
      console.error(error + "kjjjjjjj");
    }
  };

  return (
    <div>
    {loader}
  <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
    <div className="breadcrumb-title pe-3">الإشعارات</div>
    <div className="ps-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 p-0">
          <li className="breadcrumb-item">
            <a href="javascript:;">
              <i className="bx bx-home-alt" />
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">إضافة إشعار</li>
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
          <h6 className="mb-0 text-uppercase">معلومات الإشعار</h6>
          <hr />
          <form onSubmit={postForm}>
            <div asp-validation-summary="ModelOnly" className="text-danger" />
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label"> عنوان الإشعار بالعربية</label>
                <input autoComplete="off" name="TitleAr" type="text" className="form-control" />
                <span asp-validation-for="TitleAr" className="text-danger" />
              </div>
              <div className="col-6">
                <label className="form-label"> عنوان الإشعار بالإنجليزية</label>
                <input autoComplete="off" name="TitleEng" type="text" className="form-control" />
                <span asp-validation-for="TitleEng" className="text-danger" />
              </div>
              <div className="col-6">
                <label className="form-label">نص الإشعار بالعربية</label>
                <input autoComplete="off" name="DescriptionAr" type="text" className="form-control" />
                <span asp-validation-for="DescriptionAr" className="text-danger" />
              </div>
              <div className="col-6">
                <label className="form-label">نص الإشعار بالإنجليزية</label>
                <input autoComplete="off" name="DescriptionEng" type="text" className="form-control" />
                <span asp-validation-for="DescriptionEng" className="text-danger" />
              </div>
              <div className="col-12">
                <div className="d-grid">
                  <input type="submit" value="حفظ" className="btn btn-primary" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
