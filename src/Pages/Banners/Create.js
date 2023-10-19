import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import {
  baseurl,
  OnInput,
  onInputInvalid,
  successNotify,
  uploadImage,
} from "../../constants";
import axios from "axios";

export default function CreateBanner() {
 
  const [desc, setDesc] = useState("");

  const [image, setImage] = useState();
  const [order, setOrder] = useState("");


  const location = useLocation();

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

  const navigateTo = useNavigate();
  const [loader, showLoader, hideLoader] = useLoader();

  const postForm = async (event) => {
    showLoader();
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("Image", image);
    formdata.append("DescEng", "DescEng");
    formdata.append("Discount", "0");
    formdata.append("Order", order);
    formdata.append("DescAr", desc);
    const response = await fetch(baseurl +"offers/add-offer", {
      method: "POST",
      
      body: formdata,
    });
    const json = await response.json();
    hideLoader();
    console.log(json);
    successNotify();

    navigateTo("/admin/banners");
  };



  useEffect(() => {
   
  }, []);

  return (
    <div>
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
              <li className="breadcrumb-item active" aria-current="page">
                اضافة اعلان
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
              <h6 className="mb-0 text-uppercase">معلومات القسم</h6>
              <hr />
              <div
                asp-validation-summary="ModelOnly"
                className="text-danger "
              />
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label"> وصف الاعلان </label>
                  <input
                    onInvalid={onInputInvalid}
                    // value={desc}
                    onChange={(event) => {
                      setDesc(event.target.value);
                    }}
                    onInput={OnInput}
                    required
                    autoComplete="off"
                    name="DescAr"
                    type="text"
                    className="form-control"
                  />
                  <span asp-validation-for="Name" className="text-danger" />
                </div>

                <div className="col-6">
                  <label className="form-label">الترتيب </label>
                  <input
                    onInvalid={onInputInvalid}
                    // value={order}
                    onChange={(event) => {
                      setOrder(event.target.value);
                    }}
                    onInput={OnInput}
                    required
                    autoComplete="off"
                    name="Order"
                    type="number"
                    className="form-control"
                  />
                  <span asp-validation-for="Name" className="text-danger" />
                </div>

                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                    onChange={(value) => {
                      uploadImage(value.target.files[0]);
                    }}
                  />

                  <div className="col-12">
                    <div className="image col-6">
                      <img
                        src={
                          image != null
                            ? baseurl + "images/" +image
                            : "public/assets/photo.jpeg"
                        }
                        width={64}
                        height={64}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12" onClick={postForm}>
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
