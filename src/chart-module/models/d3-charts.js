import {
    SumTotalFromObject, NumberWithCommas, PercentOfNums,
    WhiteSpace
} from '../../tools/swisstools';
import * as d3 from "d3";


export const CreateChart = (title, data, colors, currency, element) => {
    // Summ total
    const total_array = SumTotalFromObject(data.datapie);
    // set the dimensions and margins of the graph
    const extendedWidt = 100;
    const width = 150;
    const width_container = width + extendedWidt;
    const height = 250;
    let margin = 4;

    // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    const container = element.createElement('svg');
    // append the svg object to the div called 'my_dataviz'

    const color = d3.scaleOrdinal()
        .range(colors);

    const secondScale = d3.scaleLinear()
        .domain([0, 4])
        .range([0, 360]);
    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .sort(null)
        .value(function (d) { return d.value; });

    var data_ready = pie(d3.entries(data.datapie));
    var arc = d3.arc()
        .outerRadius(62)
        .innerRadius(radius);

    const svg = d3.select(container)
        .append("svg")
        .attr("width", width_container)
        .attr("height", height)
        .append("g")
        .attr("class", "main")
        .attr("transform", "translate(" + width_container / 2 + "," + height / 2 + ")");

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    const g = svg.selectAll(".arc")
        .data(data_ready)
        .enter()
        .append("g")
        .attr("id", "arc");

    // create line group
    const linearClock = svg
        .append("g")
        .attr("id", "line-clock");

    // create legend. Include all text references
    const legend = svg.selectAll(".main")
        .data(data_ready)
        .enter()
        .append("g")
        .attr("id", "legend");

    g.append("path")
        .style("fill", function (d) { return color(d.data.key); })
        .style("opacity", 0.7)
        .attr("id", "arc")
        .transition().delay(function (d, i) { return i * 500; }).duration(500)
        .attrTween('d', function (d) {
            var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
            return function (t) {
                d.endAngle = i(t);
                return arc(d);
            };
        });

    //add marks for pie donut chart
    linearClock.selectAll('#line-clock')
        .data(d3.range(0, 4)).enter()
        .append('line')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 60)
        .attr('y2', 60 + (-3))
        .style("stroke", "#B4BBB4")
        .attr('fill', 'none')
        .attr('transform', function (d) {
            return 'rotate(' + secondScale(d) + ')';
        });

    //add marks for pie donut chart
    svg
        .append('line')
        .attr('x1', -150)
        .attr('x2', 150)
        .attr('y1', 115)
        .attr('y2', 115)
        .attr('fill', 'none')
        .style("stroke", "#E7E7E7")
        .style("stroke-width", "2");
    // add text
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr('y', -20)
        .attr('font-size', '0.9em')
        .style('fill', '#A4A4A4')
        .style("text-transform", "uppercase")
        .text(title);
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr('y', 5)
        .attr('font-size', '1.2em')
        .text(NumberWithCommas(total_array, currency));

    // legend
    legend.append("text")
        .attr("class", "text-legend")
        .attr("text-anchor", function (d) {
            return (d.index == 0) ? "end" : "start";
        })
        .attr('x', function (d) {
            return (d.index === 0) ? width_container / 2 : -(width_container / 2);
        })
        .attr('y', 85)
        .attr('font-size', '0.9em')
        .style("text-transform", "capitalize")
        .style("fill", function (d) { return color(d.data.key); })
        .style('font-weight', '700')
        .text(function (d) {
            return d.data.key;
        });
    legend.append("text")
        .attr("class", "text-legend")
        .attr("text-anchor", function (d) {
            return (d.index === 0) ? "end" : "start";
        })
        .attr('x', function (d) {
            return (d.index === 0) ? width_container / 2 : -(width_container / 2);
        })
        .attr('y', 105)
        .attr('font-size', '0.8em')
        .style("fill", "#737373")
        .text(function (d) {
            // know space of value in order to align percent
            const wordVal = NumberWithCommas(d.data.value, currency);
            const whiteSpace = WhiteSpace("\u00A0", (wordVal.length + 10));
            return PercentOfNums(total_array, d.data.value) + "%" + whiteSpace;
        });
    legend.append("text")
        .attr("class", "text-legend")
        .attr("text-anchor", function (d) {
            return (d.index === 0) ? "end" : "start";
        })
        .attr('x', function (d) {
            return (d.index === 0) ? (width_container / 2) : -((width_container / 2) - 35);
        })
        .attr('y', 105)
        .attr('font-size', '0.8em')
        .style("fill", "#B3B3B3")
        .text(function (d) {
            return NumberWithCommas(d.data.value, currency);
        });

    // convert data

    const dataline = data.dataline[1].data;
    const linearHeight = 50;
    var margins = { top: 10, right: 25, bottom: 20, left: -50 },
        widths = 78 - margins.left - margins.right,
        heights = linearHeight - margins.top - margins.bottom;

    // Set the ranges
    var x = d3.scaleTime().range([0, widths]);
    var y = d3.scaleLinear().range([heights, 0]);

    // Define the line
    const valueline = d3.line()
        .x(function (d) { return x(d.x); })
        .y(function (d) { return y(d.y); });


    const dd = [25, 35, 43, 48, 50, 53, 51, 49, 46, 40, 35, 25];
    const neee = (index) => dd[index];
    const secondChart = svg
        .append("g")
        .attr("width", widths + margins.left + margins.right)
        .attr("height", heights + margins.top + margins.bottom)
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

    // define the area
    const area = d3.area()
        .x(function (d) { return x(d.x); })
        .y0(function (d, index) { return neee(index); })
        .y1(function (d) { return y(d.y); });


    // Scale the range of the data
    x.domain(d3.extent(dataline, function (d) { return d.x; }));
    y.domain([0, d3.max(dataline, function (d) { return d.y; })]);

    // add the area
    secondChart
        .append("path")
        .data([dataline])
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", colors[1])
        .style("opacity", 0.07);

    // Add the valueline path.
    secondChart
        .append("path")		// Add the valueline path.
        .attr("d", valueline(dataline))
        .attr("stroke", colors[1])
        .attr("stroke-width", "1.5")
        .attr("fill", "none");


    return container;
};