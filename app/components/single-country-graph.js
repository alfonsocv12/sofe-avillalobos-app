import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default class SingleCountryGraphComponent extends Component {
  @tracked country = this.args.country;
  @tracked countryNoSpace = this.args.country.replace(/\s/g,'');
  @tracked data = this.args.data;
  @tracked activateSingleCakeGraph = this.loadPieChart();

  loadPieChart() {
    let chart = am4core.create(
      this.countryNoSpace+"SingleCakeGraph", am4charts.PieChart
    );
    chart.data.push({
      type: 'Recoveries',
      number: this.data.recovered,
      "color": am4core.color("#80e27e")
    });
    chart.data.push({
      type: 'Deaths',
      number: this.data.deaths,
      "color": am4core.color("#ff5b5b")
    });
    chart.data.push({
      type: 'Critical',
      number: this.data.totalCritical,
      "color": am4core.color("#f9c851")
    });
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "number";
    pieSeries.dataFields.category = "type";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    pieSeries.slices.template.propertyFields.fill = "color";
    this.pieChart = chart;
  }

}
