import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import { baseurl } from "../../constants";

import Switch from "@mui/material/Switch";

var count;
var search = "";
var source = [];

export default function Subscriptions() {
  const [data, setData] = useState();
  const [pagination, setPagination] = useState({});

  const [cities, setCities] = useState();
  const [markets, setmarkets] = useState();

  const handleSearch = () => {
    let Products = source.items.filter((e) => e.name.contains(search));
    setData(Products);
  };

  const rowIndex = (index) => {
    return (pagination["pageNo"] - 1) * 8 + (index + 1);
  };

  const configurePagination = (recordCount, index) => {
    if (index < 1 || index > count) return;

    let pagination = {};
    let pageSize = 1;
    const total = count / pageSize;
    var totalPage = parseInt(total);
    if (total > totalPage) {
      totalPage = totalPage + 1;
    }

    pagination["totalPage"] = totalPage;

    pagination["pageNo"] = index;

    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      if (i - index <= 5 || i === totalPage - 1) pageNumbers.push(i);
    }
    pagination["paginationItems"] = pageNumbers;

    setPagination(pagination);
    console.log("paginationItems");
    console.log(pagination["paginationItems"]);

    getData(index,search);
  };

  const [loader, showLoader, hideLoader] = useLoader();

  //** get data  */
  const getData = async (pageNo = 1, textSearch) => {
    showLoader();
    const formdata = new FormData();
    formdata.append("page", pageNo);
   formdata.append("textSearch", textSearch);
    try {
      const response = await fetch(baseurl + "dashboard/get-subscriptions", {
        method: "POST",
    

        body: formdata,
      });
      const json = await response.json();
      hideLoader();
      source = json;
      count = json.totalPages;
      console.log(json);
      setData(json);
      return json;
    } catch (error) {
      hideLoader();
      console.error(error + "kjjjjjjj");
    }
  };

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
      getData(pagination["pageNo"], search);
      hideLoader();
      // setData(json);
      return json;
    } catch (error) {
      hideLoader();
      console.error(error + "errrrrrrrr");
    }
  };
  const initData = async () => {
    // if (!markets) {
    //   await getmarkets()
    // }

    getData(1, search);
    configurePagination(count, 1);
  };

  useEffect(() => {
    if (!data) {
      initData();
    }
  }, []);

  return (
    <>
      <div>
        {loader}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">طلبات الاشتراكات </div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="javascript:;">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  قائمة  اشتراكات العملاء
                </li>
              </ol>
            </nav>
          </div>
          <div className="ms-auto">
            {/* <Link to={"/admin/Product/add"}>

        <div className="btn-group">
          <a  className="btn btn-success">إضافة +</a>
        </div>
        </Link> */}
          </div>
        </div>
        {/*end breadcrumb*/}
        <hr />

        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <div
                id="example2_wrapper"
                className="dataTables_wrapper dt-bootstrap5"
              >
                <div className="row">
                  <div className="col-sm-12">
                    <p></p>

                    <div className="row justify-content-start">
                      <div className="col-12 col-md-4">
                        <div className="card-body row no-gutters align-items-start">
                        
                           <div className="col">
                            <input
                              autoComplete="off"
                              onChange={(e) => (search = e.target.value)}
                              className="form-control form-control form-control-borderless"
                              type="search"
                              placeholder=" بحث في القائمة بالاسم الاول"
                            />
                          </div> 
                        
                         <div className="col-auto">
                            <button
                              onClick={(e) => getData(1, search)}
                              className="btn btn btn-primary"
                              type="submit"
                            >
                              بحث
                            </button>
                          </div> 
                          {/*end of col*/}
                        </div>
                      </div>
                      {/*end of col*/}
                    </div>
                    
                    <p />

                    <br />
                    <br />

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
                            data.items.map((item, index) => (
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
                                    onClick={() =>{
                                       updateSubscrip(
                                        item.subscription.id,
                                        item.subscription.status === 0 ? 1 : 0
                                      )
                                    }
                                     
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
                    <br />

                    {data && (
                         <nav aria-label="Page navigation example">
                         <ul class="pagination">
                           <li
                             onClick={(e) =>
                               configurePagination(
                                 pagination["totalPage"],
                                 pagination["pageNo"] - 1
                               )
                             }
                             class="page-item"
                           >
                             <a class="page-link" href="#" aria-label="Previous">
                               <span aria-hidden="true">&laquo;</span>
                               <span class="sr-only">Previous</span>
                             </a>
                           </li>
   
                           {pagination["paginationItems"]?.map(
                             (_, i) =>
                               pagination["pageNo"] &&
                               (pagination["pageNo"] - i < 5 &&
                               i - pagination["pageNo"] < 5 ? (
                                 <li
                                   onClick={(e) =>
                                     configurePagination(
                                       pagination["totalPage"],
                                       i + 1
                                     )
                                   }
                                   class={
                                     i + 1 != pagination["pageNo"]
                                       ? "page-item"
                                       : "page-item active"
                                   }
                                 >
                                   <a class="page-link" href="#">
                                     {i + 1}
                                   </a>
                                 </li>
                               ) : (
                                 <></>
                               ))
                           )}
   
                           <li
                             onClick={(e) =>
                               configurePagination(
                                 pagination["totalPage"],
                                 pagination["pageNo"] + 1
                               )
                             }
                             class="page-item"
                           >
                             <a class="page-link" href="#" aria-label="Next">
                               <span aria-hidden="true">&raquo;</span>
                               <span class="sr-only">Next</span>
                             </a>
                           </li>
                         </ul>
                       </nav>

                    
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
