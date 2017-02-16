function onLoad (){
	alert("Hello");
	d3.select('body')
    .append('svg')
    .append('text')
    .text('Click somewhere, please...')
    .attr('x', 400)
    .attr('y', 400)
    .style("fill","firebrick");
}