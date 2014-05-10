# PE-Chart

This library employs techniques of [progressive enhancement](http://alistapart.com/article/understandingprogressiveenhancement) to ensure that all users can enjoy your data, whether it be a nice [Highchart](http://www.highcharts.com/) or just numbers!

## Installation

Dependencies are managed with the [bower](http://bower.io/) package manager.

	bower install

## Usage

You start out with a table, lets say Apple Inc.'s revenue

	<table>
		<caption>
			<p>Revenue in Billions</p>
		</caption>
		<thead>
			<tr>
				<th></th>
				<th>2011</th>
				<th>2012</th>
				<th>2013</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Apple</td>
				<td>108.6</td>
				<td>155.97</td>
				<td>170.87</td>
			</tr>
		</tbody>
	</table>

Then add data-attributes so the plugin knows what type of data you would like to display

	<table data-chart-type="column">
		<caption>
			<p data-yaxis-title>Revenue in Billions</p>
		</caption>
		<thead>
			<tr data-categories>
				<th data-ignore></th>
				<th>2011</th>
				<th>2012</th>
				<th>2013</th>
			</tr>
		</thead>
		<tbody>
			<tr data-series>
				<td data-series-name>Apple</td>
				<td>108.6</td>
				<td>155.97</td>
				<td>170.87</td>
			</tr>
		</tbody>
	</table>

Lastly, add any further customization and initialize the plugin

	$('table').pechart({
		all: {
			colors: [
				'#B5B3AE',
				'#005A9C',
				'#FFFFFF'
			]
		}
	});
		
Here's a full featured [demo](examples/apple_revenue.html), to help you get started.

## Data Attributes

	table[data-chart-id] // set id of chart wrapper element
    table[data-chart-type] // set chart type, line|column_stacked|column|bar|pie
    table[data-hide-legend] // turn off legend
    
    *[data-yaxis-title] // set yaxis title
    *[data-categories] // set children within this element as categories
    *[data-ignore] // set category to be ignored
    *[data-series] // set children within this element as series data
    *[data-series-name] // set as current series name
    *[data-footnote] // set highcharts credit text
    

## Chart Config

There are six groups of config, which are fed directly into highcharts.

One for all chart types:

	all: {}

One for each chart type:

    line: {},
    column: {},
    column_stacked: {},
    bar: {},
    pie: {}



