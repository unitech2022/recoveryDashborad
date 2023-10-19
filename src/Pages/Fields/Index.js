import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import { baseurl } from "../../constants";





export default function Fields() {
  const [data, setData] = useState();
  const [pagination, setPagination] = useState({});







  const [loader, showLoader, hideLoader] = useLoader();

  //** get data  */
  const getData = async (pageNo = 1, textSearch) => {
    showLoader();
    const formdata = new FormData();
  
    try {
      formdata.append("page", pageNo);
      formdata.append("textSearch", textSearch);
      const response = await fetch(baseurl + "dashboard/get-fields", {
        method: "POST",
      
      
      });
      const json = await response.json();
      hideLoader();
   
      console.log(json);
      setData(json);
      return json;
    } catch (error) {
      hideLoader();
      console.error(error + "kjjjjjjj");
    }
  };

  //** update product */
  const updateProduct = async (providerId, status) => {
    showLoader();
    try {
      var formdata = new FormData();
      formdata.append("productId", providerId);
      formdata.append("status", status);

      const response = await fetch(
        baseurl + "dashboard/update-product-status",
        {
          body: formdata,
          method: "POST",

          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      console.log(json);
      getData();
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
    getData(1, "not");
    // configurePagination(count, 1);
  
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
                  قائمة التصنيفات
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
                            className="sorting_asc"
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
                           الاســـم باللغة العربية{" "}
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
                           الاســـم باللغة الانجليزية{" "}
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
                            صورة{" "}
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
                            aria-label="Position: activate to sort column ascending"
                            style={{ width: "80.891px" }}
                          >
                            تعديل
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.items.map((item, index) => (
                            <tr role="row" className="odd">
                              <td className="text-center align-middle">{item.id}</td>
                              <td className="text-center align-middle">{item.nameAr}</td>
                             
                              <td className="text-center align-middle">{item.nameEng}</td>
                              <td className="text-center align-middle">
                                <div className=" gap-3 cursor-pointer ">
                                  <img className="rounded=circle"
                                    src={
                                      baseurl +
                                      "/images/" +
                                      item.imageUrl
                                    }
                                    width={64}
                                    height={64}
                                    alt=""
                                  />
                                </div>
                              </td>
                              <td className="text-center align-middle">{item.createdAt.split("T")[0]}</td>

                              <td className="text-center align-middle">

                        

                        <Link state={{
                          row: item,
                        }} to={"/admin/Field/add"}>

                          <a asp-action="Edit" asp-route-id="@item.Id" className="btn btn-success m-1 text-center"><i className="fas fa-edit" /></a>


                        </Link>

                        <Link state={{
                          row: item,
                        }} to={"/admin/Field/Delete"}>

                          <a asp-action="Delete" asp-route-id="@item.Id" className="btn btn-danger m-1 text-center"><i className="far fa-trash-alt" /></a>


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