import Component from '@glimmer/component';

export default class SingleCountryGraphComponent extends Component {
  @tracked country = this.args.country;
  @tracked data = this.args.data;
  activateSingleCakeGraph = this.loadPieChart();

  loadPieChart() {
    let chart = am4core.create("pieChart", am4charts.PieChart);
    chart.data.push({
      type: 'Recoveries',
      number: this.totalRecoveries,
      "color": am4core.color("#10c469")
    });
    chart.data.push({
      type: 'Deaths',
      number: this.totalDeaths,
      "color": am4core.color("#ff5b5b")
    });
    chart.data.push({
      type: 'Critical',
      number: this.totalCritical,
      "color": am4core.color("#f9c851")
    });
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "number";
    pieSeries.dataFields.category = "type";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.slices.template.stroke = am4core.color("#313a46");
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;
    this.pieChart = chart;
  }
}
