/*jslint indent:2, vars:true */

var PEChartConfigBase = (function () {

  'use strict';

  function PEChartConfigBase() {}

  PEChartConfigBase.prototype.defaultAll = {
    chart: {
      backgroundColor: null
    },
    title: {
      text: null
    }
  };

  PEChartConfigBase.prototype.defaultLine = {
    chart: {
      type: 'line'
    }
  };

  return PEChartConfigBase;

}());
