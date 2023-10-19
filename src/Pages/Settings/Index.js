import { useEffect, useState } from "react";
import useLoader from "../../Components/loader/useLoader";
import { Link } from "react-router-dom";
import { baseurl } from "../../constants";
export default function Settings() {
    const [data, setData] = useState();

  const [loader, showLoader, hideLoader] = useLoader();

  useEffect(() => {
   
    getData();
  
}, []);
// ** get data
const getData = async () => {
    //   console.log("stttatstter")
    showLoader();
 
    try {
        
      const response = await fetch(baseurl + "setting/get-settings", {
        method: 'GET',
       
        redirect: 'follow'
       
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



  return (
    <>
       <div>
        {loader}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">الاعدادات</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="javascript:;">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  قائمة الاعدادات
                </li>
              </ol>
            </nav>
          </div>
          <div className="ms-auto">
          
          </div>
        </div>
     
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
                    <p/>
                    <br/>
                    <br/>

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
                            style={{ width: "120.828px" }}
                          >
                            {" "}
                           الاســـم{" "}
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
                           القيمة{" "}
                          </th>
                          <th
                            className="sorting_asc text-center align-middle"
                            tabIndex={0}
                            aria-controls="example2"
                            rowSpan={1}
                            colSpan={1}
                            aria-sort="ascending"
                            aria-label="Name: activate to sort column descending"
                            style={{ width: "50.828px" }}
                          >
                            {" "}
                           تعديل{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.map((item, index) => (
                            <tr role="row" className="odd">
                              <td className="text-center align-middle">{index}</td>
                              <td className="text-center align-middle">{item.name}</td>
                              <td className="text-center align-middle">{item.value}</td>
                              
                             <td  className="text-center align-middle">
                             <Link state={{
                          row: item,
                        }} to={"/admin/Setting/edit"}>
                           <a asp-action="Edit" asp-route-id="@item.Id" className="btn btn-success m-1 text-center"><i className="fas fa-edit" /></a>
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
