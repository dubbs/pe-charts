
# PEChart

This library creates a Highchart from an HTML table:

	<table data-chart-id="chart-1" data-chart-type="line|bar|column|column_stacked">
		<caption>
			<p data-yaxis-title>Chart Title</p>
		</caption>
		<thead>
			<tr data-categories>
				<th data-ignore></th>
				<th>Group 1</th>
				<th>Group 2</th>
				<th>Group 3</th>
			</tr>
		</thead>
		<tfoot>
			<tr>
				<td colspan="4" data-footnote>Source: Wikipedia</td>
			</tr>
		</tfoot>
		<tbody>
			<tr data-series>
				<td data-series-name>Series 1</td>
				<td>971</td>
				<td>3492</td>
				<td>8825</td>
			</tr>
			<tr data-series>
				<td data-series-name>Series 2</td>
				<td>4739</td>
				<td>6593</td>
				<td>9618</td>
			</tr>
		</tbody>
	</table>
	
Include the required js files:

	<script src="../bower_components/jquery/jquery.js"></script>
	<script src="../bower_components/highcharts/highcharts.src.js"></script>
	<script src="../app.js"></script>
	
Initialize a new instance:

	var chart = new PEChart({
		el: $('table')
	});



