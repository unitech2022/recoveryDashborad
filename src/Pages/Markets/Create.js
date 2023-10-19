import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import axios from "axios";
import {
  baseurl,
  OnInput,
  onInputInvalid,
  successNotify,
  uploadImage,
} from "../../constants";

export default function CreateMarket() {
  var [image, setImage] = useState([]);

  const handleNewImage = (event) => {
    image = event.target.files;
  };

  const [files, setFiles] = useState([]);

  const [cards, setCards] = useState();
  const [categoryId, setCategoryId] = useState();
  const [cardId, setCardId] = useState(0);
  const [file, setFile] = useState(null);

  const [fields, setFields] = useState();
  const [categories, setCategories] = useState();
  const [loader, showLoader, hideLoader] = useLoader();

  const getFields = async () => {
    try {
      const response = await fetch(baseurl + "dashboard/get-all-fields", {
        method: "GET",
      });
      const json = await response.json();
      console.log(json);
      setFields(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async (fieldId) => {
    try {
      const response = await fetch(
        baseurl + "category/get-categories-byFieldid?fieldId=" + fieldId,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      console.log(json);
      setCategories(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const getCards = async (fieldId) => {
    try {
      const response = await fetch(baseurl + "card/get-Cards", {
        method: "GET",
      });
      const json = await response.json();
      console.log(json);
      setCards(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const arr = [];
  const uploadImages = async (image) => {
    showLoader();
    arr.slice();
    for (const element of files) {
      try {
        const formData = new FormData();
        formData.append("file", element);

        const resp = await axios
          .post(baseurl + "image/upload/image", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((e) => {
            arr.push(e.data);
          });
      } catch (e) {
        console.log(e);
      }
    }
    console.log(arr.join("#"));
    return arr.join("#");
  };

  const handleSliderImages = (e) => {
    if (e.target.files) {
      setFiles([...e.target.files]);
    }
    console.log("Update slider images", files);
  };

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
  const postForm = async (event) => {
    // let uploadedImage = await uploadImages(image);
    console.log(arr);

    event.preventDefault();
    await uploadImages();
    try {
      const formdata = new FormData(event.target);
      // let uploadedImage = await uploadImages(image);
      // console.log(uploadedImage);
      formdata.append("images", arr.join("#"));
      formdata.append("Status", "0");
      formdata.append("aboutEng", "market");
      formdata.append("CategoryId", categoryId ?? "0");
      formdata.append("LogoImage", image);

      formdata.append("Email", "ammar");
      formdata.append("Phone", "3434343434");
      formdata.append("CardId", cardId);
      const response = await fetch(baseurl + "Market/add-Market", {
        method: "POST",
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // },
        body: formdata,
      });
      const json = await response.json();
      hideLoader();
      successNotify();
      console.log(json + "fdfndlsfjdsifsldflds");
      navigateTo("/admin/Markets");
    } catch (e) {
      console.log(e + "fgvfdgd");
    }
  };

  const initData = async () => {
    await getFields();
    await getCards();
  };

  useEffect(() => {
    initData();
  }, []);

  const handleRemove = (id) => {
    const fileItem = files.filter((person) => person !== id);

    setFiles(fileItem);
  };

  return (
    <div>
      {loader}
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
              <li className="breadcrumb-item active" aria-current="page">
                إضافة متجر
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
              <h6 className="mb-0 text-uppercase">معلومات المتجر</h6>
              <hr />
              <form onSubmit={postForm} encType="multipart/form-data">
                <div
                  asp-validation-summary="ModelOnly"
                  className="text-danger"
                />
                <div className="row g-3">
                  <div className="col-4">
                    <label className="form-label">اختر الفئة </label>
                    {fields && (
                      <select
                        onInvalid={onInputInvalid}
                        onInput={OnInput}
                        required
                        name="fieldId"
                        onChange={async (value) => {
                          console.log(value.target.value);
                          await getCategories(value.target.value);
                        }}
                        id="school-id"
                        className="form-select"
                      >
                        <option value={""}>اختر</option>
                        {fields.map((row) => (
                          <option key={row.id} value={row.id}>
                            {row.nameAr}
                          </option>
                        ))}
                      </select>
                    )}

                    <span
                      asp-validation-for="FieldId"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label">اختر القسم </label>
                    {categories && (
                      <select
                        // name="categoryId"
                        onChange={(value) => {
                          setCategoryId(value.target.value);
                        }}
                        onInvalid={onInputInvalid}
                        onInput={OnInput}
                        // required
                        id="school-id"
                        className="form-select"
                      >
                        <option value={""}>اختر</option>
                        {categories.map((row) => (
                          <option key={row.id} value={row.id}>
                            {row.nameAr}
                          </option>
                        ))}
                      </select>
                    )}{" "}
                    <span
                      asp-validation-for="FieldId"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label"> الاشتراكات </label>
                    {cards && (
                      <select
                        //  name="cardId"
                        onChange={(value) => {
                          setCardId(value.target.value);
                        }}
                        onInvalid={onInputInvalid}
                        onInput={OnInput}
                        // required
                        id="school-id"
                        className="form-select"
                      >
                        <option value={""}>اختر</option>
                        {cards.map((row) => (
                          <option key={row.id} value={row.id}>
                            {row.nameAr}
                          </option>
                        ))}
                      </select>
                    )}{" "}
                    <span
                      asp-validation-for="FieldId"
                      className="text-danger"
                    />
                  </div>
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
                    <label className="form-label">وصف عن المتجر </label>
                    <input
                      onInvalid={onInputInvalid}
                      onInput={OnInput}
                      required
                      autoComplete="off"
                      name="AboutAr"
                      type="text"
                      className="form-control"
                    />
                    <span asp-validation-for="Info" className="text-danger" />
                  </div>
                  {/* <div className="col-6">
                    <label className="form-label">رقم التواصل </label>
                    <input
                      autoComplete="off"
                      name="Phone"
                      type="text"
                      className="form-control"
                    />
                  </div> */}
                  <div className="col-6">
                    <label className="form-label">الموقع الإلكتروني </label>
                    <input
                      autoComplete="off"
                      name="Link"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">الترتيب </label>
                    <input
                      autoComplete="off"
                      name="Order"
                      type="Number"
                      className="form-control"
                    />
                  </div>

                  {/*  photo */}
                  <div className="col-6">
                    <label className="form-label">شعار المتجر </label>
                    <div className="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                        onChange={(e) => {
                          setFile(URL.createObjectURL(e.target.files[0]));
                          uploadImage(e.target.files[0]);
                        }}
                      />

                      <img src={file} width={64} height={64} alt="" />
                    </div>
                  </div>
                  {/* <div className="col-6">
                    <label className="form-label">العنوان</label>
                    <input
                      onInvalid={onInputInvalid}
                      onInput={OnInput}
                      required
                      autoComplete="off"
                      name="Address"
                      type="text"
                      className="form-control"
                    />
                    <span
                      asp-validation-for="Address"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Latitude</label>
                    <input
                      autoComplete="off"
                      name="Lat"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Longitude</label>
                    <input
                      autoComplete="off"
                      name="Lng"
                      type="text"
                      className="form-control"
                    />
                  </div> */}

                  <div className="col-12">
                    <label htmlFor="ImageFile" className="form-label">
                      صور للمتجر{" "}
                      <span className="text-success">
                        حجم الصورة ( 1200x600 )
                      </span>
                    </label>
                    <input
                      multiple="multiple"
                      onInvalid={onInputInvalid}
                      onInput={OnInput}
                      onChange={handleSliderImages}
                      required
                      name="images"
                      className="form-control form-control-lg"
                      id="formFileLg"
                      type="file"
                    />
                    <span
                      asp-validation-for="ImageFile"
                      className="text-danger"
                    />
                  </div>

                  <div>
                    {files ? (
                      files.map((item, i) => (
                        <div key={i} className="col">
                          <div className="image-style">
                            <button
                              type="button"
                              onClick={() => handleRemove(item)}
                              class="btn-close btn-close"
                              aria-label="Close"
                            ></button>
                            <img src={URL.createObjectURL(item)} alt="" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <h1>jdasdas</h1>
                    )}
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
