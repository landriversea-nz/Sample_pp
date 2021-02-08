// Import and process full river data
$(document).ready(function(){
    $('#csvfile').change(function(e){
        $('#filename').text(e.target.files[0].name).show();
        $('#filename').val(e.target.files[0].name);
    });
});

$(document).ready(function(){
    $('[name=csvfile]').change(function(e){
        $('#divLoading').show();
        train_river_select_file(e);
        $("#show_flask_result").hide();
        //when file is changed - previous dropdowns should be removed:
        console.log($('#drop_down_menu').children().size());
        $('#process_options').hide();
        $('#ml_options').hide();
        $('#full_data_process').hide();
        $('#after_load').hide();
    });
});

function train_river_select_file(e)
{
    $('#divLoading_full_river').show();
    var file=e.target.files[0];
    dict_array=[];
    counter=0;
    cluster_count_train=0;
    data_saved=0;
    counter_rem=0;
    Papa.parse(file, {
        header: true,
        dynamicTyping: false,
        fastMode: true,
        step:function(row)
        {   counter+=1;
            //console.log("counter",counter)
            dict_array.push(row.data)
            if(counter==1000000)
            {   console.log('1000000 reached') 
                data_saved=1;
                cluster_count_train+=1;
                file_name="train_data_from_bctk_software";
                file_name=file_name.concat(String(cluster_count_train));
                file_name=file_name.concat(".csv");
                $.ajax({
                    url:'/check_if_file_present_train',
                    type:'POST',
                    async:false,
                    data:{ cluster_count_train :JSON.stringify(cluster_count_train) },
                    success:function(confirmation){
                        console.log("in ajax call",confirmation, cluster_count_train)
                        download(Papa.unparse(dict_array), file_name, "text/csv");
                    }
                })

                counter=0;
                dict_array=[];
               // console.clear();
            }
           // console.log("dict len",dict_array.length)
            //console.log("Cluster count",cluster_count)
           // Array.prototype.push.apply(dict_array, results.data);
        },
        complete: function() {
            localStorage.setItem("cluster_count_train",cluster_count_train)
            if((data_saved==1) & (dict_array.length>0))
            {   
                console.log("Some data still remain - saving them now")
                cluster_count_train+=1;
                file_name='train_data_from_bctk_software';
                file_name=file_name.concat(String(cluster_count_train));
                file_name=file_name.concat(".csv");
                $.ajax({
                    url:'/check_if_file_present_train',
                    type:'POST',
                    async:false,
                    data:{ cluster_count_train :JSON.stringify(cluster_count_train) },
                    success:function(confirmation){
                        console.log("in ajax call",confirmation, cluster_count_train)
                        download(Papa.unparse(dict_array), file_name, "text/csv");
                    }
                })
                data_saved=1;
                localStorage.setItem("cluster_count_train",cluster_count_train)
            }

            if(data_saved==0)
            {
                console.log(" Data less than 1000000 rows ");
                cluster_count_train=-9;
                $.ajax({
                    url:'/check_if_file_present_train',
                    type:'POST',
                    async:false,
                    data:{ cluster_count_train :JSON.stringify(cluster_count_train) },
                    success:function(confirmation){
                        console.log(confirmation, cluster_count_train)
                        download(Papa.unparse(dict_array), 'train_data_from_bctk_software.csv', "text/csv");
                    }
                })
                data_saved=1;
                localStorage.setItem("cluster_count_train",cluster_count_train)
            }

            // if(data_saved==1)
            // {
            //     console.log(" Merging all downloads ")
            //     $.ajax({
            //         url:'/merge_full_data',
            //         type:'POST',
            //         data: { cluster_count : JSON.stringify(cluster_count) },
            //         success: function(){ alert(" Done ");  }
            //     })          
            // }
            keep_track_downloads='Done_download';
            console.log(keep_track_downloads)
            $('#divLoading_full_river').hide();
        }
    });
    
    }

// Function for pressing load data button
$(document).ready(function(){
    $('#load_data2').click(function(){
        cluster_count_train=localStorage.getItem("cluster_count_train")
        $.ajax({
            url:'/train_river_input',
            type:'POST',
            data:{ cluster_count_train :JSON.stringify(cluster_count_train) },
            success:function(train_river_data_sample){ 
                console.log(" papa parse success") 
                train_river_data_sample_json=JSON.stringify(train_river_data_sample.data);
                train_river_data_sample_csv=ConvertToCSV(train_river_data_sample_json);
                train_river_data_sample_table=csv_to_table(train_river_data_sample_csv.split(/\r?\n|\r/), tid="table1", caption=" Input data Sample ");
                document.getElementById("show_flask_result").innerHTML=train_river_data_sample_table;
                $('#show_flask_result').show(); 

                var train_headers=train_river_data_sample.columns;
                console.log("original_feats"+train_headers)
                localStorage.setItem("original_feats",JSON.stringify(train_headers));
                //console.log("Header from Localstorage:"+headers) 
            
                // for the first dropdown alone :
                dropdown_first=set_dropdown_options(headers,"first");
                $('#feats_options').empty().append(dropdown_first);

                //for static dropdowns : 
                
                $('#feats_options1').empty().append(dropdown_first);
                
                $('#feats_options2').empty().append(dropdown_first);

                $('#feats_options3').empty().append(dropdown_first);

                $('#feats_options4').empty().append(dropdown_first);

                $('#feats_options5').empty().append(dropdown_first);

                $('#feats_options6').empty().append(dropdown_first);

                var wrapper = $('.field_wrapper');
                $(wrapper).show();   
                $("#after_load").show(); 
                if($('[name=show_graphs]').is(':checked'))
                {
                    $("[name=show_graphs]").prop("checked", false);
                    $('#graphs').hide();
                    $('#graphs_sorted').hide();
                }
                $('#show_graphs_div').hide();
                $('#graph_options').hide();
                if($('[name=surface_plot_check]').is(':checked'))
                {
                    $("[name=surface_plot_check]"). prop("checked", false);
                }
                $('#surface_plot_div').hide();
                
                if($('[name=full_go]').is(':checked'))
                {
                    $("[name=full_go]"). prop("checked", false);
                }
                $('#full_go_div').hide();
            },
            error: function(){
                alert(' Select a proper CSV file ');
            }
        })             
    });
});
    
var flag_check=0        
function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
   // console.log(a.href)
    //console.log(filename)
    a.download = fileName;
   // console.log(a.download)
    a.click();
    flag_check=1

   }
