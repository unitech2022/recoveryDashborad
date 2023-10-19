import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  baseurl,
  OnInput,
  onInputInvalid,
  successNotify,
  uploadImage,
} from "../../constants";
import useLoader from "../../Components/loader/useLoader";
import axios from "axios";

export default function EditCard() {
  var [image, setImage] = useState();
  const location = useLocation();
  const row = location.state.row;

  const navigateTo = useNavigate();
  const [loader, showLoader, hideLoader] = useLoader();

  const postForm = async (event) => {
    showLoader();
    event.preventDefault();
    const formdata = new FormData(event.target);
    formdata.append("id", row.id);

    formdata.append("image", image);

    const response = await fetch(baseurl + "card/update-Card", {
      method: "PUT",
      // headers: {

      //   "Authorization": "Bearer " + localStorage.getItem("token")
      // },
      body: formdata,
    });
    const json = await response.json();
    hideLoader();
    successNotify();

    console.log(json);
    navigateTo("/admin/cards");
  };

  useEffect(() => {
    if (row != null) {
      setImage(row.image);
    }
  }, []);

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

  return (
    <div>
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
              <li className="breadcrumb-item active" aria-current="page">
                إضافة إعلان
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
              <h6 className="mb-0 text-uppercase">معلومات الإعلان</h6>
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
                      defaultValue={row.nameAr}
                      autoComplete="off"
                      name="NameAr"
                      type="text"
                      className="form-control"
                    />
                    <span asp-validation-for="NameAr" className="text-danger" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">
                      الإسم باللغة الإنجليزية{" "}
                    </label>
                    <input
                      onInvalid={onInputInvalid}
                      onInput={OnInput}
                      required
                      defaultValue={row.nameEng}
                      autoComplete="off"
                      name="NameEng"
                      type="text"
                      className="form-control"
                    />
                    <span asp-validation-for="NameEng" className="text-danger" />
                  </div>

                  <div className="col-6">
                    <label className="form-label">الموقع الإلكتروني </label>
                    <input
                      autoComplete="off"
                      name="Link"
                      value={row.link}
                      type="text"
                      className="form-control"
                    />
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
                          src={image!=null ?baseurl + "images/"+image:baseurl + "images/"+row.image}
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
  );
}
