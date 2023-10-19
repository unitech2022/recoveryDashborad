import React from "react";
import ReactApexChart from "react-apexcharts";

export default class PieChartView extends React.Component {


  filterData = (data) => {
    var arr = data.map(x=>data.filter(e=>e.key.title==x.title)[0]?.title ?? 0)

    // arr[0]=data.marketsByCity.filter(e=>e.key.city==data.cities[0].name)[0]?.value ?? 0
    // arr[1]=data.marketsByCity.filter(e=>e.key.city==data.cities[1].name)[0]?.value ?? 0
    // arr[2]=data.marketsByCity.filter(e=>e.key.city==data.cities[2].name)[0]?.value ?? 0
    // arr[3]=data.marketsByCity.filter(e=>e.key.city==data.cities[3].name)[0]?.value ?? 0
    console.log(arr);

    return arr
  };

    constructor(props) {
      super(props);
      this.state = {
        series: this.filterData(this.props.data),
        options: {
          chart: {
            type: 'pie',
          },
          labels: this.props.data.cities.map(e=>e.title),
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 500
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      
      
      };
    }

  

    render() {
      return (
        

  
<ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={'100%'} height={'350px'}/>

      );
    }
  }