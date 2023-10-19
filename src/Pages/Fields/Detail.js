

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseurl, OnInput, onInputInvalid, uploadImage } from "../../constants";


export default function CityDetail() {

  const location = useLocation();
  const row = location.state.row;
 
  return <div>
  <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
    <div className="breadcrumb-title pe-3">المدن</div>
    <div className="ps-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 p-0">
          <li className="breadcrumb-item">
            <a href="javascript:;">
              <i className="bx bx-home-alt" />
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">تفاصيل مدينة</li>
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
          <h6 className="mb-0 text-uppercase">معلومات المدينة</h6>
          <hr />
            <div asp-validation-summary="ModelOnly" className="text-danger" />
            <div className="row g-3">
             
           
              <div className="col-6">
                <label className="form-label">الإسم باللغة العربية  </label>
                <input disabled defaultValue={row.name} onInvalid={onInputInvalid}
                  onInput={OnInput} required autoComplete="off" name="Name" type="text" className="form-control" />
                <span asp-validation-for="Name" className="text-danger" />
              </div>
              <div className="col-6">
                <label className="form-label">الإسم باللغة الإنجليزية  </label>
                <input disabled defaultValue={row.nameEn} onInvalid={onInputInvalid}
                  onInput={OnInput} required autoComplete="off" name="NameEn" type="text" className="form-control" />
                <span asp-validation-for="Name" className="text-danger" />
              </div>
           
              <div className="col-6">
                <label className="form-label"> الحالة </label>
                { (
                  <select

                  onInvalid={onInputInvalid}
                  onInput={OnInput} required
                  disabled
                  name="status"
                  id="school-id"
                  className="form-select"
                >

                  <option value={""}>
                    اختر
                  </option>
                  <option selected={row.status==1} value={1}>
                    مفعل
                  </option>
                  <option selected={row.status==0} value={0}>
                    غير مفعل
                  </option>
                  
                </select>
                )}

                <span asp-validation-for="ProductId" className="text-danger" />
              </div>
            
            </div>
        </div>
      </div>
    </div>
  </div>
</div>


}