import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { baseurl, uploadImage } from "../constants";
import useLoader from "../Components/loader/useLoader";
import Switch from "@mui/material/Switch";

export default function Home() {
  const [data, setData] = useState();
  const [loader, showLoader, hideLoader] = useLoader();
  const [pagination, setPagination] = useState({});

  //** get data */
  const getData = async () => {
    showLoader();
    try {
      const response = await fetch(
        baseurl + "dashboard/home?userId=" + localStorage.getItem("id"),
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      console.log(json);
      hideLoader();
      setData(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const rowIndex = (index) => {
    return (pagination["pageNo"] - 1) * 8 + (index + 1);
  };

  //** update provider */

 //** update product */
 const updateSubscrip = async (subscribeId, status) => {
  showLoader();
  try {
    var formdata = new FormData();
    formdata.append("subscribeId", subscribeId);
    formdata.append("status", status);

    const response = await fetch(
      baseurl + "dashboard/update-subscription",
      {
        body: formdata,
        method: "POST",

        
      }
    );
    const json = await response.json();
    console.log(json);
    getData(pagination["pageNo"]);
    hideLoader();
    // setData(json);
    return json;
  } catch (error) {
    hideLoader();
    console.error(error + "errrrrrrrr");
  }
};

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loader}
      {data && (
        <>
          <div class="row row-cols-1 text-white row-cols-lg-2 row-cols-xl-4">
            <div class="col">
              <div class="card rounded-4  bg-primary">
                <div class="card-body ">
                  <div class="d-flex align-items-center">
                    <div class="">
                      <p class="mb-1">الاعلانات</p>
                      <h4 class="mb-0">{data.offers}</h4>
                      <p class="mb-0 mt-2 font-13">
                        <i class="bi bi-arrow-up"></i>
                        <span>عدد الاعلانات : {data.offers}</span>
                      </p>
                    </div>
                    <div class="ms-auto widget-icon bg-white text-primary">
                      <i class="bi bi-grid-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-success rounded-4">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="">
                      <p class="mb-1">التصنيفات</p>
                      <h4 class="mb-0">{data.fields}</h4>
                      <p class="mb-0 mt-2 font-13">
                        <i class="bi bi-arrow-up"></i>
                        <span>عدد التصنيفات : {data.fields}</span>
                      </p>
                    </div>
                    <div class="ms-auto widget-icon bg-white text-success">
                      <i class="bi bi-basket2-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-orange rounded-4">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="">
                      <p class="mb-1">الأقسام</p>
                      <h4 class="mb-0">{data.categories}</h4>
                      <p class="mb-0 mt-2 font-13">
                        <i class="bi bi-arrow-up"></i>
                        <span>عدد الأقسام : {data.categories} </span>
                      </p>
                    </div>
                    <div class="ms-auto widget-icon bg-white text-orange">
                      <i class="bi bi-award-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-secondary rounded-4">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="">
                      <p class="mb-1">المتاجر</p>

                      <h4 class="mb-0">{data.markets}</h4>
                      <p class="mb-0 mt-2 font-13">
                        <i class="bi bi-arrow-up"></i>
                        <span>عدد المتاجر : {data.markets}</span>
                      </p>
                    </div>
                    <div class="ms-auto widget-icon bg-white text-secondary">
                      <i class="bx bxs-package"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="row p-3 m-1 ">
                {/* <div class="col-xl-6 col-lg-6   mb-4">
  <div className="chart-box">
    <h3 className="chart-header">  المتاجر</h3>
    <ChartView data={data} />
  </div>
</div> */}

                <div className="home-footer">
                  <div>
                    <h3 className="home-order-header">
                      {" "}
                    دفع ركوفرى كارد
                    </h3>
                    {/* //* providers */}
                    <div>
                      <table
                        id="DataTable"
                        className="table table-striped table-bordered dataTable"
                        role="grid"
                        aria-describedby="example2_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              className="sorting_asc text-center align-middle"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-sort="ascending"
                              aria-label="Name: activate to sort column descending"
                              style={{ width: "30.828px" }}
                            >
                              <span className="mx-3">م</span>
                            </th>
                            <th
                              className="sorting_asc text-center align-middle"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-sort="ascending"
                              aria-label="Name: activate to sort column descending"
                              style={{ width: "158.828px" }}
                            >
                              {" "}
                              الاسم الاول{" "}
                            </th>

                            <th
                              className="sorting text-center align-middle"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Position: activate to sort column ascending"
                              style={{ width: "120.891px" }}
                            >
                              الاسم الاخير{" "}
                            </th>
                            <th
                              className="sorting text-center align-middle"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Position: activate to sort column ascending"
                              style={{ width: "80.891px" }}
                            >
                               صورة الكارد{" "}
                            </th>
                            <th
                              className="sorting text-center align-middle"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Position: activate to sort column ascending"
                              style={{ width: "100.891px" }}
                            >
                             رقم الهاتف
                            </th>
                            <th
                              className="sorting text-center align-middle"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Position: activate to sort column ascending"
                              style={{ width: "100.891px" }}
                            >
                            العنوان
                            </th>
                            <th
                              className="sorting text-center align-middle"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Position: activate to sort column ascending"
                              style={{ width: "70.891px" }}
                            >
                              التاريخ
                            </th>
                            <th
                              className="sorting text-center align-middle"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Position: activate to sort column ascending"
                              style={{ width: "70.891px" }}
                            >
                              الحالة
                            </th>
                            <th
                              className="sorting text-center align-middle"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Office: activate to sort column ascending"
                              style={{ width: "60.312px" }}
                            >
                              تمت /  فشلت
                            </th>
                            {/* <th
                              className="sorting text-center align-middle"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Position: activate to sort column ascending"
                              style={{ width: "100.891px" }}
                            >
                              تفاصيل
                            </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {data &&
                            data.lastSubscriptions.map((item, index) => (
                              <tr role="row" className="odd">
                                {/* <span className="mx-3">{rowIndex(index)}</span> */}
                                <td className="text-center align-middle">
                                  {item.subscription.id}
                                </td>
                                <td className="text-center align-middle">
                                  {item.subscription.firstName}
                                </td>

                                <td className="text-center align-middle">
                                  {item.subscription.lastName}
                                </td>

                                {/* <td>{item.addressName}</td> */}
                                <td className="text-center align-middle">
                                  <div className=" gap-3 cursor-pointer">
                                    <a
                                      href={
                                        baseurl +
                                        "/images/" +
                                        item.card.image
                                      }
                                    >
                                      <img
                                        className="rounded-circle"
                                        src={
                                          baseurl +
                                          "/images/" +
                                          item.card.image
                                        }
                                        // className="rounded-circle"
                                        width={80}
                                        height={80}
                                        alt=""
                                      />
                                    </a>
                                  </div>
                                </td>
                                <td className="text-center align-middle">
                                  {item.subscription.phone}
                                </td>
                                <td className="text-center align-middle">
                                  {item.subscription.address}
                                </td>
                                <td className="text-center align-middle">
                                  {item.subscription.createdAt.split("T")[0]}
                                </td>
                                <td className={item.subscription.status===0?"text-dark text-center align-middle":"text-success text-center align-middle"}>
                                  {item.subscription.status === 1
                                    ? "تمت"
                                    : "معلق"}
                                </td>

                                <td className="text-center align-middle">
                                  {/* <Link state={{
                          row: item,
                        }} to={"/admin/Product/detail"}>
                          <a type="button" asp-action="Details" className="btn btn-primary m-1 text-center"><i className="far fa-eye" /></a>
                        </Link>
*/}
                                  <div
                                    onClick={() =>
                                      
                                      updateSubscrip(
                                        item.subscription.id,
                                        item.subscription.status === 0 ? 1 : 0
                                      )
                                    }
                                    // state={{
                                    //   row: item,
                                    // }}
                                    // to={"/admin/Product/edit"}
                                  >
                                    {/* <a
                                      asp-action="Edit"
                                      asp-route-id="@item.Id"
                                      className="btn btn-success m-1 text-center"
                                    >
                                      <i className="fas fa-edit" />
                                    </a> */}
                                    <Switch
                                      checked={
                                        item.subscription.status === 1
                                          ? true
                                          : false
                                      }
                                      inputProps={{ "aria-label": "Switch A" }}
                                    />
                                  </div>

                                  {/* <Link
                                    state={{
                                      row: item,
                                    }}
                                    to={"/admin/Product/delete"}
                                  >
                                    <a
                                      asp-action="Delete"
                                      asp-route-id="@item.Id"
                                      className="btn btn-danger m-1 text-center"
                                    >
                                      <i className="far fa-trash-alt" />
                                    </a>
                                  </Link> */}
                                </td>

                                {/*  details */}
                                {/* <td className="text-center align-middle">
                                  {" "}
                                  <Link
                                    state={{
                                      row: item,
                                    }}
                                    to={"/admin/fields/detail"}
                                  >
                                    <a
                                      type="button"
                                      asp-action="Details"
                                      className="btn btn-primary m-1 text-center"
                                    >
                                      <i className="far fa-eye" />
                                    </a>
                                  </Link>
                                  <Link
                                    state={{
                                      row: item,
                                    }}
                                    to={"/admin/field/edit"}
                                  >
                                    <a
                                      asp-action="Edit"
                                      asp-route-id="@item.Id"
                                      className="btn btn-success m-1 text-center"
                                    >
                                      <i className="fas fa-edit" />
                                    </a>
                                  </Link>
                                </td> */}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    {/* <PieChartView data={data.lastProviders} /> */}
                  </div>
                </div>
                {/* 
<div class="col-xl-6 col-lg-6   mb-4">
  <div className="chart-box ">
    <h3 className="chart-header"> المستخدمين</h3>
    <LineChart data={data}/>
  </div>

</div>
<div class="col-xl-6 col-lg-6   mb-4">
  <div className="chart-box">
    <h3 className="chart-header"> العروض الفعالة</h3>
    <OrderStatusChart data={data} />
  </div>
</div> */}

                {/* 

<div class="col-xl-6 col-lg-6   mb-4">
  <div className="chart-box">
    <h3 className="chart-header">  المستخدمين</h3>
    <LineChart data={data} />
  </div>
</div>

<div class="col-xl-6 col-lg-6   mb-4">
  <div className="chart-box">
    <h3 className="chart-header">  نسبة ال للمدينة </h3>
    <DriversRateChart data={data} />
  </div>
</div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
