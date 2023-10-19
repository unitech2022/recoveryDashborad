import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import validator from "validator";
import axios from "axios";
import { baseurl, successNotify, errorNotifyMessage } from "../../constants";

export default function EditUser() {
  const [file, setFile] = useState(null);
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [image, setImage] = useState("");
  const [loader, showLoader, hideLoader] = useLoader();

  const navigateTo = useNavigate();


  ////*** upload image */

  const location = useLocation();
  const row = location.state.row;
  useEffect(() => {
    if (location.state != null) {
     setName(row.user.fullName)
      setEmail(row.user.email);
      setImage(row.user.profileImage)
      
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
  
        
      });
  } catch (e) {
    console.log(e);
  }
};


  const postForm = async () => {
 
    showLoader();
    try {
      const formdata = new FormData();
      formdata.append("userId", row.user.id);
      formdata.append("fullName", name ?? row.user.fullName);
      formdata.append("profileImage", image ?? row.user.profileImage);
   

      const response = await fetch(baseurl + "update-user", {
        method: "POST",
        //   headers: {
        //     Authorization: "Bearer " + localStorage.getItem("token"),
        //   },
        body: formdata,
      });

      hideLoader();
      successNotify();

      const json = await response.json();
      console.log(json);
      navigateTo("/admin/users");
    } catch (error) {
      hideLoader();
      console.error(error + "kjjjjjjj");
    }
    
  };




  return (
    <div>
      {loader}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">المستخدمين</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <a href="javascript:;">
                  <i className="bx bx-home-alt" />
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                تعدبل بيانات المستخدم
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
              <h6 className="mb-0 text-uppercase">معلومات المستخدم</h6>
              <hr />
              <div asp-validation-summary="ModelOnly" className="text-danger" />
              <div className="row g-3">
                {/* title */}
                <div className="col-6">
                  <label className="form-label">الإسم </label>
                  <input
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                    defaultValue={row.user.fullName?? "غير مسجل"}
                    autoComplete="off"
                    asp-for="Title"
                    type="text"
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
            
              onChange={(e) => {
                uploadImage(e.target.files[0])
              }}
            />
             <div className="image">
            <img 
              src={
                
              baseurl+"images/"+image
              
              }
              width={64}
              height={64}
              alt=""
            />
          </div>
          </div>

          
                <div onClick={postForm} className="col-12">
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
