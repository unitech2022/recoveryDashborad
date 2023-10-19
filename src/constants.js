import { toast } from "react-hot-toast";
import axios from "axios";
  export const baseurl = "https://mohafez.urapp.site/"
// export const baseurl = "http://localhost:5010/";
export const onInputInvalid = (e) =>
  e.target.setCustomValidity("هذا الحقل مطلوب");

export const OnInput = (e) => e.target.setCustomValidity("");

export const uploadImage = async (file) => {
  const formdata = new FormData();
  formdata.append("file", file);
  try {
    const response = await fetch(baseurl + "image/upload/image", {
      method: "POST",
      body: formdata,
    });
    const json = await response.json();
    console.error(json.image + "image");
    return json.image;
  } catch (error) {
    console.error(error + "error");
  }
};

export const uploadImageHatli = async (file) => {
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

        return e.data;
      });
  } catch (e) {
    console.log(e);
  }
};

export const successNotify = () => toast.success("تمت العملية بنجاح");
export const errorNotify = () =>
  toast.error("هناك خطأ في البيانات الرجاء التأكد وإعادة المحاولة");
export const errorNotifyMessage = (message) => toast.error(message);
