function stepOne(id) 

{

    //Read in samples.json


      //  var url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


        d3.json("samples.json").then (sampleinfo => 
            
            {

            console.log(sampleinfo)

            var Ids = sampleinfo.samples[0].otu_ids;
            console.log(Ids)



                // See notes and lecture videos 15.1-15.3

                // Slice is essentially seperating the items in a list or an array that are needed from the intial list or array. https://www.w3schools.com/jsref/jsref_slice_array.asp


                // To reverse the order of lists or sets of data (ex: 1,2,3,4 comes out as 4,3,2,1). https://stackoverflow.com/questions/65907043/how-to-reverse-a-list-without-using-reverse-and-without-using-return

            var sample_Values =  sampleinfo.samples[0].sample_values.slice(0,10).reverse();
            console.log(sample_Values)

            var Labels =  sampleinfo.samples[0].otu_labels.slice(0,10);
            console.log (Labels)



        // Top 10 OTU ids and a reversal. 


            var otu_ten = (sampleinfo.samples[0].otu_ids.slice(0, 10)).reverse();


        // OTU ids

                // A map: creates a new array from calling a function for every array element and does not execute the function for empty elements. https://www.w3schools.com/jsref/jsref_map.asp

            var otu_ids = otu_ten.map(x => "OTU" + x);

            console.log(`OTU IDS: ${otu_ids}`)



         // Top 10 labels


            var labels =  sampleinfo.samples[0].otu_labels.slice(0,10);
            
            console.log(`OTU_labels: ${labels}`)

                // See notes and lecture videos 15.1-15.3


        // Bar chart

            // https://plotly.com/javascript/bar-charts/

            var sketch = 
            
            {
                x: sample_Values,
                y: otu_ids,
                text: Labels,
                type:"bar",
                orientation: "h",

            };

            var x_1 = [sketch];
    

            var layout_1 = 
            
            {
                
                yaxis:
                
                {

                    tickmode: "linear",

                }
            };
    
            // https://plotly.com/javascript/plotlyjs-function-reference/

        // Create bar plot

        Plotly.newPlot("bar", x_1, layout_1);




        // Bubble graph

       // https://plotly.com/javascript/bubble-charts/
            var sketch_1 = 
            
            {
                x: sampleinfo.samples[0].otu_ids,
                y: sampleinfo.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampleinfo.samples[0].sample_values,
                    color: sampleinfo.samples[0].otu_ids
                },
                text:  sampleinfo.samples[0].otu_labels
    
            };

            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 650,
                width: 1350
            };

            var x_2 = [sketch_1];
    

            // https://plotly.com/javascript/bubble-charts/

            // Create bubble chart


        Plotly.newPlot("bubble", x_2, layout_2); 
        
        });
    }  



    function getInfo(id) {
    

        d3.json("samples.json").then((data)=> 
        
        {


            var metadata = data.metadata;
    
            console.log(metadata)

            // https://stackoverflow.com/questions/65495437/problems-creating-a-horizontal-bar-chart-using-javascript-cant-figure-out-my-e

            // https://stackoverflow.com/questions/3615721/how-to-use-the-tostring-method-in-java

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString


           var result = metadata.filter(meta => meta.id.toString() === id)[0];
           
        

           var demoInfo = d3.select("#sample-metadata");
            

           demoInfo.html("");

         
            Object.entries(result).forEach((key) => 
            
            {   

                demoInfo.append("h4").text(key[0].toLowerCase() + ": " + key[1] + "\n");  

            });
        });
    }



    // Display the metadata

    
    function optionChanged(id)
    
    {
        stepOne(id);
        getInfo(id);
    }
    





    function setSpike() 
    
    {


     
        // https://stackoverflow.com/questions/65495437/problems-creating-a-horizontal-bar-chart-using-javascript-cant-figure-out-my-e

        var menu = d3.select("#selDataset");
    
        


        d3.json("samples.json").then((data) => {
            console.log(data)
    
            // Move id data to dropdown menu

            // https://stackoverflow.com/questions/65495437/problems-creating-a-horizontal-bar-chart-using-javascript-cant-figure-out-my-e

            data.names.forEach(function(name) {
                menu.append("option").text(name).property("value");
            });
    
            

            // Display the data collected and the graphs on the page

            stepOne(data.names[0]);

            getInfo(data.names[0]);
        });
    }
    
    setSpike();