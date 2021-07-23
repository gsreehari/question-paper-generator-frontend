import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType, ChartOptions, ChartColor } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersCount: number = 0;
  subjectsCount: number = 0;
  questionsCount: number = 0;
  questionPapersCount: number = 0;
  Linechart:any;
  piedata = [];
  bardata = [];
  public pieChartLabels: Label[] = ['Admin', 'Faculty', 'Both'];
  public pieChartData: SingleDataSet =[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public backgroundColor = [{backgroundColor: ["#3ebf9b", "#4d86dc", "#f3af37"]}];

  
  public barchartoptions = {
      responsive: true,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  userCallback: function(label, index, labels) {
                      // when the floored value is the same as the value we have a whole number
                      if (Math.floor(label) === label) {
                          return label;
                      }

                  },
              }
          }],
      },
  }
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {'data':this.bardata, label:"subjects",}
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.snapshot.data.data.usersCount.subscribe(res => {
      this.usersCount = res.data.totalCount;
      this.piedata.push(res.data.adminCount);
      this.piedata.push(res.data.facultyCount);
      this.piedata.push(res.data.bothCount);
    });
    this.route.snapshot.data.data.subjectsCount.subscribe(res => {
      this.subjectsCount = res.data.count;
    });
    this.route.snapshot.data.data.questionsCount.subscribe(res => {
      this.questionsCount = res.data.count;
    });
    this.route.snapshot.data.data.paperCount.subscribe(res => {
      this.questionPapersCount = res.data.count;
    });
    this.route.snapshot.data.data.subjectsCountByBranch.subscribe(res => {
      const data = res.data
      data.forEach(element => {
        this.barChartLabels.push(element.subjectBranch)
        this.bardata.push(element.count)
      });
    });
    

    this.pieChartData = this.piedata;
    // console.log(this.data)
  }

}
