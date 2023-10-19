

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import { baseurl, OnInput, onInputInvalid, successNotify, uploadImage } from "../../constants";


export default function DeleteBanner() {

  const location = useLocation();
    const row = location.state.row;
    const navigateTo = useNavigate()

    const [loader, showLoader, hideLoader] = useLoader(); 

    const postForm = async () => {
       showLoader()
        const formdata = new FormData()
        formdata.append("OfferId", row.id)


        const response = await fetch(baseurl + "offers/delete-Offer", {
            method: "POST",
            // headers: {

            //     "Authorization": "Bearer " + localStorage.getItem("token")
            // },
            body: formdata
        });
        hideLoader()
        successNotify()

        navigateTo("/admin/banners");

    };
 
  return <div>
    {loader}
  <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
    <div className="breadcrumb-title pe-3">الاعلانات</div>
    <div className="ps-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 p-0">
          <li className="breadcrumb-item">
            <a href="javascript:;">
              <i className="bx bx-home-alt" />
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">حذف اعلان</li>
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
          <h6 className="mb-0 text-uppercase">معلومات الاعلان</h6>
          <hr />
            <div asp-validation-summary="ModelOnly" className="text-danger" />
            <div className="row g-3">
          
           
              <div className="col-6">
                <label className="form-label"> وصف الاعلان</label>
                <input disabled  onInvalid={onInputInvalid}
                  onInput={OnInput} required autoComplete="off" defaultValue={row.descAr} name="Name" type="text" className="form-control" />
                <span asp-validation-for="Name" className="text-danger" />
              </div>
              
              <div className="col-6 text-center">
                <label htmlFor="ImageFile" className="form-label">صورة </label>
                <div className="text-center">
                  <img style={{width: '10vw', height: 'auto'}} src={baseurl+"images/"+row.image} className="rounded float-center" />
                </div>
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