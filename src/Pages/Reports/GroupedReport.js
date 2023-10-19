import { useEffect, useState } from "react";
import useLoader from "../../Components/loader/useLoader";
import { baseurl } from "../../constants";

export default function GroupedReport() {
    const [data, setData] = useState()
    const [loader, showLoader, hideLoader] = useLoader(); 

    const getReports = async (event) => {
        showLoader()
        event.preventDefault();
        const formdata = new FormData(event.target);
        try {
            const response = await fetch(baseurl + "api/grouped-report", {
                method: "POST",
                body:formdata
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
    }



    return <div>
        {loader}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">تقرير مجمع</div>
            <div className="ps-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 p-0">
                        <li className="breadcrumb-item">
                            <a href="javascript:;">
                                <i className="bx bx-home-alt" />
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">المتاجر</li>
                    </ol>
                </nav>
            </div>

        </div>
        <hr />


        <div className="card">
            <div className="card-body">
                <form onSubmit={getReports}> 
                <div className="row">
                    <div class="col-xl-4 col-lg-12 mb-3">
                        <label class="form-label">من تاريخ</label>
                        <input type="date" name="startDate" class="form-control" />
                    </div>
                    <div class="col-xl-4 col-lg-12 mb-3">
                        <label class="form-label">إلي تاريخ</label>
                        <input type="date" name="endDate" class="form-control" />
                    </div>


                    <div class="col-xl-4 col-lg-12 mb-3">
                        <label class="form-label text-light">بحث</label>
                        <div className="col-auto">
                            <button onClick={e => console.log()} className="btn btn btn-primary" type="submit">بحث</button>
                        </div>		</div>

                </div>
                </form>
                <div className="table-responsive">
                    <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap5">
                        <div className="row">
                            <div className="col-sm-12">


                                <br /><br />

                                <table id="DataTable" className="table table-striped table-bordered dataTable" role="grid" aria-describedby="example2_info">
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '158.828px' }}><span className="mx-3">م</span></th>
                                            <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '158.828px' }}>المتجر  </th>
                                            <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '158.828px' }}>رقم التواصل   </th>
                                            <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '158.828px' }}>عدد العروض   </th>
                                            <th className="sorting_asc" tabIndex={0} aria-controls="example2" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '158.828px' }}>تاريخ الإنضمام   </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data&&data.map((item)=><tr role="row" className="odd">
                                            <td><span className="mx-3">1</span></td>
                                            <td>{item.market.name}</td>
                                            <td>{item.market.phone}</td>

                                            <td>{item.productCount}</td>
                                            <td>{item.market.createdAt.split("T")[0]}</td>
                                        </tr>)                                           }
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