import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import { baseurl, OnInput, onInputInvalid, successNotify, uploadImage } from "../../constants";
import axios from "axios";

export default function CreateCard() {

  var [image, setImage] = useState()
  const [loader, showLoader, hideLoader] = useLoader(); 





  // ** upload image
const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const resp = await axios
      .post(baseurl + "image/upload/image", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((e) => {
       
          setImage(e.data);
  
          console.log(e.data);
      });
  } catch (e) {
    console.log(e);
  }
};

 


  const navigateTo = useNavigate()
  const postForm = async (event) => {
     showLoader()
    event.preventDefault();
    const formdata = new FormData(event.target);

  

    formdata.append("image", image)
    const response = await fetch(baseurl + "card/add-Card", {
      method: "POST",
      headers: {

        // "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: formdata
    });
    const json = await response.json();
    hideLoader()
    successNotify()

    console.log(json);
    navigateTo("/admin/cards");

  };



  useEffect(() => {



  }, []);

  return <div>
    {loader}
    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div className="breadcrumb-title pe-3">الإعلانات</div>
      <div className="ps-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 p-0">
            <li className="breadcrumb-item">
              <a href="javascript:;">
                <i className="bx bx-home-alt" />
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">إضافة إعلان</li>
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
              <form onSubmit={postForm} encType="multipart/form-data">
                <div
                  asp-validation-summary="ModelOnly"
                  className="text-danger"
                />
                <div className="row g-3">
                 
                  <div className="col-6">
                    <label className="form-label">الإسم باللغة العربية </label>
                    <input
                      onInvalid={onInputInvalid}
                      onInput={OnInput}
                      required
                      autoComplete="off"
                      name="NameAr"
                      type="text"
                      className="form-control"
                    />
                    <span asp-validation-for="Name" className="text-danger" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">
                      الإسم باللغة الإنجليزية{" "}
                    </label>
                    <input
                      onInvalid={onInputInvalid}
                      onInput={OnInput}
                      required
                      autoComplete="off"
                      name="NameEng"
                      type="text"
                      className="form-control"
                    />
                    <span asp-validation-for="NameEn" className="text-danger" />
                  </div>
                  
                  <div className="col-6">
                    <label className="form-label">الموقع الإلكتروني </label>
                    <input
                      autoComplete="off"
                      name="Link"
                      type="text"
                      className="form-control"
                    />
                  </div>
               

                 
                  <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                    onChange={(value)=>{
                      uploadImage(value.target.files[0]);
                    }}
                  />

                  <div className="col-12">
                    <div className="image col-6">
                      <img
                        src={baseurl+"images/"+image}
                        width={64}
                        height={64}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <input
                        onInvalid={onInputInvalid}
                        onInput={OnInput}
                        required
                        type="submit"
                        value="حفظ"
                        className="btn btn-primary"
                      />
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