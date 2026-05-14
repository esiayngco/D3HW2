const svg = d3.select("svg");

const width = 900;
const height = 500;

const margin = {
    top: 60,
    right: 50,
    bottom: 60,
    left: 70
};

d3.csv("data.csv").then(function(data) {

    data.forEach(function(d) {
        d.year = +d.year;
        d.seattle_temp = +d.seattle_temp;
        d.seattle_rain = +d.seattle_rain;
    });

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, 60])
        .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));

    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);

    const line1 = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.seattle_temp));

    const line2 = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.seattle_rain));

    svg.append("path")
        .datum(data)
        .attr("class", "line1")
        .attr("d", line1);

    svg.append("path")
        .datum(data)
        .attr("class", "line2")
        .attr("d", line2);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("class", "chart-title")
        .text("Seattle Weather Trends");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 15)
        .attr("text-anchor", "middle")
        .attr("class", "axis-label")
        .text("Year");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("class", "axis-label")
        .text("Values");

});