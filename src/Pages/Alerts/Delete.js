

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import { baseurl, OnInput, onInputInvalid, successNotify, uploadImage } from "../../constants";


export default function DeleteAlert() {

  const location = useLocation();
    const row = location.state.row;
    const navigateTo = useNavigate()
    const [loader, showLoader, hideLoader] = useLoader(); 


    const postForm = async () => {
         showLoader()
        const formdata = new FormData()
        formdata.append("AlertId", row.id)


        const response = await fetch(baseurl + "alerts/delete-Alert", {
            method: "POST",
          
            body: formdata
        });
        hideLoader()
        successNotify()
        navigateTo("/admin/alerts");

    };
 
  return <div>
    {loader}
  <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
    <div className="breadcrumb-title pe-3">الفئات</div>
    <div className="ps-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 p-0">
          <li className="breadcrumb-item">
            <a href="javascript:;">
              <i className="bx bx-home-alt" />
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">حذف فئة</li>
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
          <h6 className="mb-0 text-uppercase">معلومات الفئة</h6>
          <hr />
            <div asp-validation-summary="ModelOnly" className="text-danger" />
            <div className="row g-3">
             
           
            <div className="col-6">
                <label className="form-label">العنوان باللغة العربية  </label>
                <input disabled defaultValue={row.titleAr} onInvalid={onInputInvalid}
                  onInput={OnInput} required autoComplete="off" name="Name" type="text" className="form-control" />
                <span asp-validation-for="Name" className="text-danger" />
              </div>
              <div className="col-6">
                <label className="form-label">العنوان باللغة الإنجليزية  </label>
                <input disabled defaultValue={row.titleEng} onInvalid={onInputInvalid}
                  onInput={OnInput} required autoComplete="off" name="NameEn" type="text" className="form-control" />
                <span asp-validation-for="Name" className="text-danger" />
              </div>
             
           
             <div className="col-6">
            <img className="image"  
              src={
            
                  baseurl + "images/"+row.imageUrl
               
              }
              alt=""
            />
          </div>

              <div onClick={postForm} class="form-group">
                            <input type="hidden" asp-for="Id" />
                            <input type="submit" value=" تأكيد الحذف" class="btn btn-danger float-right" />
                    </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
}







