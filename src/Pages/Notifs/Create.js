import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import { baseurl, OnInput, onInputInvalid, successNotify, uploadImage } from "../../constants";

export default function CreateNotif() {
  const [users, setusers] = useState()

  const [loader, showLoader, hideLoader] = useLoader(); 

  const getusers = async () => {
    try {
      const response = await fetch(baseurl + "user/all", {

        method: "GET",

      });
      const json = await response.json();
      console.log("users");
      console.log(json);
      setusers(json)
      return json;
    } catch (error) {
      console.error(error);
    }
  }


 


  const navigateTo = useNavigate()
  const postForm = async (event) => {
    showLoader()
    event.preventDefault();
    const formdata = new FormData(event.target);

    formdata.append("type","USER")

    const response = await fetch(baseurl + "Notif/send", {
      method: "POST",
      headers: {

        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: formdata
    });
    const json = await response.json();
    hideLoader()
    console.log(json);
    successNotify()

    navigateTo("/admin/notifs");

  };

  const initData = async () => {
    await getusers()

  }

  useEffect(() => {

    initData()

  }, []);

  return <div>
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
                <label className="form-label">عنوان الإشعار</label>
                <input autoComplete="off" name="Title" type="text" className="form-control" />
                <span asp-validation-for="Title" className="text-danger" />
              </div>
              <div className="col-6">
                <label className="form-label">نص الإشعار</label>
                <input autoComplete="off" name="Body" type="text" className="form-control" />
                <span asp-validation-for="Body" className="text-danger" />
              </div>
              <div className="col-6">
                  <label className="form-label">اختر المستخدم </label>
                  {users && (
                    <select
                      name="userId"
                      

                      onInvalid={onInputInvalid }
                        onInput={OnInput} required 
                      id="school-id"
                      className="form-select"
                    >
                      <option  value={""}>
                          اختر 
                        </option>
                      {users.map((row) => (
                        <option key={row.id} value={row.id}>
                          {row.name}
                        </option>
                      ))}
                    </select>
                  )}                  <span asp-validation-for="FieldId" className="text-danger" />
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


}