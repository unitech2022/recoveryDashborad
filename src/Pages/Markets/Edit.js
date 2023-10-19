import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import {
  baseurl,
  OnInput,
  onInputInvalid,
  successNotify,
 
} from "../../constants";
import axios from "axios";

export default function EditMarket() {
  const location = useLocation();
  const row = location.state.row;

  var [image, setImage] = useState([]);

  const handleNewImage = (event) => {
    image = event.target.files;
  };
  const arr = [];
  const [file, setFile] = useState(null);
  const [images, setImages] = useState();
  const [categoryId, setCategoryId] = useState();
  const [fieldId, setFieldId] = useState();

  const [fields, setFields] = useState();
  const [categories, setCategories] = useState([]);
  const [loader, showLoader, hideLoader] = useLoader();
  const [files, setFiles] = useState(null);
  const [nameAr, setNameAr] = useState();
  const [nameEn, setNameEn] = useState();
  const [aboutAr, setAboutAr] = useState();
  const [link, setLink] = useState();
  const [cardId, setCardId] = useState();
  const [aboutEng, setAboutEng] = useState();
  const [order, setOrder] = useState("");
  const [cards, setCards] = useState();

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

  const uploadImages = async (image) => {
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
            setImages(arr.join("#"));
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

  const navigateTo = useNavigate();
  const postForm = async (event) => {
    // let uploadedImage = await uploadImages(image);
    console.log(arr);
    showLoader();
    event.preventDefault();
    try {
    
      const formdata = new FormData(event.target);
      if(files === null){
        console.log("not")
        formdata.append("images", row.market.images);
      
      }else {
        await uploadImages();
        formdata.append("images",  arr.join("#"));
      }
      // let uploadedImage = await uploadImages(image);
      // console.log(uploadedImage);
    
      formdata.append("logoImage", file===null?row.market.logoImage:image);
      formdata.append("Status", "0");
      formdata.append("aboutEng", aboutEng);
      formdata.append("id", row.market.id);
      formdata.append("aboutAr", aboutAr);
      formdata.append("nameAr", nameAr);
      formdata.append("nameEng", nameEn);
      formdata.append("link", link);
      formdata.append("order", order);
      formdata.append("CategoryId", categoryId ?? "0");
      formdata.append("Email", "ammar");
      formdata.append("Phone", "3434343434");
      formdata.append("CardId", cardId);
      const response = await fetch(baseurl + "Market/update-Market", {
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
    arr.slice();
    if (row != null) {
      setNameAr(row.market.nameAr);
      setImages(row.market.images);
      setNameEn(row.market.nameEng);
      setAboutAr(row.market.aboutAr);
      setAboutEng(row.market.aboutEng);
      setLink(row.market.link);
      setFieldId(row.market.fieldId);
      setCategoryId(row.market.categoryId);
      setOrder(row.market.order);
      setCardId(row.market.cardId);
      setImages(row.market.images)

      if (row.market.categoryId !== 0) {
        await getCategories(row.market.fieldId);
      }
    }
    await getFields();
    await getCards();
  };

  const getCards = async (fieldId) => {
    try {
      const response = await fetch(baseurl + "card/get-Cards", {
        method: "GET",
      });
      const json = await response.json();
      console.log(json);
      // cards.push({
      //   "id":0,
      //   "nameAr":"cancel"
      // })
      setCards(json);
      return json;
    } catch (error) {
      console.error(error);
    }
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
  
    const handleRemove = (id) => {
      const fileItem = files.filter((person) => person !== id);
  
      setFiles(fileItem);
    };

  useEffect(() => {
    console.log(row.market.images+"jdfjdfbhd")
    initData();
  }, []);

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
                        value={fieldId}
                        required
                        name="fieldId"
                        onChange={async (value) => {
                          console.log(value.target.value);
                          setFieldId(value.target.value);
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
                        value={categoryId}
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
                        // name="categoryId"

                        onChange={(value) => {
                          console.log(value.target.value);
                          setCardId(value.target.value);
                        }}
                        onInvalid={onInputInvalid}
                        onInput={OnInput}
                        value={cardId}
                        id="school-id"
                        className="form-select"
                      >
                        <option value={""}>اختر</option>
                        <option key={0} value={0}>
                          الغاء الاشتراك
                        </option>
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
                      onChange={(value) => {
                        setNameAr(value.target.value);
                      }}
                      value={nameAr}
                      required
                      autoComplete="off"
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
                      onChange={(value) => {
                        setNameEn(value.target.value);
                      }}
                      value={nameEn}
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
                      onChange={(value) => {
                        setAboutAr(value.target.value);
                      }}
                      value={aboutAr}
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
                      onChange={(value) => {
                        setLink(value.target.value);
                      }}
                      value={link}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">الترتيب </label>
                    <input
                      autoComplete="off"
                      onChange={(value) => {
                        setOrder(value.target.value);
                      }}
                      value={order}
                      type="Number"
                      className="form-control"
                    />
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

                      <img src={file===null?baseurl+"images/"+row.market.logoImage:file} width={64} height={64} alt="" />
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="ImageFile" className="form-label">
                      صور للمتجر{" "}
                      <span className="text-success">
                        حجم الصورة ( 1200x600 )
                      </span>
                    </label>
                    <input
                      multiple="multiple"
                      // onInvalid={onInputInvalid}
                      onInput={OnInput}
                      onChange={handleSliderImages}
                      
                      defaultValue={images}
                      // name="images"
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
                    {
                     files!=null? files.map((item, i) => (
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
                      )):row.market.images.split("#").map((item, i) => (
                        <div key={i} className="col">
                          <div className="image-style">
                           
                            <img src={baseurl+"images/"+item} alt="" />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  {/* <div className="col-6">
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
                      onChange={(value) => {
                        uploadImages(value.target.files);
                      }}
                      //  value={row.market.images}
                      // name="images"
                      className="form-control form-control-lg"
                      id="formFileLg"
                      type="file"
                    />
                    <span
                      asp-validation-for="ImageFile"
                      className="text-danger"
                    />
                  </div> */}
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
