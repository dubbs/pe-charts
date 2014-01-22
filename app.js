/*jslint indent:2, vars:true */

var PEChart = (function ($, baseConfig, userConfig) {

  'use strict';

  function PEChart(options) {

    if (!$.fn.highcharts) {
      throw new Error('PEChart requires Highcharts');
    }

    if (!baseConfig) {
      throw new Error('PEChart requires the base config file: config-base.js');
    }

    this.options = options;
    this.$el = options.el;

    this.initialize();
  }

  PEChart.prototype.initialize = function () {
    var options;
    this.addChartContainer();
    options = this.loadDefaultOptions(this.$el.data('chart-type'));
    options = this.loadSeriesData(options);
    options = this.loadCategoryData(options);
    this.$chartContainer.highcharts(options);
  };

  PEChart.prototype.addChartContainer = function () {
    this.$chartContainer = $('<div id="' + this.$el.data('chart-id') + '"></div>').insertAfter(this.$el);
  };

  PEChart.prototype.loadDefaultOptions = function (chartType) {
    switch (chartType) {
    case 'line':
      return baseConfig.prototype.defaultLine;
    }
  };

  PEChart.prototype.loadCategoryData = function (options) {
    // load categories
    var categories = [];
    this.$el.find('[data-categories] > *:not([data-ignore])').each(function () {
      categories.push($(this).text());
    });
    // add to axis
    options.xAxis = options.xAxis || {};
    options.xAxis.categories = categories;
    return options;
  };

  PEChart.prototype.loadSeriesData = function (options) {
    options.series = [];
    this.$el.find('[data-series]').each(function () {
      var $this = $(this);
      // find name
      var $name = $this.find('[data-series-name]');
      var name = ($name.length) ? $name.text() : null;
      // load series data
      var data = [];
      $this.find('td:not([data-series-name])').each(function () {
        return data.push({y: parseFloat($(this).text())});
      });
      // create series
      options.series.push({
        name: name,
        data: data
      });
    });
    return options;
  };

  return PEChart;

}(this.jQuery, this.PEChartConfigBase, this.PEChartConfigUser));
