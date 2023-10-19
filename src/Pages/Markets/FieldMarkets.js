import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLoader from "../../Components/loader/useLoader";
import { baseurl } from "../../constants";


export default function FieldMarkets(props) {

  const [data, setData] = useState()
  const [loader, showLoader, hideLoader] = useLoader(); 

  const [cities, setCities] = useState()


  const getCities = async () => {
    showLoader()

    try {
      const response = await fetch(baseurl + "city/all", {

        method: "GET",
      });
      const json = await response.json();
      console.log(json);
      setCities(json)
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  const getData = async () => {
    const formdata = new FormData()
    console.log("field/markets");
    formdata.append("id", props.id)
    try {
      const response = await fetch(baseurl + "field/markets", {

        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: formdata
      });
      const json = await response.json();
      hideLoader()
      console.log(json);
      setData(json)
      return json;
    } catch (error) {
      hideLoader()
      console.error(error);
    }
  };

  const initData = async () => {
    await getCities()
    await getData()
  }

  useEffect(() => {

    if (!data) {
      initData()
    }
  }, []);


  return <div>
     {loader}

    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div className="breadcrumb-title pe-3">المتاجر</div>
      
    </div>
    {/*end breadcrumb*/}


    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap5">
            <div className="row">
              <div className="col-sm-12">
       

                <table id="DataTable" className="table table-striped table-bordered dataTable" role="grid" aria-describedby="example2_info">
                  <thead>
                    <tr role="row">
                      <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '158.828px' }}><span className="mx-3">م</span></th>
                      <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '158.828px' }}>الاسم باللغة العربية </th>
                      <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '261.891px' }}>
                        الاسم باللغة الإنجليزية </th>
                      <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '261.891px' }}>المدينة </th>
                      <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '261.891px' }}>صورة </th>
                      <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '261.891px' }}>تاريخ الإضافة
                      </th>
                      <th className="sorting" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-label="Office: activate to sort column ascending" style={{ width: '113.312px' }}>تعديل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map((item, index) => <tr role="row" className="odd">
                      <td><span className="mx-3">{index+1}</span></td>
                      <td>{item.name}</td>
                      <td>{item.nameEn}</td>
                      <td>{item.city}</td>
                      <td>
                        <div className="d-flex align-items-center gap-3 cursor-pointer">
                          <img src={baseurl + "/uploads/" + item.image} className="rounded-circle" width={44} height={44} alt="" />
                        </div>
                      </td>
                      <td>{item.createdAt.split("T")[0]}</td>
                      <td>

                        <Link state={{
                          row: item,
                        }} to={"/admin/market/detail"}>
                          <a type="button" asp-action="Details" className="btn btn-primary m-1 text-center"><i className="far fa-eye" /></a>
                        </Link>

                        <Link state={{
                          row: item,
                        }} to={"/admin/market/edit"}>

                          <a asp-action="Edit" asp-route-id="@item.Id" className="btn btn-success m-1 text-center"><i className="fas fa-edit" /></a>


                        </Link>

                        <Link state={{
                          row: item,
                        }} to={"/admin/market/delete"}>

                          <a asp-action="Delete" asp-route-id="@item.Id" className="btn btn-danger m-1 text-center"><i className="far fa-trash-alt" /></a>


                        </Link>


                      </td>
                    </tr>)}
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



}