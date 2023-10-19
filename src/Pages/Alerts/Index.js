import { useEffect, useState } from "react";
import useLoader from "../../Components/loader/useLoader";
import { Link } from "react-router-dom";
import { baseurl } from "../../constants";

var count;
var search = "";
var source = [];
export default function Alerts() {
  const [data, setData] = useState();
  const [pagination, setPagination] = useState({});

  const [loader, showLoader, hideLoader] = useLoader();

  const handleSearch = () => {
    let fields = source.items.filter((e) => e.name.contains(search));
    setData(fields);
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

    getData(index, search);
  };

  const getData = async (pageNo = 1, textSearch) => {
    //   console.log("stttatstter")
    showLoader();
    const formdata = new FormData();
    formdata.append("page", pageNo);
    formdata.append("textSearch", textSearch);
    try {
      const response = await fetch(baseurl + "dashboard/get-alerts", {
        method: "POST",
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // },

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

  const initData = async () => {
    getData(1, search);
    configurePagination(count, 1);
  };

  useEffect(() => {
    if (!data) {
      initData();
    }
  }, []);


  return (
    <div>
      {loader}

      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">الاشعارات</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <a href="javascript:;">
                  <i className="bx bx-home-alt" />
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                قائمة الاشعارات 
              </li>
            </ol>
          </nav>
        </div>
        {/* <div className="ms-auto">
      <Link to={"/admin/market/add"}>

        <div className="btn-group">
          <a  className="btn btn-success">إضافة +</a>
        </div>
        </Link>
      </div> */}
      </div>
      {/*end breadcrumb*/}
      <hr />

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
                        {/*end of col*/}
                        <div className="col">
                          <input
                            autoComplete="off"
                            onChange={(e) => (search = e.target.value)}
                            name="SearchData"
                            className="form-control form-control form-control-borderless"
                            type="search"
                            placeholder="بحث في القائمة"
                          />
                        </div>
                        {/*end of col*/}
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
                          style={{ width: "100.828px" }}
                        >
                          {" "}
                          العنوان بالعربية{" "}
                        </th>
                        <th
                          className="sorting_asc text-center align-middle"
                          tabIndex={0}
                          aria-controls="example2"
                          rowSpan={1}
                          colSpan={1}
                          aria-sort="ascending"
                          aria-label="Name: activate to sort column descending"
                          style={{ width: "100.828px" }}
                        >
                          {" "}
                          العنوان بالانجليزية{" "}
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
                          الموضوع بالعربية{" "}
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
                          الموضوع بالإنجليزية
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
                          تاريخ
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
                          حذف
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.items.map((item, index) => (
                          <tr role="row" className="odd">
                            <td className="text-center align-middle">
                              {item.id}
                            </td>
                            <td className="text-center align-middle">
                              {item.titleAr}
                            </td>
                            <td className="text-center align-middle">
                              {item.titleEng}
                            </td>
                            <td className="text-center align-middle">
                              {item.descriptionAr}
                            </td>

                            <td className="text-center align-middle">
                              {item.descriptionEng}
                            </td>

                            <td className="text-center align-middle">
                              {item.createdAt.split("T")[0]}
                            </td>

                            <td className="text-center align-middle">
                              <Link
                                state={{
                                  row: item,
                                }}
                                to={"/admin/alert/delete"}
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
  );
}
