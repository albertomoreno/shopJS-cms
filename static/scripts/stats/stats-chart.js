'use strict';


angular.module('shopApp').component('statsChart', {
  template: '<div class="chart"></div>',
  controller: function ($element, $http) {

    var chart;
    var chartData;

    var loadData = function() {

      return $http.get('/stats/data').then(function (res) {

        var data = res.data.map(function (value) {
          return {x: value.time, y: value.count};
        });

        return [{
          area: true,
          values: data,
          key: "Vistas",
          color: "#ff7f0e",
          strokeWidth: 4,
          classed: 'dashed'
        }];
      });
    };
    
    var updateData = function() {
      loadData().then(function (data){
        chartData.datum(data).call(chart);
        setTimeout(updateData, 5000);
      });
    };

    var createChart = function() {
      loadData().then(function (data) {

        nv.addGraph(function() {
          chart = nv.models.lineChart()
            .options({
              duration: 300,
              useInteractiveGuideline: true
            });

          chart.xScale(d3.time.scale())

          chart.xAxis
            .axisLabel("Hora")
            .tickFormat(d3.time.format('%H:%M'));
            // .staggerLabels(true);
          chart.yAxis
            .axisLabel('Visitas')
            .tickFormat(d3.format('d'));

          chartData = d3.select($element[0].children[0]).append('svg');
          chartData.datum(data)
            .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
        });

        setTimeout(updateData(), 5000);
      });
    };

    createChart();
  },
});




