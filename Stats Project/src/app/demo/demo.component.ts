import { Component, OnInit } from '@angular/core';
declare var CanvasJS:any;
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let chart = new CanvasJS.Chart("charts", {
      zoomEnabled:true,
      zoomType: "xy",
      animationEnabled: true,
      exportEnabled: true,
      title: {
      text: "bund mara"
      },
      dataPointMaxWidth: 5,
      axisX: {
      title: "Application Name"
      },
      axisY: {
      includeZero: false,
      interval: 15,
      suffix: "ms"
      },
      data: [{
      type: "rangeBar",
      color: "#014D65",
      showInLegend: true,
      yValueFormatString: "$#0.#K",
      toolTipContent: "<b>hover data</b>",
      dataPoints: [
      { y:[10, 115], label: " ", color: "red"},
      { y:[115, 141], label: " " },
      { y:[98, 115], label: " " },
      { y:[90, 160], label: " " },
      { y:[100,152], label: " " }
      ]
      }]
      });
      chart.render();
  }

}
