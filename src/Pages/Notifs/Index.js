import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import { baseurl } from "../../constants";

var count;
var search = "";
var source = []




export default function Notifs() {

  const [data, setData] = useState()
  const [pagination, setPagination] = useState({})
  const [loader, showLoader, hideLoader] = useLoader(); 









  const handleSearch = () => {
    let Cities = source.Cities.filter(e => e.name.contains(search))
    setData(Cities)
  }


  const rowIndex = (index) => {
    return (pagination["pageNo"] - 1) * 8 + (index + 1);
  }


  const configurePagination = (recordCount, index) => {
    if (index < 1 || index > count) return;

    let pagination = {}
    let pageSize = 8;
    const total = count / pageSize
    var totalPage = parseInt(total)
    if (total > totalPage) {
      totalPage = totalPage + 1
    }
    pagination["totalPage"] = totalPage
    pagination["pageNo"] = index
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      if ((i - index) <= 5 || i == totalPage - 1)
        pageNumbers.push(i);
    }
    pagination["paginationItems"] = pageNumbers


    setPagination(pagination)
    console.log("paginationItems");
    console.log(pagination["paginationItems"]);

    getData(index)

  }


  const getData = async (pageNo = 1) => {
    showLoader()
    const formdata = new FormData()
    formdata.append("searchData", search)
    formdata.append("pageNo", pageNo)
    try {
      const response = await fetch(baseurl + "Notif/index", {

        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: formdata
      });
      const json = await response.json();
      hideLoader()
      source = json
      count = json.count
      console.log(json);
      setData(json)
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const initData = async () => {
 
 

    await getData(1)
    configurePagination(count, 1)
  }

  useEffect(() => {

    if (!data) {
      initData()
    }
  }, []);


  return <div>
    {loader}
  <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
    <div className="breadcrumb-title pe-3">الإشعارات</div>
    <div className="ps-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 p-0">
          <li className="breadcrumb-item">
            <a href="javascript:;">
              <i className="bx bx-home-alt" />
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">الإشعارات</li>
        </ol>
      </nav>
    </div>
    <div className="ms-auto">
      <Link to={"/admin/notif/add"}>
      <div className="btn-group">
        <a  className="btn btn-success">إضافة +</a>
      </div>
      </Link>
    </div>
  </div>
  {/*end breadcrumb*/}
  <hr />

  <div className="card">
    <div className="card-body">
      <div className="table-responsive">
        <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap5">
          <div className="row">
            <div className="col-sm-12">
            <p>
                </p><div className="row justify-content-start">
                  <div className="col-12 col-md-4">
                    <div className="card-body row no-gutters align-items-start">
                      {/*end of col*/}
                      <div className="col">
                        <input autoComplete="off" onChange={e => search = e.target.value} className="form-control form-control form-control-borderless" type="search" placeholder="بحث في القائمة" />
                      </div>
                      {/*end of col*/}
                      <div className="col-auto">
                        <button onClick={e => getData(1)} className="btn btn btn-primary" type="submit">بحث</button>
                      </div>
                      {/*end of col*/}
                    </div>
                  </div>
                  {/*end of col*/}
                </div>
                <p />
              <br /><br />
        
              <table id="DataTable" className="table table-striped table-bordered dataTable" role="grid" aria-describedby="example2_info">
                <thead>
                  <tr role="row">
                    <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: '158.828px'}}><span className="mx-3">م</span></th>
                    <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: '158.828px'}}>عنوان الاشعار</th>
                    <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: '158.828px'}}>نص الاشعار</th>
                        <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: '158.828px'}}>تاريخ الاشعار </th>
                  </tr>
                </thead>
                <tbody>
                  
                 {data&&data.notifs.map((item,index)=> <tr role="row" className="odd">
                    <td>
                      <span className="mx-3">{rowIndex(index)}</span></td>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                    {/* <td>@item.User.Name</td> */}
                    <td>{item.createdAt.split("T")[0]}</td>
                  </tr>)}
                  </tbody>
              </table>
           
              <br />

              {data && <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li onClick={e => configurePagination(pagination["totalPage"], pagination["pageNo"] - 1)

                    } class="page-item">
                      <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                      </a>
                    </li>

                    {
                      pagination["paginationItems"]?.map((_, i) =>
                        pagination["pageNo"] && (((pagination["pageNo"] - i) < 5 && (i - pagination["pageNo"]) < 5) ? <li onClick={e => configurePagination(pagination["totalPage"], i + 1)

                        } class={(i + 1) != pagination["pageNo"] ? "page-item" : "page-item active"}><a class="page-link" href="#">{i + 1}</a></li> : <></>)
                      )
                    }

                    <li onClick={e => configurePagination(pagination["totalPage"], pagination["pageNo"] + 1)

                    } class="page-item">
                      <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>}
         
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>





}