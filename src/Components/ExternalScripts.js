import { Helmet } from "react-helmet";

export default function ExternalScripts(){
    return <Helmet>
    <script defer src="../js/bootstrap.bundle.min.js"></script>
      <script defer src="../js/jquery.min.js"></script>
      <script defer src="../plugins/simplebar/js/simplebar.min.js"></script>
      <script defer src="../plugins/metismenu/js/metisMenu.min.js"></script>
      <script defer src="../plugins/perfect-scrollbar/js/perfect-scrollbar.js"></script>
      <script defer src="../js/pace.min.js"></script>
      <script defer src="../plugins/chartjs/js/Chart.min.js"></script>
      <script defer src="../plugins/chartjs/js/Chart.extension.js"></script>
      <script defer src="../plugins/apexcharts-bundle/js/apexcharts.min.js"></script>
      <script defer src="../plugins/vectormap/jquery-jvectormap-2.0.2.min.js"></script>
      <script defer src="../plugins/vectormap/jquery-jvectormap-world-mill-en.js"></script>
      <script defer src="../js/app.js"></script>
      <script defer src="../js/index.js"></script>
      </Helmet>
}