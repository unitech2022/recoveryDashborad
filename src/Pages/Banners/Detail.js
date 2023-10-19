

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseurl, OnInput, onInputInvalid, uploadImage } from "../../constants";



export default function BannerDetail() {

  const location = useLocation();
  const row = location.state.row;
 
  return <>
  <div>
  <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
    <div className="breadcrumb-title pe-3"> المنتجات</div>
    <div className="ps-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 p-0">
          <li className="breadcrumb-item">
            <a href="javascript:;">
              <i className="bx bx-home-alt" />
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">تفاصيل المنتج </li>
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
          <h6 className="mb-0 text-uppercase">معلومات المنتج</h6>
          <hr />
            <div asp-validation-summary="ModelOnly" className="text-danger" />
            <div className="row g-3">
          
           
              <div className="col-6">
                <label className="form-label">الإسم   </label>
                <input disabled  onInvalid={onInputInvalid}
                  onInput={OnInput} required autoComplete="off" defaultValue={row.product.name} name="Name" type="text" className="form-control" />
                <span asp-validation-for="Name" className="text-danger" />
              </div>
              <div className="col-6">
                <label className="form-label"> اسم المتجر</label>
                <input disabled onInvalid={onInputInvalid}
                  onInput={OnInput} required autoComplete="off" defaultValue={row.provider.title} name="NameEn" type="text" className="form-control" />
                <span asp-validation-for="NameEn" className="text-danger" />
              </div>
              <div className="col-6">
                <label className="form-label">الوصف   </label>
                <textarea disabled onInvalid={onInputInvalid}
                multiple
                  onInput={OnInput} required autoComplete="off" defaultValue={row.product.description} name="Description" type="text" className="form-control" />
                <span asp-validation-for="Description" className="text-danger" />
              </div>
              {/* <div className="col-6">
                <label className="form-label"> </label>
                <input disabled autoComplete="off" defaultValue={row.product.price + " ريال"} name="DescriptionEn" type="text" className="form-control" />
              </div> */}
              <div className="col-6">
                <label className="form-label">السعر </label>
                <input disabled autoComplete="off" defaultValue={row.product.price + " ريال"} name="Price" type="text" className="form-control" />
              </div>
              <div className="col-6">
                <label className="form-label">الخصم </label>
                <input disabled autoComplete="off" defaultValue={row.product.discount} name="Discount" type="text" className="form-control" />
              </div>
              <div className="col-6">
                <label className="form-label">الحالة </label>
                <input disabled autoComplete="off" defaultValue={row.product.status === 0 ?
                "مفعل" : "موقوف" } name="Discount" type="text" className="form-control" />
              </div>
              <div className=" m-5">
                <label htmlFor="ImageFile" className="h5 form-label">الصور </label>
                <div className="d-flex flex-wrap m-4">
                 {row.product.images.split("#").map((item,index)=>(
                  <div >
                    <a href={baseurl + "/images/" + item}> <img 
                    src={
                      baseurl +
                      "/images/" +
                      item
                    }
                    width={100}
                    height={100}
                    alt=""
                  /></a>
                 
                </div>
                 ) )}
                </div>
              </div>
             
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </>
}