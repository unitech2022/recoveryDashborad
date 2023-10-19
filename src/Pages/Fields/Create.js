import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useLoader from "../../Components/loader/useLoader";
import {
  baseurl,
  OnInput,
  onInputInvalid,
  successNotify,
  uploadImage,
} from "../../constants";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
export default function CreateField() {
  const [loader, showLoader, hideLoader] = useLoader();
  let componentMounted = true;
  let endPointAddField = baseurl + "field/add-Field";
  let endPointUpdateCategory = baseurl + "field/update-Field";

  const [typeField, setTypeField] = useState();


  const [file, setFile] = useState(null);
  const [titleEng, setTitleEng] = useState("");
  const [title, setTitle] = useState("");

  const [order, setOrder] = useState("");
  const location = useLocation();

  var [image, setImage] = useState([]);

  const options = ["أقسام", "متاجر", "ركوفرى كارد"];
  const defaultOption = options[0];

  const navigate = useNavigate();
  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/admin/Fields");
  };


  const handleSubmit = async (event) => {
   console.log( getStatus())
    showLoader();
    event.preventDefault();

    if (location.state == null) {
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

            addCategory(e.data);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      if (file != null) {
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

              UpdateCategory(e.data);
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        UpdateCategory(location.state.row.imageUrl);
      }
    }
  };

 const  getStatus =()=>{
if(typeField===options[0]){
  return "0";

}else if(typeField===options[1]){
  return "1";
}else {
  return "2";
}

  }

  useEffect(() => {
    if (location.state != null) {
      const row = location.state.row;

      setTitle(row.nameAr);
      setTitleEng(row.nameEng);
      setImage(location.state.row.imageUrl);
      setTypeField(options[row.status])
      setOrder(row.order)
    }
  }, []);
  // *** add Category
  const addCategory = async (imageCategory) => {
   


    console.log("add");
    // Using Fetch API

    let data = new FormData();
    data.append("NameAr", title);
    data.append("NameEng", titleEng);
    data.append("ImageUrl", imageCategory);
    data.append("Status",getStatus());
    data.append("Order",order);
    var requestOptions = {
      method: "POST",
      body: data,
      redirect: "follow",
    };

    fetch(endPointAddField, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        hideLoader();
        console.log(result);
        successNotify();
        setFile("");
        navigateHome();
      })
      .catch((error) => console.log("error", error));
  };

  
  // ** update Category

  const UpdateCategory = async (imageCategory) => {
    console.log("add");
    // Using Fetch API

    let data = new FormData();
    data.append("NameAr", title);
    data.append("NameEng", titleEng);
    data.append("Status",getStatus());
    data.append("Order",order);

    data.append("ImageUrl", imageCategory);
    data.append("id", location.state.row.id);

    var requestOptions = {
      method: "PUT",
      body: data,
      redirect: "follow",
    };

    fetch(endPointUpdateCategory, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        hideLoader();
        console.log(result);
        successNotify();
        setFile("");
        navigateHome();
      })
      .catch((error) => {
        hideLoader();
        console.log("error", error);
      });
  };


  return (
    <div>
      {loader}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">التصنيفات</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <a href="javascript:;">
                  <i className="bx bx-home-alt" />
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
             { location.state !=null?"تعديل التصنيف" :"اضافة تصنيف"}
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
              <h6 className="mb-0 text-uppercase">{location.state !=null?"تعديل التصنيف" :"اضافة تصنيف"}</h6>
              <hr />
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div
                  asp-validation-summary="ModelOnly"
                  className="text-danger"
                />
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label">
                      الاســـم باللغة العربية{" "}
                    </label>
                    <input
                      onInvalid={onInputInvalid}
                      value={title}
                      onChange={(event) => {
                        setTitle(event.target.value);
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
                    <label className="form-label">
                      الإسم باللغة الإنجليزية{" "}
                    </label>
                    <input
                      onInvalid={onInputInvalid}
                      value={titleEng}
                      onChange={(event) => {
                        setTitleEng(event.target.value);
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
                    <label className="form-label">
                     الترتيب{" "}
                    </label>
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
                  {/*  photo */}
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                   

                    <div  className="col-12">
                    <div className="image col-6">
                      <img
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : location.state
                            ? baseurl + "images/" + image
                            : "./assets/photo.jpeg"
                        }
                        width={64}
                        height={64}
                        alt=""
                      />
                    </div>
                    <div className="col-6">
                      <label >

                        اختار نوع التصنيف
                      </label>
                      <Dropdown className="m-3"
                        options={options}

                        onChange={(value)=>{
                       
                          setTypeField(value.value);
                          
                        }}
                        value={location.state != null?options[location.state.row.status]:defaultOption}
                        placeholder="اختار"
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
