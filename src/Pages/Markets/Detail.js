

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseurl, OnInput, onInputInvalid, uploadImage } from "../../constants";




export default function MarketDetail() {

  const location = useLocation();
  const row = location.state.row;
 
  return <>




  <div>
    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div className="breadcrumb-title pe-3">المتاجر</div>
      <div className="ps-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 p-0">
            <li className="breadcrumb-item">
              <a href="javascript:;">
                <i className="bx bx-home-alt" />
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">معلومات المتجر</li>
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
            <h6 className="mb-0 text-uppercase">معلومات المتجر</h6>
            <hr />
              <div asp-validation-summary="ModelOnly" className="text-danger" />
              <div className="row g-3">
            
              
                <div className="col-6">
                  <label className="form-label">الإسم باللغة العربية </label>
                  <input  disabled  defaultValue={row.name}  onInvalid={onInputInvalid }
                        onInput={OnInput} required autoComplete="off" name="Name" type="text" className="form-control" />
                  <span asp-validation-for="Name" className="text-danger" />
                </div>
                <div className="col-6">
                  <label className="form-label">الإسم باللغة الإنجليزية </label>
                  <input  disabled defaultValue={row.nameEn} onInvalid={onInputInvalid }
                        onInput={OnInput} required autoComplete="off" name="NameEn" type="text" className="form-control" />
                  <span asp-validation-for="NameEn" className="text-danger" />
                </div>
                <div className="col-6">
                  <label className="form-label">وصف  عن المتجر </label>
                  <input  disabled  defaultValue={row.info} onInvalid={onInputInvalid }
                        onInput={OnInput} required autoComplete="off" name="Info" type="text" className="form-control" />
                  <span asp-validation-for="Info" className="text-danger" />
                </div>
                <div className="col-6">
                  <label className="form-label">رقم التواصل </label>
                  <input  disabled defaultValue={row.phone} autoComplete="off" name="Phone" type="text" className="form-control" />
                </div>
                <div className="col-6">
                  <label className="form-label">البريد الإلكتروني </label>
                  <input  disabled defaultValue={row.email}  autoComplete="off" name="Email" type="text" className="form-control" />
                </div>
                <div className="col-6">
                  <label className="form-label">الموقع الإلكتروني </label>
                  <input  disabled defaultValue={row.website} autoComplete="off" name="Website" type="text" className="form-control" />
                </div>
                <div className="col-6">
                  <label className="form-label">العنوان</label>
                  <input  disabled defaultValue={row.address} autoComplete="off" name="Address" type="text" className="form-control" />
                  <span asp-validation-for="Address" className="text-danger" />
                </div>
                <div className="col-6">
                  <label className="form-label">Latitude</label>
                  <input  disabled  autoComplete="off" defaultValue={row.lat} name="Lat" type="text" className="form-control" />
                </div>
                <div className="col-6">
                  <label className="form-label">Longitude</label>
                  <input  disabled   autoComplete="off" defaultValue={row.lng} name="Lng" type="text" className="form-control" />
                </div>
            
             
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>

<div className="m-3">
  <h6>الصور</h6>

  {
    row.image.split(",").map(e=><img style={{width: '20vw', height: 'auto'}} className="m-2" src={baseurl + "/uploads/" + e}  alt="Alt 1" />)
  }

</div>
</div>
  {/* <MarketProducts id={row.id}/> */}

  
  </>

}