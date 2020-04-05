import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Fuse from 'fuse';

am4core.useTheme(am4themes_animated);

export default class CackeGraphComponent extends Component {
  @tracked activateCackeChart = this.loadPieChart();

  fuse = new Fuse(this.args.countries, {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    minMatchCharLenght: 1,
    keys: [
      "country"
    ]
  });

  loadPieChart() {
    let tempData = this.fuse.list.slice();
    this.sortData(tempData, "cases");
    tempData = tempData.reverse();
    let chart = am4core.create("cackeGraph", am4charts.PieChart);
    chart.data = tempData.slice(0, 10);
    let otherCases = tempData.slice(10, tempData.length);
    chart.data.push({
      country: 'Other',
      cases: this.calculateSum("cases", otherCases)
    });
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "cases";
    pieSeries.dataFields.category = "country";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    pieSeries.slices.template.stroke = am4core.color("#313a46");
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;
    this.pieChart = chart;
  }

  sortData(data, sortBy) {
    try {
      const sortProp = sortBy;
      data.sort((a, b) => {
        if (a[sortProp] < b[sortProp]) {
          return -1;
        } else if (a[sortProp] > b[sortProp]) {
          return 1;
        }
        return 0;
      })
    } catch (e) {
      console.error("ERROR while sorting", e);
      return data;
    }
    return data
  }

  calculateSum(index, array = this.countries) {
    var total = 0
    for (var i = 0, _len = array.length; i < _len; i++) {
      total += array[i][index]
    }
    return total
  }
}
