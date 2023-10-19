import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  baseurl,
  errorNotify,
  errorNotifyMessage,
  successNotify,
} from "../../constants";
import FieldMarkets from "../Markets/FieldMarkets";
import validator from "validator";
import useLoader from "../../Components/loader/useLoader";

export default function UserDetail() {
  const location = useLocation();

  const row = location.state.row;

  useEffect(() => {}, []);

  return (
    <>
      {/* <h1>{row.title}</h1> */}
      <div className="">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">المستخدمين</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="javascript:;">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  تفاصيل
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <hr />
        <div className="col-xl-12 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="border p-3 rounded">
                <h6 className="mb-0 text-uppercase">معلومات المستخدم</h6>
                <hr />
                <div
                  asp-validation-summary="ModelOnly"
                  className="text-danger"
                />
                {/* * name , address*/}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label">الإسم</label>
                      <input
                        disabled
                        autoComplete="off"
                        value={row.user.fullName ?? "غير مسجل"}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label">العنوان</label>
                      <input
                        disabled
                        autoComplete="off"
                        value={row.address ?row.address.description: "غير معروف"}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                  </div>
                </div>
                <br />
                <br />
                {/* * admin , details*/}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label">الايميل</label>
                      <input
                        disabled
                        autoComplete="off"
                        value={row.user.email ?? "غير مسجل"}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                  </div>

                  {/* phone */}

                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label">رقم الهاتف </label>
                      <input
                        disabled
                        autoComplete="off"
                        value={row.user.userName}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                  </div>

                  {/* code */}
                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label">كود الدخول  </label>
                      <input
                        disabled
                        autoComplete="off"
                        value={row.user.code}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                  </div>

                  <div className="col-12 text-center">
                    <label htmlFor="ImageFile" className="h5 form-label">
                      {" "}
                      صورة الملف
                    </label>
                    <div >
                      <a href={baseurl + "/images/" + row.user.profileImage}>
                        <img
                          style={{ width: "10vw", height: "10vw" }}
                          src={baseurl + "/images/" + row.user.profileImage}
                          className="rounded float-center"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <FieldMarkets id={row.id}/> */}
    </>
  );
}
