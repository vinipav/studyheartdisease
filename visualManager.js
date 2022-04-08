var heart_disease_csv =[];
d3.csv("heart_2020_cleaned.csv", function(data) {
    
    data.map(function(d){
        heart_disease_csv.push(d);
    }
    );
    console.log("test");
    console.log(heart_disease_csv);
    
if (heart_disease_csv!=[])
{

const distantAgeCat = [...new Set(heart_disease_csv.map(x =>x.AgeCategory))];
console.log(distantAgeCat.sort());

heart_disease_yes =[];
for(i=0;i<heart_disease_csv.length;i++)
{
    if(heart_disease_csv[i]["HeartDisease"] == "Yes"){
        heart_disease_yes.push(heart_disease_csv[i])
    }
}
console.log(heart_disease_yes);
var AgevsDeaths =[];

for(i=0;i<distantAgeCat.length;i++){
    AgevsDeaths.push([distantAgeCat[i],0])
}

for(i=0;i<heart_disease_yes.length;i++)
{
    if(heart_disease_yes[i]["AgeCategory"] == '18-24'){
        AgevsDeaths[0][1]= AgevsDeaths[0][1] +1;
    }
    else if(heart_disease_yes[i]["AgeCategory"] == '25-29'){
        AgevsDeaths[1][1]= AgevsDeaths[1][1] +1;
    }
    else if(heart_disease_yes[i]["AgeCategory"] == '30-34'){
        AgevsDeaths[2][1]= AgevsDeaths[2][1] +1;
    }
    else if(heart_disease_yes[i]["AgeCategory"] == '35-39'){
        AgevsDeaths[3][1]= AgevsDeaths[3][1] +1;
    }
    else if(heart_disease_yes[i]["AgeCategory"] == '40-44'){
        AgevsDeaths[4][1]= AgevsDeaths[4][1] +1;
    }
    else if(heart_disease_yes[i]["AgeCategory"] == '45-49'){
        AgevsDeaths[5][1]= AgevsDeaths[5][1] +1;
    }
    else if(heart_disease_yes[i]["AgeCategory"] == '50-54'){
        AgevsDeaths[6][1]= AgevsDeaths[6][1] +1;
    }
    else if(heart_disease_yes[i]["AgeCategory"] == '55-59'){
        AgevsDeaths[7][1]= AgevsDeaths[7][1] +1;
    }
    else if(heart_disease_yes[i]["AgeCategory"] == '60-64'){
        AgevsDeaths[8][1]= AgevsDeaths[8][1] +1;
    }
    else if(heart_disease_yes[i]["AgeCategory"] == '65-69'){
        AgevsDeaths[9][1]= AgevsDeaths[9][1] +1;
    }
    else if(heart_disease_yes[i]["AgeCategory"] == '70-74'){
        AgevsDeaths[10][1]= AgevsDeaths[10][1] +1;
    }
    else if(heart_disease_yes[i]["AgeCategory"] == '75-79'){
        AgevsDeaths[11][1]= AgevsDeaths[11][1] +1;
    }
    else {
        AgevsDeaths[12][1]= AgevsDeaths[12][1] +1;
    }
}
console.log(AgevsDeaths);
w=600;
h=400;
wpad =100;
hpad =100;
var svg = d3.select("body").select("#full-page")
.append("svg")
.attr("id", "#svg_AgevsDeaths")
.attr("width", w)
.attr("height", h);

createBarchart(AgevsDeaths,svg,w,h,wpad,hpad);


}
});

function createBarchart(dataset,svg_var,width,height,w_padding,h_padding){	
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([w_padding, width-w_padding], 0.09);
    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d,i) { 
        return dataset[i][1]; })])
        .range([height- h_padding,h_padding ]);
    var xAxis = d3.svg.axis().scale(xScale).tickFormat(function(d,i) { return dataset[i][0]; });
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(4);
       
        svg_var.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("id", function(d, i) {
                return i;        
                })
                .attr("x", function(d, i) {
                return xScale(i);        
                })
                .attr("y",function(d,i) {
                    return  yScale(dataset[i][1]);  
                })
                .attr("width", xScale.rangeBand())
                .attr("height",function(d,i) {
                    return yScale(0)- yScale(dataset[i][1])   ;
                })
                .attr("fill", function(d) {
                    return "#525252";
                });
                
                
        svg_var.selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .text(function(d,i) {
                    return dataset[i][1];
                })
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.rangeBand() / 2;        
                })
                .attr("y", function(d,i) {
                    return  yScale(dataset[i][1]) +10;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "8px")
                .attr("fill", "white")
                .attr("text-anchor", "middle");
                        
        svg_var.append("text")
                    .attr("x", (width / 2))             
                    .attr("y", 20 )
                    .attr("text-anchor", "middle") 
                    .attr("font-family", "arial") 
                    .style("font-size", "16px") 
                    .text("Deaths by Age Group");
        svg_var.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + w_padding + ",0)")
                .call(yAxis);
        svg_var.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0,"+(height -h_padding)+")")
                .call(xAxis)
                .selectAll("text")	
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.4em")
                .attr("transform", function(d) {
                        return "rotate(-90)" 
                    });
                    
        svg_var.append("text")             
                    .attr("transform",
                        "translate(" + (width/2) + " ," + 
                                        (height-10) + ")")
                    .style("text-anchor", "middle")
                    .text("Age Groups");
                    
        svg_var.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 65  )
                .attr("x",-95)
                
                .style("text-anchor", "middle")
                .text("Deaths"); 
    }

