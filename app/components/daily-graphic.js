import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import jQuery from 'jquery';

am4core.useTheme(am4themes_animated);

export default class DailyGraphicComponent extends Component {
  @tracked activateLineChart = this.loadLineChart(false);
  timeLine = this.getTimeLineInformation();
  @tracked query = "";
  @tracked queryNoSpaces = this.query.replace(/\s/g,'');
  caseData = [];

  async getTimeLineInformation(){
    this.query = (this.args.timeline ? this.args.timeline : 'Global');
    return await jQuery.get('http://api.coronastatistics.live/timeline/'+this.query)
  }

  async loadLineChart(chartType){
    if(this.args.timeline){
      let timeline = await this.timeLine;
      timeline = timeline.data.timeline
      Object.keys(timeline).forEach(key => {
        this.caseData.push({
          date: new Date(timeline[key].date),
          cases: timeline[key].cases,
          recoveries: timeline[key].recovered,
          deaths: timeline[key].deaths
        });
      });
    }else{
      const timeline = await this.timeLine;
      Object.keys(timeline).forEach(key => {
        this.caseData.push({
          date: new Date(key),
          cases: timeline[key].cases,
          recoveries: timeline[key].recovered,
          deaths: timeline[key].deaths
        });
      });
    }

    this.caseData.push({
      date: new Date().getTime(),
      cases: this.totalCases,
      recoveries: this.totalRecoveries,
      deaths: this.totalDeaths
    });

    let chart = am4core.create("dailyGraph"+this.queryNoSpaces, am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#a";
    chart.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.logarithmic = chartType;
    valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");
    dateAxis.renderer.labels.template.fill = am4core.color("#adb5bd");

    chart = this.createSeriesLine(chart, "#21AFDD", "cases");
    chart = this.createSeriesLine(chart, "#10c469", "recoveries");
    chart = this.createSeriesLine(chart, "#ff5b5b", "deaths");

    chart.data = this.caseData;

    chart.legend = new am4charts.Legend();
    chart.legend.labels.template.fill = am4core.color("#adb5bd");

    chart.cursor = new am4charts.XYCursor();
    this.lineChart = chart;
  }

  createSeriesLine(chart, color, type) {
    let name = type.charAt(0).toUpperCase() + type.slice(1);
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = type;
    series.fill = am4core.color(color);
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY} " + name;
    series.tooltip.pointerOrientation = "vertical";

    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;

    series.stroke = am4core.color(color);
    series.legendSettings.labelText = name;
    series.tooltip.autoTextColor = false;
    series.tooltip.label.fill = am4core.color("#282e38");
    return chart
  }
}
