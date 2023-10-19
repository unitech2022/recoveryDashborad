import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseurl, errorNotify, errorNotifyMessage, successNotify } from "../../constants";
import FieldMarkets from "../Markets/FieldMarkets";
import validator from 'validator';
import useLoader from "../../Components/loader/useLoader";

export default function CategoryDetail() {
  const [isEnable, setIsEnable] = useState(false);
  const [mony, setMony] = useState(0.0);
  const [wallet, setWallet] = useState(0.0);
  const [loader, showLoader, hideLoader] = useLoader();
  const location = useLocation();
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  const row = location.state.row;

  const paymentToProvider = async (type, mony) => {
    showLoader();
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var formdata = new FormData();
    formdata.append("type", type);
    formdata.append("UserId", row.provider.userId);
    formdata.append("mony", mony);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(baseurl + "dashboard/payment-provider", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        hideLoader();
        successNotify();
        if (type === 0) {
          setWallet(0.0);
        } else {
          //  lat newWallet=   Number(row.wallet) + Number(mony)
          setWallet(Number(wallet) + Number(mony));
          setIsEnable(!isEnable);
        }
        hideLoader();
        console.log(result);
      })

      .catch((error) => {
        hideLoader();
        console.log("error", error);

        errorNotify();
      });
  };

  useEffect(() => {
    setWallet(row.provider.wallet);
  }, []);

  return (
    <>
    {loader}
      {/* <h1>{row.title}</h1> */}
      <div className="">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">المزودين</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="javascript:;">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  تفاصيل
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <hr />
        <div className="col-xl-12 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="border p-3 rounded">
                <h6 className="mb-0 text-uppercase">معلومات المزود</h6>
                <hr />
                <div
                  asp-validation-summary="ModelOnly"
                  className="text-danger"
                />
                {/* * name , address*/}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label">الإسم</label>
                      <input
                        disabled
                        autoComplete="off"
                        value={row.provider.title}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label">العنوان</label>
                      <input
                        disabled
                        autoComplete="off"
                        value={row.provider.addressName}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                  </div>
                </div>
                <br />
                <br />
                {/* * admin , details*/}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label">الايميل</label>
                      <input
                        disabled
                        autoComplete="off"
                        value={row.provider.email}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                  </div>

                  {/* phone */}
                
                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label">رقم الهاتف </label>
                      <input
                        disabled
                        autoComplete="off"
                        value={row.userDetail.userName}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                
                 
                </div>
                
                    <div className="col-12">
                      <label className="h5 form-label">التفاصيل</label>
                      <textarea
                        wrap="soft"
                        rows="5"
                        cols="150"
                        disabled
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        value={row.provider.about}
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                
                </div>
                <br />
                {/* iban  */}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label">الآيبــان </label>
                      <input
                        disabled
                        autoComplete="off"
                        value={row.provider.iBan}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label">اسم البنك</label>
                      <input
                        disabled
                        autoComplete="off"
                        value={row.provider.nameBunk}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>
                  </div>
                </div>
                <br />
                {/*  */}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="col-6 text-center">
                      <label htmlFor="ImageFile" className="h5 form-label">
                        {" "}
                        شعار الشركة
                      </label>
                      <div className="text-center">
                        <a href={baseurl + "/images/" + row.provider.logoCompany}>
                          <img
                            style={{ width: "10vw", height: "10vw" }}
                            src={baseurl + "/images/" + row.provider.logoCompany}
                            className="rounded float-center"
                          />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 text-center">
                    <label htmlFor="ImageFile" className="h5 form-label">
                      {" "}
                      صورة الاثبات
                    </label>
                    <div className="text-center">
                      <a href={baseurl + "/images/" + row.provider.imagePassport}>
                        <img
                          style={{ width: "10vw", height: "10vw" }}
                          src={baseurl + "/images/" + row.provider.imagePassport}
                          className="rounded float-center"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                {/* Wallet */}

                {/* * wallet */}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="col-12">
                      <label className="h5 form-label"> الرصيد </label>
                      <input
                        disabled
                        autoComplete="off"
                        value={Number((wallet).toFixed(1))  + "  ريال سعودى  "}
                        type="text"
                        className="form-control"
                      />
                      <span asp-validation-for="Name" className="text-danger" />
                    </div>

                    {isEnable ? (
                      <div className="col-6">
                        <label className="form-label"></label>
                        <input
                          // value={title}
                          placeholder="أدخل المبلغ الذى تريد ايداعه"
                          
                          onChange={(event) => {
                          
                               setMony(event.target.value);
                          
                          
                          }}
                          required
                          autoComplete="off"
                       
                          type="number"
                          pattern="[0-9]+([,\.][0-9]+)?"
                          className="form-control"
                        />

                        <button
                          onClick={() => {
                            if(validator.isDecimal(mony)) {
                              paymentToProvider(1, mony);
                           }else {
                           errorNotifyMessage("الرقم الذى أدخلته غير صحيحا الرجاء المحاولة مرة اخرى")
                           }
                           
                          }}
                          type="button"
                          class="btn btn-outline-dark m-1"
                        >
                          ايداع
                        </button>
                        <br />
                        <br />
                      </div>
                    ) : null}

                    <button
                      onClick={() => {
                        
                        paymentToProvider(0, 0);
                      }}
                      type="button"
                      class="btn btn-success"
                    >
                       دفــع 
                    </button>

                    <button
                      onClick={() => {
                        setIsEnable(!isEnable);
                      }}
                      type="button"
                      class="btn btn-outline-success m-2"
                    >
                      {!isEnable ? "ايـــداع" : "الغاء"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <FieldMarkets id={row.id}/> */}
    </>
  );
}
