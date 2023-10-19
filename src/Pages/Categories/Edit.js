import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import validator from "validator";
import axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { baseurl, successNotify,   OnInput,
  onInputInvalid, } from "../../constants";

export default function EditCategory() {
  const [data, setData] = useState();

  const [nameAr, setNameAr] = useState();
  const [nameEn, setNameEn] = useState();
  const [image, setImage] = useState();
  const [order, setOrder] = useState("");
  const [fieldId, setFieldId] = useState();


  const [loader, showLoader, hideLoader] = useLoader();

  const navigateTo = useNavigate();



  ////*** upload image */
  const uploadImage = async (file, type) => {
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
          console.log(e.data);
         
            setImage(e.data);
         
        });
    } catch (e) {
      console.log(e);
    }
  };

  const location = useLocation();
  const row = location.state.row;
  useEffect(() => {
    getFields();
    if (row != null) {

      setImage(row.category.imageUrl);
      setNameAr(row.category.nameAr)
      setNameEn(row.category.nameEng)
      setOrder(row.category.order)
     setFieldId(row.category.fieldId)

     
    }
  }, []);


  const getFields = async () => {
    showLoader();

    try {
      const response = await fetch(baseurl + "field/get-Fields", {
        method: "GET",
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // },
      });
      const json = await response.json();
      hideLoader();
      // console.error(json);
      const options = json.map((d) => ({
        value: d.id,
        label: d.nameAr,
      }));
      setData(options);

      return json;
    } catch (error) {
      hideLoader();
      console.error(error + "kjjjjjjj");
    }
  };
  const postForm = async () => {
    console.log(image);
    showLoader();
    //  if(handleValidation()==false)return;
    try {
      const formdata = new FormData();
      formdata.append("nameAr", nameAr);
    formdata.append("NameEng", nameEn);
    formdata.append("ImageUrl", image);
    formdata.append("fieldId", fieldId.toString());
    formdata.append("Order", order.toString());
      formdata.append(
        "id",row.category.id.toString()
       
      );
      

      const response = await fetch(baseurl + "category/update-category", {
        method: "PUT",
        //   headers: {
        //     Authorization: "Bearer " + localStorage.getItem("token"),
        //   },
        body: formdata,
      });
      const json = await response.json();
      hideLoader();
      successNotify();

      
      console.log(json);
      navigateTo("/admin/categories");
    } catch (error) {
      hideLoader();
      console.error(error + "kjjjjjjj");
    }
  };

  return (
    <div>
      {loader}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">الاقسام</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <a href="javascript:;">
                  <i className="bx bx-home-alt" />
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                تعدبل القسم
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
              <div asp-validation-summary="ModelOnly" className="text-danger" />
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">الاســـم باللغة العربية </label>
                  <input
                    onInvalid={onInputInvalid}
                    value={nameAr}
                    onChange={(event) => {
                      setNameAr(event.target.value);
                    }}
                    onInput={OnInput}
                    required
                    autoComplete="off"
                    name="Name"
                    type="text"
                    className="form-control"
                  />
                  <span asp-validation-for="Name" className="text-danger" />
                </div>

                <div className="col-6">
                  <label className="form-label">الإسم باللغة الإنجليزية </label>
                  <input
                    onInvalid={onInputInvalid}
                    value={nameEn}
                    onChange={(event) => {
                      setNameEn(event.target.value);
                    }}
                    onInput={OnInput}
                    required
                    autoComplete="off"
                    name="NameEn"
                    type="text"
                    className="form-control"
                  />
                  <span asp-validation-for="Name" className="text-danger" />
                </div>

                <div className="col-6">
                  <label className="form-label">الترتيب </label>
                  <input
                    onInvalid={onInputInvalid}
                    value={order}
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
                <div className="col-6">
                  <label>اختار نوع التصنيف</label>
                  <Dropdown
                    className="m-3"
                    options={data}
                    onChange={(value) => {
                      console.log(value.value);
                      setFieldId(value.value);
                    }}
                    //  value={data[0].value}
                    placeholder="اختار"
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
                        src={image!=null?baseurl+"images/"+ image:baseurl+"images/"+ row.category.imageUrl}
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
