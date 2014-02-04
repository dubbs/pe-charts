/*jslint indent:2, vars:true, nomen: true */

var PEChartConfigBase = {
  all: {
    chart: {
      backgroundColor: null
    },
    title: {
      text: null
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'bottom',
      floating: true,
      borderWidth: 0
    },
    credits: {
      position: {
        align: 'left',
        x: 18
      }
    }
  },
  line: {
    chart: {
      type: 'line'
    }
  },
  column: {
    chart: {
      type: 'column'
    },
    plotOptions: {
      column: {
        stacking: null
      }
    }
  },
  column_stacked: {
    chart: {
      type: 'column'
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    }
  },
  bar: {
    chart: {
      type: 'bar'
    }
  },
  pie: {
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    }
  }
};

/* DO NOT CHANGE THESE VALUES */
var PEChartConfigUser = {
  all: {},
  line: {},
  column: {},
  column_stacked: {},
  bar: {},
  pie: {}
};

var PEChart = (function ($, baseConfig, userConfig) {

  'use strict';

  function PEChart(options) {

    if (!$.fn.highcharts) {
      throw new Error('PEChart requires Highcharts');
    }

    this.$el = options.el;
    this.userConfig = $.extend(true, userConfig, options.config);
    this.baseConfig = baseConfig;

    this.initialize();
  }

  PEChart.prototype.initialize = function () {
    var options, chartType;
    chartType = this.$el.data('chart-type');
    this.addChartContainer();
    options = this.loadDefaultOptions(chartType);
    options = this.loadCategoryData(options);
    options = this.loadSeriesData(options, chartType);
    options = this.loadYAxisTitle(options);
    options = this.loadCreditsData(options);
    options = this.adjustSpacing(options);
    options = this.adjustHeight(options);
    options = this.adjustLegend(options);
    options = this.adjustColumnColoring(options);
    this.hideTable();
    this.$el.data('options', options);
    this.$chartContainer.highcharts(options);
  };

  PEChart.prototype.hideTable = function () {
    this.$el.hide();
  };

  PEChart.prototype.adjustColumnColoring = function (options) {
    // set alternating color if only 1 series
    if (options.chart.type === 'column' && options.series.length === 1) {
      options.plotOptions.series = options.plotOptions.series || {};
      options.plotOptions.series.colorByPoint = true;
    }
    return options;
  };

  PEChart.prototype.adjustHeight = function (options) {
    options.chart.height = this.$el.data('height');
    return options;
  };

  PEChart.prototype.adjustLegend = function (options) {
    if (this.$el.attr('data-hide-legend') !== undefined) {
      options.legend.enabled = false;
      options.chart.spacingBottom = 10;
    }
    return options;
  };

  PEChart.prototype.adjustSpacing = function (options) {
    options.legend.y = options.series.length * 15 + 10;
    options.chart.spacingBottom = options.series.length * 15 + 50;
    return options;
  };

  PEChart.prototype.loadYAxisTitle = function (options) {
    options.yAxis = options.yAxis || {};
    options.yAxis.title = options.yAxis.title || {};
    options.yAxis.title.text = this.$el.find('[data-yaxis-title]').text();
    return options;
  };

  PEChart.prototype.addChartContainer = function () {
    this.$chartContainer = $('<div id="' + this.$el.data('chart-id') + '"></div>').insertAfter(this.$el);
  };

  PEChart.prototype.loadDefaultOptions = function (chartType) {
    var defaultAll = $.extend(true, this.baseConfig.all, this.userConfig.all);
    switch (chartType) {
    case 'line':
      return $.extend(true, defaultAll, this.baseConfig.line, this.userConfig.line);
    case 'column_stacked':
      return $.extend(true, defaultAll, this.baseConfig.column_stacked, this.userConfig.column_stacked);
    case 'column':
      return $.extend(true, defaultAll, this.baseConfig.column, this.userConfig.column);
    case 'bar':
      return $.extend(true, defaultAll, this.baseConfig.bar, this.userConfig.bar);
    case 'pie':
      return $.extend(true, defaultAll, this.baseConfig.pie, this.userConfig.pie);
    }
  };

  PEChart.prototype.loadCreditsData = function (options) {
    options.credits = options.credits || {};
    options.credits.text = this.$el.find('[data-footnote]').text();
    return options;
  };

  PEChart.prototype.reformatDataForPieChart = function (data, categories) {
    var pieData = [], i, l;
    for (i = 0, l = categories.length; i < l; i++) {
      var category = categories[i];
      pieData.push([category, data[i]]);
    }
    return pieData;
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

  PEChart.prototype.loadSeriesData = function (options, chartType) {
    var _this = this;
    options.series = [];
    this.$el.find('[data-series]').each(function () {
      var $this = $(this);
      // find name
      var $name = $this.find('[data-series-name]');
      var name = ($name.length) ? $name.text() : null;
      // load series data
      var data = [];
      $this.find('> *:not([data-series-name])').each(function () {
        return data.push(parseFloat($(this).text()));
      });
      if (chartType === 'pie') {
        // pie charts use a different data format, which includes categories
        data = _this.reformatDataForPieChart(data, options.xAxis.categories);
      }
      // create series
      options.series.push({
        type: (chartType === 'pie') ? 'pie' : '',
        name: name,
        data: data
      });
    });
    return options;
  };

  return PEChart;

}(this.jQuery, this.PEChartConfigBase, this.PEChartConfigUser));
