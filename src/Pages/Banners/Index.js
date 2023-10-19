import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import { baseurl } from "../../constants";

import Switch from "@mui/material/Switch";
import ReactPaginate from "react-paginate";
var count;
var search = "";
var source = [];

export default function Banners() {
  const [data, setData] = useState();
  const [pagination, setPagination] = useState({});

  const [cities, setCities] = useState();
  const [markets, setmarkets] = useState();

  const [loader, showLoader, hideLoader] = useLoader();

  //** get data  */
  const getData = async () => {
    showLoader();
    try {
      const response = await fetch(baseurl + "dashboard/get-offers", {
        method: "GET",
      });
      const json = await response.json();
      console.log(json);
      setData(json);
      hideLoader();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  //** update banners */
  const updateBanner = async (providerId, status) => {
    showLoader();
    try {
      var formdata = new FormData();
      formdata.append("id", providerId);
      formdata.append("status", status);

      const response = await fetch(baseurl + "offers/update-status-Offer", {
        body: formdata,
        method: "POST",

        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // },
      });
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

  useEffect(() => {
    if (!data) {
      getData()
    }
  }, []);

  return (
    <>
      <div>
        {loader}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">الاعلانات</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="javascript:;">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  قائمة الاعلانات
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
                            style={{ width: "40.828px" }}
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
                            style={{ width: "120.828px" }}
                          >
                            {" "}
                            وصف الاعلان{" "}
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
                            الصورة{" "}
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
                            تاريخ الإضافة
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
                            نشر / ايقاف
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
                            تفاصيل
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.map((item, index) => (
                            <tr role="row" className="odd">
                              <td className="text-center align-middle">
                                {item.id}
                              </td>
                              <td className="text-center align-middle">
                                {item.descAr}
                              </td>
                              <td className="text-center align-middle">
                                <div className="gap-3 cursor-pointer">
                                  <img
                                    className="rounded-circle"
                                    src={
                                      baseurl +
                                      "/images/" +
                                      item.image
                                    }
                                    width={64}
                                    height={64}
                                    alt=""
                                  />
                                </div>
                              </td>
                              <td className="text-center align-middle">
                                {item.createdAt.split("T")[0]}
                              </td>
                            
                            
                             
                             
                              <td className="text-center align-middle">
                                <div
                                  onClick={() =>
                                    updateBanner(
                                      item.id,
                                      item.status === 0 ? 1 : 0
                                    )
                                  }
                                 
                                >
                                
                                  <Switch
                                    checked={
                                      item.status === 0 ? true : false
                                    }
                                    inputProps={{ "aria-label": "Switch A" }}
                                  />
                                </div>
                          
                              </td>
                              <td className="text-center align-middle">
                                <Link
                                  state={{
                                    row: item,
                                  }}
                                  to={"/admin/banner/edit"}
                                >
                                  <a
                                    asp-action="Edit"
                                    asp-route-id="@item.Id"
                                    className="btn btn-success m-1 text-center"
                                  >
                                    <i className="fas fa-edit" />
                                  </a>
                                </Link>

                                <Link
                                  state={{
                                    row: item,
                                  }}
                                  to={"/admin/banner/Delete"}
                                >
                                  <a
                                    asp-action="Delete"
                                    asp-route-id="@item.Id"
                                    className="btn btn-danger m-1 text-center"
                                  >
                                    <i className="far fa-trash-alt" />
                                  </a>
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <br />
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
