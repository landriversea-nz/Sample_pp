// console.log(" Data Type of e.target.result  "+typeof e.target.result);
            // console.log(" Data Type of returned_data  "+typeof returned_data);
            // console.log(" Data Type of returned_data with stringify "+typeof JSON.stringify(returned_data));   
            // console.log(" Data Type of Items "+typeof items);  


// clear localstorage at the beginning
console.log("Clearing local storage")
localStorage.clear();

// GET OS NAME FOR /N OR /R/N SPLIT
function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;
  
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
    return os;
  }

console.log(getOS())

// Add remove loading class on body element depending on Ajax request status
$(document).on({
    ajaxStart: function(){
      //  console.log(" AJAX STARTEDDD")
        $('#divLoading').show();
    },
    ajaxStop: function(){ 
       // console.log(" AJAX ENDEDD")
        $('#divLoading').hide();
    }    
});

//reset all selected values
$(document).ready(function(){
    $('[name=reset_data]').click(function(){
        window.location.reload();
    });
});        


//// ######################### UPGRADE PAGE FUNCTIONS ######################## ////

$(document).ready(function(){
    $('[name=manual_upgrade]').click(function(){
        $('#email_show').show()
    });
});

$(document).ready(function(){
    $('[name=auto_request]').click(function(){
        upgrade_name=$('#upgrade_name').val();
        upgrade_email=$('#upgrade_email').val();
        console.log(upgrade_email,upgrade_name)
        $.ajax({
            url:'/auto_request',
            type:'POST',
            data : { upgrade_name: JSON.stringify(upgrade_name), upgrade_email:JSON.stringify(upgrade_email) },
            success: function(status_req){
                if(status_req=="requested")
                {
                    $('#after_request_show').html(' Request for License file sent ! You will recieve your license file to the above email ID shortly');
                    $('#after_request_show').show();
                }
                else
                {
                    $('#after_request_show').html(String(status_req));
                    $('#after_request_show').show();
                }
            }
        })

    });
});


/// ##################### MAIN FUNCTIONS ################################################################################ ///

function download_blob(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    console.log(fileName)
    flag_check=1
   }

//reset all selected values
$(document).ready(function(){
    $('[name=reset_data]').click(function(){
        window.location.reload();
    });
});            

$(document).ready(function(){
    $('#mike_version').click(function(){
        $('#input_mode').show();
        $('input[name="optradio"]').removeAttr('checked');
        $('input[name="out_options"]').removeAttr('checked');
        $('#change_no_data_div').hide();
        if($('[name=change_nodata]').is(':checked'))
        {
            $("[name=change_nodata]").prop("checked", false);   
        }
        var count = document.getElementById("items_options_div").childElementCount; 
        console.log(count)
        while(count>2)
        {
        let menu=document.getElementById("items_options_div");
        menu.removeChild(menu.lastElementChild);
        count = document.getElementById("items_options_div").childElementCount; 
        }
        $('#filename_combo').hide();
        $('#files_form_id').hide();
        $('#folder_form_id').hide();
        $('#ext_input').hide();
        $('#dfsufile_load_status').hide();
        $('#convert_go').hide();
        $('#load_dfsufile').hide();
        $('#reset_data').hide();
        $('#filename_combo').hide();
        $('#inp_dfsu_contents').hide();
        $('#inp_dfs2_contents').hide();
        $('#inp_asci_contents').hide();
        $('#items_options_div').hide();
        $('#change_no_data_div').hide();
        if($('[name=change_nodata]').is(':checked'))
        {
            $("[name=change_nodata]").prop("checked", false);   
        }
        $('#pfs_details').hide();
        $('#convert_go').hide();
        $('#inp_max_dfsu').hide();
        $('#progress').hide();
        $('#progress_wrapper').hide();
        $('#progress_status').hide();
        $('#alert_wrapper').hide();
        $('#progress_folder').hide();
        $('#progress_wrapper_folder').hide();
        $('#progress_status_folder').hide();
        $('#alert_wrapper_folder').hide();
        $("#dfsu_folder_input").val(null);
        $("#dfsu_file_input").val(null);
        $('filename_combo').hide();
        
    });
});  

//get selected mode of input
$(document).ready(function(){
    $('#files_mode').click(function(){
        $('#filename_combo').hide();
        $('#files_form_id').show();
        $('#folder_form_id').hide();
        $('#ext_input').hide();
        $('#dfsufile_load_status').hide();
        $('#convert_go').hide();
        $('#load_dfsufile').hide();
        $('#reset_data').hide();
        $('#filename_combo').hide();
        $('#inp_dfsu_contents').hide();
        $('#inp_dfs2_contents').hide();
        $('#inp_asci_contents').hide();
        $('#items_options_div').hide();
        $('#change_no_data_div').hide();
        if($('[name=change_nodata]').is(':checked'))
        {
            $("[name=change_nodata]").prop("checked", false);   
        }
        $('#pfs_details').hide();
        $('#convert_go').hide();
        $('#inp_max_dfsu').hide();
        $('#progress').hide();
        $('#progress_wrapper').hide();
        $('#progress_status').hide();
        $('#alert_wrapper').hide();
        $('#progress_folder').hide();
        $('#progress_wrapper_folder').hide();
        $('#progress_status_folder').hide();
        $('#alert_wrapper_folder').hide();
        $("#dfsu_folder_input").val(null);
        $("#dfsu_file_input").val(null);
        $('filename_combo').hide();
        $('input[name="out_options"]').removeAttr('checked');
        var folder_mode_click=0;
        console.log("selected files mode")
        localStorage.setItem('folder_mode_click',folder_mode_click);
    });
});

$(document).ready(function(){
    $('#folder_mode').click(function(){
        $('#filename_combo').hide();
        $('#files_form_id').hide();
        $('#folder_form_id').hide();
        $('#dfsufile_load_status').hide();
        $('#convert_go').hide();
        $('#load_dfsufile').hide();
        $('#reset_data').hide();
        $('#filename_combo').hide();
        $('#inp_dfsu_contents').hide();
        $('#inp_dfs2_contents').hide();
        $('#inp_asci_contents').hide();
        $('#items_options_div').hide();
        $('#change_no_data_div').hide();
        if($('[name=change_nodata]').is(':checked'))
        {
            $("[name=change_nodata]").prop("checked", false);   
        }
        $('#pfs_details').hide();
        $('#convert_go').hide();
        $('#ext_input').show();
        $('#inp_max_dfsu').hide();
        $('#progress').hide();
        $('#progress_wrapper').hide();
        $('#progress_status').hide();
        $('#alert_wrapper').hide();
        $('#progress_folder').hide();
        $('#progress_wrapper_folder').hide();
        $('#progress_status_folder').hide();
        $('#alert_wrapper_folder').hide();
        $("#dfsu_folder_input").val(null);
        $("#dfsu_file_input").val(null);
        $('filename_combo').hide();
        $('input[name="out_options"]').removeAttr('checked');
        console.log("selected folder mode")
        var folder_mode_click=1;
        localStorage.setItem('folder_mode_click',folder_mode_click);
    });
});

var selected_ext='0';
// After Selecting YES in distance present form
$(document).ready(function(){
    $('#dfsu_ext').click(function(){
        selected_ext="dfsu";
        localStorage.setItem('selected_ext',selected_ext);
        $('#folder_form_id').show();
        $('input[name="out_options"]').removeAttr('checked');
        $("#dfsu_folder_input").val(null);
        $("#dfsu_file_input").val(null);
        $('filename_combo').hide();
    });
});

$(document).ready(function(){
    $('#dfs2_ext').click(function(){
        selected_ext="dfs2";
        localStorage.setItem('selected_ext',selected_ext);
        $('#folder_form_id').show();
        $('input[name="out_options"]').removeAttr('checked');
        $("#dfsu_folder_input").val(null);
        $("#dfsu_file_input").val(null);
        $('filename_combo').hide();
    });
});

$(document).ready(function(){
    $('#asci_ext').click(function(){
        selected_ext="asc";
        localStorage.setItem('selected_ext',selected_ext);
        $('#folder_form_id').show();
        $('input[name="out_options"]').removeAttr('checked');
        $("#dfsu_folder_input").val(null);
        $("#dfsu_file_input").val(null);
        $('filename_combo').hide();
    });
});

// var file_prefix="dfsupro_software_generated_file_";


// $(document).ready(function(){
//     var folder = document.getElementById("dfsu_folder_input");
//     $('[name=dfsu_folder_input]').change(function(e){
        
//         $('#dfsufile_load_status').hide();
//         $('#convert_go').hide();
//         $('#load_dfsufile').hide();
//         $('#reset_data').hide();
//         $('#filename_combo').hide();
//         $('#inp_dfsu_contents').hide();
//         $('#inp_dfs2_contents').hide();
//         $('#inp_asci_contents').hide();
//         $('#items_options_div').hide();
//         $('#pfs_details').hide();
//         $('#convert_go').hide();
//         $('#inp_max_dfsu').hide();
//         $('input[name="out_options"]').removeAttr('checked');
        
//       //  $('#load_model_filesname').text(e.name).show();
//         //NOTE : model_files_name is shape_files_name
//         var clicked=0;
//         var model_files_name=[];
//         var files=folder.files,
//         len=files.length,
//         file_sizes=[]
//         folder_mode_click=String(localStorage.getItem("folder_mode_click"));
//         if(folder_mode_click=="1")
//         {   
//             console.log("goo")
//             selected_ext=String(localStorage.getItem("selected_ext"));
//             console.log(selected_ext)
//             for(i=0;i<len;i++){
//                 //match extns
//                 current_file_extn=String(files[i].name).split(".")[1];
//                 console.log(current_file_extn)
//                 if(current_file_extn==selected_ext)
//                 {
//                 model_files_name.push(String(files[i].name));
//                 console.log("size",files[i].size);
//                 file_sizes.push(parseInt(files[i].size));
                
//                 $.ajax({
//                     url:'/check_if_dfsu_file_present',
//                     type:'POST',
//                     async: false,
//                     data: { model_filename: JSON.stringify(file_prefix.concat(String(files[i].name))) },
//                     success:function(confirmation){
//                         console.log(confirmation)
//                        // console.log(files[i].name)
//                         download_blob(files[i], file_prefix.concat(String(files[i].name)), files[i].type)
//                         clicked=1;
//                     }
//                 })   
//                 console.log(" after delay "+i) 
//                 }    
//             }
//         }

//         if(clicked!=0){
//         console.log('time to wait')
//         console.log(file_sizes)
//         console.log(model_files_name)
//         localStorage.setItem("model_files_name", JSON.stringify(model_files_name));
//         max_file_size=Math.max.apply(Math, file_sizes);
//         //wait for 10 sec after loading
//         $.ajax({
//             url:'/wait_interval',
//             type:'POST',
//              data:{ file_size:JSON.stringify(max_file_size) },
//             success: function(){
//                 $('#load_dfsufile').show();
//                 $('#reset_data').show();
//                 var full_filename='';
//                 if(model_files_name.length<2 && model_files_name.length>0)
//                 {
//                     full_filename=model_files_name[0]
//                     document.getElementById('filename_combo').innerHTML=String(full_filename);
//                     $('#filename_combo').show();
//                 }
//                 else if(model_files_name.length>1)
//                 {   console.log(model_files_name)
//                     var full_filename='';
//                     for(i=0;i<model_files_name.length;i++){
//                         full_filename=full_filename.concat(String(model_files_name[i])+',  ');
                        
//                     console.log(full_filename)    
//                     document.getElementById('filename_combo').innerHTML=String(full_filename);
//                     $('#filename_combo').show();
//                     }

//                 }
//             }
//         })
//     }
//     });
// });

//updated folder input method

$(document).ready(function(){
    var folder = document.getElementById("dfsu_folder_input");
    $('[name=dfsu_folder_input]').change(function(e){
        
        $('#dfsufile_load_status').hide();
        $('#convert_go').hide();
        $('#load_dfsufile').hide();
        $('#reset_data').hide();
        $('#filename_combo').hide();
        $('#inp_dfsu_contents').hide();
        $('#inp_dfs2_contents').hide();
        $('#inp_asci_contents').hide();
        $('#items_options_div').hide();
        $('#change_no_data_div').hide();
        if($('[name=change_nodata]').is(':checked'))
        {
            $("[name=change_nodata]").prop("checked", false);   
        }
        $('#pfs_details').hide();
        $('#convert_go').hide();
        $('#inp_max_dfsu').hide();
        $('input[name="out_options"]').removeAttr('checked');
        $('#progress_folder').hide();
        $('#progress_wrapper_folder').hide();
        $('#progress_status_folder').hide();
        $('#alert_wrapper_folder').hide();
        $('#progress').hide();
        $('#progress_wrapper').hide();
        $('#progress_status').hide();
        $('#alert_wrapper').hide();
      //  $('#load_model_filesname').text(e.name).show();
        //NOTE : model_files_name is shape_files_name
        var clicked=0;
        var model_files_name=[];
        var files=folder.files,
        len=files.length,
        file_sizes=[]
        folder_mode_click=String(localStorage.getItem("folder_mode_click"));
        if(folder_mode_click=="1")
        {   
            selected_ext=String(localStorage.getItem("selected_ext"));

            var progress=document.getElementById("progress_folder")
            var progress_wrapper=document.getElementById("progress_wrapper_folder")
            var progress_status=document.getElementById("progress_status_folder")
            var alert_wrapper=document.getElementById("alert_wrapper_folder")
            
            var data= new FormData();
            var request = new XMLHttpRequest();
            request.responseType="json";
            
            //alert_wrapper.innerHTML="";
            progress_wrapper.classList.remove("d-none");
            
            //add for multiple files
            file_count=0;
            for(i=0;i<len;i++){  
                current_file_extn=String(files[i].name).split(".")[1];
                if(current_file_extn==selected_ext)
                {

                file_count+=1;
                model_files_name.push(String(files[i].name))
                data.append( "file".concat(String(file_count)), files[i]);
                
                }
             }
             data.append("file_count",model_files_name.length)
             localStorage.setItem("model_files_name", JSON.stringify(model_files_name));
             var full_filename='';
             if(model_files_name.length<2 && model_files_name.length>0)
             {
                 full_filename=model_files_name[0]
                 document.getElementById('filename_combo_folder').innerHTML=String(full_filename);
                 $('#filename_combo_folder').show();
             }
             else if(model_files_name.length>1)
             {   console.log(model_files_name.length)
                 var full_filename='';
                 for(i=0;i<model_files_name.length;i++){
                     full_filename=full_filename.concat(String(model_files_name[i])+',  ');
                    }    
                 console.log(full_filename)    
                 document.getElementById('filename_combo_folder').innerHTML=String(full_filename);
                 $('#filename_combo_folder').show();
                
    
             }
    
            request.upload.addEventListener("progress", function(e){
                $('#progress_wrapper_folder').show()
                $('#progress_status_folder').show();
                var loaded= e.loaded;
                var total = e.total;
    
                var percentage_complete= (loaded/total) * 100;
    
                progress.setAttribute("style", `width: ${Math.floor(percentage_complete)}% `);
                progress_status.innerText= `${Math.floor(percentage_complete)}% uploaded...please wait`;
    
            })
    
            request.addEventListener("load", function(e){
    
                if(request.status == 200 ){
                
                if(request.response=="no files")
            {
                $('#progress_folder').hide();
                $('#progress_wrapper_folder').hide();
                $('#progress_status_folder').hide();
                $('#alert_wrapper_folder').hide();
                $('#progress').hide();
                $('#progress_wrapper').hide();
                $('#progress_status').hide();
                $('#alert_wrapper').hide();
                $('filename_combo').hide();

                alert(" No files have the selected extension ")

            }
            else {
                
                progress_status.innerText= "100% uploaded ";
                $('#progress_wrapper_folder').show()
                $('#progress_status_folder').show();

                alert_wrapper.innerHTML=`
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>${request.response.message}</strong>
                </div>`;
                $('#alert_wrapper_folder').show()
                
                $('#load_dfsufile').show()
                $('#reset_data').show()
    
                }
            }
                else
                {
                alert_wrapper.innerHTML=`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong> Error uploading </strong> 
                </div>`;
                $('#load_dfsufile').hide()
                $('#reset_data').hide()
                }
    
            })
    
            request.addEventListener("error", function(e){
    
                alert_wrapper.innerHTML=`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong> Error uploading </strong> 
                </div>`;    
            })
           
            request.open("post","/upload_folder");
            request.send(data);
        }

    });
});


// Updated data/ files input method

$(document).ready(function(){
    var folder = document.getElementById("dfsu_file_input");
    $('[name=dfsu_file_input]').change(function(e){
        $('#dfsufile_load_status').hide();
        $('#convert_go').hide();
        $('#load_dfsufile').hide();
        $('#reset_data').hide();
        $('#filename_combo').hide();
        $('#inp_dfsu_contents').hide();
        $('#inp_dfs2_contents').hide();
        $('#inp_asci_contents').hide();
        $('#items_options_div').hide();
        $('#change_no_data_div').hide();
        if($('[name=change_nodata]').is(':checked'))
        {
            $("[name=change_nodata]").prop("checked", false);   
        }
        $('#pfs_details').hide();
        $('#convert_go').hide();
        $('#inp_max_dfsu').hide();
        $('input[name="out_options"]').removeAttr('checked');
        $('#progress_folder').hide();
        $('#progress_wrapper_folder').hide();
        $('#progress_status_folder').hide();
        $('#alert_wrapper_folder').hide();
        $('#progress').hide();
        $('#progress_wrapper').hide();
        $('#progress_status').hide();
        $('#alert_wrapper').hide();
        
      //  $('#load_model_filesname').text(e.name).show();
        //NOTE : model_files_name is shape_files_name
        var clicked=0;
        var model_files_name=[];
        var files=folder.files,
        len=files.length,
        file_sizes=[]
        folder_mode_click=localStorage.getItem("folder_mode_click");
        if(folder_mode_click=="0")
        {

        var progress=document.getElementById("progress")
        var progress_wrapper=document.getElementById("progress_wrapper")
        var progress_status=document.getElementById("progress_status")
        var alert_wrapper=document.getElementById("alert_wrapper")
        
        var data= new FormData();
        var request = new XMLHttpRequest();
        request.responseType="json";
        
        //alert_wrapper.innerHTML="";
        progress_wrapper.classList.remove("d-none");
        data.append("file_count",len)
        //add for multiple files
        file_count=0;
        for(i=0;i<len;i++){  
            file_count+=1;
            model_files_name.push(String(files[i].name))
            data.append( "file".concat(String(file_count)), files[i]);

         }
         localStorage.setItem("model_files_name", JSON.stringify(model_files_name));
         var full_filename='';
         if(model_files_name.length<2 && model_files_name.length>0)
         {
             full_filename=model_files_name[0]
             document.getElementById('filename_combo').innerHTML=String(full_filename);
             $('#filename_combo').show();
         }
         else if(model_files_name.length>1)
         {   console.log(model_files_name.length)
             var full_filename='';
             for(i=0;i<model_files_name.length;i++){
                 full_filename=full_filename.concat(String(model_files_name[i])+',  ');
                }  
             console.log(full_filename)    
             document.getElementById('filename_combo').innerHTML=String(full_filename);
             $('#filename_combo').show();
             

         }

        request.upload.addEventListener("progress", function(e){
            $('#progress_wrapper').show()
            $('#progress_status').show();
            var loaded= e.loaded;
            var total = e.total;

            var percentage_complete= (loaded/total) * 100;

            progress.setAttribute("style", `width: ${Math.floor(percentage_complete)}% `);
            progress_status.innerText= `${Math.floor(percentage_complete)}% uploaded...please wait`;

        })

        request.addEventListener("load", function(e){

            if(request.status == 200 ){
            
                if(request.response=="no files")
                {
                    $('#progress_folder').hide();
                    $('#progress_wrapper_folder').hide();
                    $('#progress_status_folder').hide();
                    $('#alert_wrapper_folder').hide();
                    $('#progress').hide();
                    $('#progress_wrapper').hide();
                    $('#progress_status').hide();
                    $('#alert_wrapper').hide();
                    $('filename_combo').hide();
                    alert(" No files have the selected extension ")
    
                }
            else
            {

            progress_status.innerText= "100% uploaded ";
            $('#progress_wrapper').show()
            $('#progress_status').show();
            
            alert_wrapper.innerHTML=`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${request.response.message}</strong>
            </div>`;
            $('#alert_wrapper').show()
            
            $('#load_dfsufile').show()
            $('#reset_data').show()

            }
        }
            else
            {
            alert_wrapper.innerHTML=`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong> Error uploading </strong> 
            </div>`;
            $('#load_dfsufile').hide()
            $('#reset_data').hide()
            }

        })

        request.addEventListener("error", function(e){

            alert_wrapper.innerHTML=`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong> Error uploading </strong> 
            </div>`;    
        })
     
        request.open("post","/upload_file");
        request.send(data);
            
        }

    });
});



$(document).ready(function(){
    $('#load_dfsufile').click(function(){
        model_files_name=JSON.parse(localStorage.getItem("model_files_name"));
        console.log(model_files_name)
        folder_mode_click = String(localStorage.getItem('folder_mode_click'))
        mike_version=$('#mike_version').find(":selected").text();
        if(folder_mode_click=="1")
        {
            $.ajax({
                url:'/load_dfsufolder',
                type:'POST',
                data:{ model_files_name:JSON.stringify(model_files_name), mike_version:JSON.stringify(mike_version) },
                success: function(result){
                    console.log(result)
                    to_show=String('File loaded Sucessfully ') 
                    document.getElementById('dfsufile_load_status').innerHTML=to_show
                    $('#dfsufile_load_status').show();
                    // NEW--- show the list of options for processing
                    extn=String(result.extn);
                    localStorage.setItem('extn',extn);
    
                    filename=result.file_name;
                    localStorage.setItem('filename',JSON.stringify(filename));
    
                    if(result.extn=="dfsu")
                    {
                        x_max= String(result.x_max);
                        y_max= String(result.y_max);
                        localStorage.setItem('x_max',x_max);
                        localStorage.setItem('y_max',y_max);
    
                        last_timestep=String(result.last_timestep);
                        localStorage.setItem('last_timestep',last_timestep);
    
                        console.log(String(result.last_timestep));
    
                        if(String(result.last_timestep)=="1"){
                            console.log(" 1 last timestep")
                            $('#inp_max_dfsu').show();
                            $('#items_options_div').hide();
                            $('#change_no_data_div').hide();
                            if($('[name=change_nodata]').is(':checked'))
                            {
                                $("[name=change_nodata]").prop("checked", false);   
                            }
                            $('#inp_dfsu_contents').show();
                            $('#inp_dfs2_contents').hide();
                            $('#inp_asci_contents').hide();
                            $('#only_asci_epsg').hide();
                        }
                        else{
                            $('#inp_dfsu_contents').show();
                            console.log(" not 1 last timestep")
                            item_names=result.item_names;
                            item_order=result.item_order;
                            console.log(item_order)
                            localStorage.setItem("item_order",JSON.stringify(item_order));
                            localStorage.setItem("item_names",JSON.stringify(item_names));
                            dropdown_first=set_dropdown_options(item_names,"first");
                            $('#items_options').empty().append(dropdown_first);
                            $('#items_options_div').show();
                            $('#change_no_data_div').show();
                            $('#inp_dfs2_contents').hide();
                            $('#inp_asci_contents').hide();
                        }
                        
                        //pre-populate these boxes
                        $('#x_orig').val(String(result.x_orig));
                        $('#y_orig').val(String(result.y_orig));
                        $('#grid_size').val(String(result.grid_size));
                        
                        $('#pfs_details').show();
                        $('#convert_go').show();
                        $('#only_asci_epsg').hide();
                    }
    
                    if(result.extn=="dfs2")
                    {
                        $('#inp_dfs2_contents').show();
                        $('#inp_dfsu_contents').hide();
                        $('#inp_asci_contents').hide();
                        $('#pfs_details').hide();
                        $('#convert_go').show();
                        $('#only_asci_epsg').hide();
                        $('#change_no_data_div').show();
    
                    }
    
                    if(result.extn=="asc")
                    {
                        $('#inp_asci_contents').show();
                        $('#inp_dfs2_contents').hide();
                        $('#inp_dfsu_contents').hide();
                        $('#pfs_details').hide();
                        $('#convert_go').show();
                        $('#only_asci_epsg').show();
                        $('#change_no_data_div').show();
    
                    }
                    
                },
                error:function(){
                    alert(" Problem loading files ")
                }
            })
        }

        if(folder_mode_click=="0")
        {  
            $.ajax({
                url:'/load_dfsufile',
                type:'POST',
                data:{ model_files_name:JSON.stringify(model_files_name), mike_version:JSON.stringify(mike_version) },
                success: function(result){
                    console.log(result)
                    to_show=String('File loaded Sucessfully ') 
                    document.getElementById('dfsufile_load_status').innerHTML=to_show
                    $('#dfsufile_load_status').show();
                    // NEW--- show the list of options for processing
                    extn=String(result.extn);
                    localStorage.setItem('extn',extn);

                    filename=result.file_name;
                    localStorage.setItem('filename',JSON.stringify(filename));

                    if(result.extn=="dfsu")
                    {
                        x_max= String(result.x_max);
                        y_max= String(result.y_max);
                        localStorage.setItem('x_max',x_max);
                        localStorage.setItem('y_max',y_max);

                        last_timestep=String(result.last_timestep);
                        localStorage.setItem('last_timestep',last_timestep);

                        console.log(String(result.last_timestep));

                        if(String(result.last_timestep)=="1"){
                            console.log(" 1 last timestep")
                            $('#inp_max_dfsu').show();
                            $('#items_options_div').hide();
                            $('#inp_dfsu_contents').show();
                            $('#inp_dfs2_contents').hide();
                            $('#inp_asci_contents').hide();
                        }
                        else{
                            $('#inp_dfsu_contents').show();
                            console.log(" not 1 last timestep")
                            item_names=result.item_names;
                            item_order=result.item_order;
                            console.log(item_order)
                            localStorage.setItem("item_order",JSON.stringify(item_order));
                            localStorage.setItem("item_names",JSON.stringify(item_names));
                            dropdown_first=set_dropdown_options(item_names,"first");
                            $('#items_options').empty().append(dropdown_first);
                            $('#items_options_div').show();
                            $('#change_no_data_div').show();
                            $('#inp_dfs2_contents').hide();
                            $('#inp_asci_contents').hide();
                        }
                        
                        //pre-populate these boxes
                        $('#x_orig').val(String(result.x_orig));
                        $('#y_orig').val(String(result.y_orig));
                        $('#grid_size').val(String(result.grid_size));
                        
                        $('#pfs_details').show();
                        $('#convert_go').show();
                        $('#only_asci_epsg').hide();
                    }

                    if(result.extn=="dfs2")
                    {
                        $('#inp_dfs2_contents').show();
                        $('#inp_dfsu_contents').hide();
                        $('#inp_asci_contents').hide();
                        $('#pfs_details').hide();
                        $('#convert_go').show();
                        $('#only_asci_epsg').hide();
                        $('#change_no_data_div').show();

                    }

                    if(result.extn=="asc")
                    {
                        $('#inp_asci_contents').show();
                        $('#inp_dfs2_contents').hide();
                        $('#inp_dfsu_contents').hide();
                        $('#pfs_details').hide();
                        $('#convert_go').show();
                        $('#only_asci_epsg').show();
                        $('#change_no_data_div').show();

                    }
                    
                },
                error:function(){
                    alert(" Problem loading files ")
                }
            })
        }
    });
});

var change_nodata=0;
//Funtion for proceeding to Apply data points
$(document).ready(function(){
    $("#convert_go").click(function(){ 
        $('#post_conversion').hide();
        var change_nodata=0;
        // get selected output file conversion
        extn=String(localStorage.getItem("extn"));
        last_timestep=String(localStorage.getItem("last_timestep"));
        filename=JSON.parse(localStorage.getItem("model_files_name"));
        var out_type = [];
        
        if(extn=="dfsu")
        {
            var out_type = [];
            $.each($("input[name='out_options']:checked"),function(){
                out_type.push($(this).val());
            });
            console.log("You have selected : " +out_type );
            localStorage.setItem("out_type",JSON.stringify(out_type));

            if($('[name=change_nodata]').is(':checked'))
            {
              console.log(" checkd")
              change_nodata=1; 
            }
    
            if(!$('[name=change_nodata]').is(':checked'))
            {
                console.log("not checkd")
              change_nodata=0; 
            }
    
            console.log("Final change nodata value", change_nodata)

            var item_selected = [];
            var item_order='';
            if(last_timestep!="1")
            {
                $.each($(".field_wrapper option:selected"), function(){            
                    item_selected.push($(this).val());
                });
                console.log("You have selected ITEMS: " +item_selected );
                item_order=localStorage.getItem("item_order");
            }
            localStorage.setItem("item_selected",JSON.stringify(item_selected));
            
            //x,y,grid_size
            x_orig=$('#x_orig').val();
            y_orig=$('#y_orig').val();
            grid_size=$('#grid_size').val();
            mike_version=$('#mike_version').find(":selected").text();
            x_max = localStorage.getItem('x_max');
            y_max = localStorage.getItem('y_max');
            // make ajax call
            $.ajax({
                url:'/convert_from_dfsu',
                type:'POST',
                data: { mike_version:JSON.stringify(mike_version), out_type: JSON.stringify(out_type),item_order: JSON.stringify(item_order),  item_selected: JSON.stringify(item_selected), last_timestep:JSON.stringify(last_timestep), x_orig:JSON.stringify(x_orig), y_orig:JSON.stringify(y_orig), grid_size:JSON.stringify(grid_size), filename:JSON.stringify(filename),  x_max:JSON.stringify(x_max), y_max:JSON.stringify(y_max) , change_nodata:JSON.stringify(change_nodata)  },
                success:function(status){
                    console.log(status)
                    //alert user
                    alert('Conversion complete. Please check dfsupro_storage folder for the output file ')
                },
                error: function(){
                    console.log(' Error during conversion ')
                }
            })

        }   

        if(extn=="dfs2")
        {
            var out_type = [];
            $.each($("input[name='out_options']:checked"),function(){
                out_type.push($(this).val());
            });
            console.log("You have selected : " +out_type );
            localStorage.setItem("out_type",JSON.stringify(out_type));
            mike_version=$('#mike_version').find(":selected").text();

           if($('[name=change_nodata]').is(':checked'))
            {
              console.log(" checkd")
              change_nodata=1; 
            }
    
            if(!$('[name=change_nodata]').is(':checked'))
            {
                console.log("not checkd")
              change_nodata=0; 
            }
    
            console.log("Final change nodata value", change_nodata)
            // make ajax call
            $.ajax({
                url:'/convert_from_dfs2',
                type:'POST',
                data: { mike_version:JSON.stringify(mike_version), out_type: JSON.stringify(out_type), filename:JSON.stringify(filename), change_nodata:JSON.stringify(change_nodata) },
                success:function(status){
                    console.log(status)
                    //alert user
                    alert('Conversion complete. Please check dfsupro_storage folder for the output file ')
                },
                error: function(){
                    console.log(' Error during conversion ')
                }
            })

        }  

        if(extn=="asc")
        {
            var out_type = [];
            out_type.push("tif_out")
            console.log("You have selected : " +out_type );
            localStorage.setItem("out_type",JSON.stringify(out_type));
            mike_version=$('#mike_version').find(":selected").text();
            var epsg_code = $('#epsg_code').val();

            if($('[name=change_nodata]').is(':checked'))
            {
              console.log(" checkd")
              change_nodata=1; 
            }
    
            if(!$('[name=change_nodata]').is(':checked'))
            {
                console.log("not checkd")
              change_nodata=0; 
            }
    
            console.log("Final change nodata value", change_nodata)
            // make ajax call
            $.ajax({
                url:'/convert_from_asci',
                type:'POST',
                data: { mike_version:JSON.stringify(mike_version), epsg_code: JSON.stringify(epsg_code), out_type: JSON.stringify(out_type), filename:JSON.stringify(filename), change_nodata:JSON.stringify(change_nodata) },
                success:function(status){
                    console.log(status)
                    //alert user
                    alert('Conversion complete. Please check dfsupro_storage folder for the output file ')
                },
                error: function(){
                    console.log(' Error during conversion ')
                }
            })

        }  


});
});


function myLoop() {         //  create a loop function
    setTimeout(function() {   //  call a 3s setTimeout when the loop is called
      console.log('hello');   //  your code here
      i++;                    //  increment the counter
      if (i < 10) {           //  if the counter < 10, call the loop function
        myLoop();             //  ..  again which will trigger another 
      }                       //  ..  setTimeout()
    }, 3000)
  }


function set_dropdown_options(headers,index){
    // headers=['ele','apolo','poppins']
    if(index=="other")
{    
    var dropdown_new='<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select class="custom-select mt-3" style="display:inline-block; width:500px; height:50px;" id="feats_options_dyn">';
    dropdown_new+='<option>None</option>';
    for(i=0; i<headers.length;i++)
    {
        var opt=headers[i];
        dropdown_new+='<option>'+opt+'</option>';
    }
    dropdown_new+='</select><a href="javascript:void(0);" style="display:inline-block;" class="remove_button mt-3"><img src="static/remove.png" width="32px" height="32px"></a></div>';
    return dropdown_new;
}
else if(index=="first")
{
    var dropdown_new='';
    dropdown_new+='<option>None</option>';
    for(i=0; i<headers.length;i++)
    {
        var opt=headers[i];
        console.log(opt)
        dropdown_new+='<option>'+opt+'</option>';
    }
    
   return dropdown_new;
}
}

// FUnction related to add and remove of feature dropdown
$(document).ready(function(){
    var maxField = 100; //Input fields increment limitation
    var addButton = $('.add_button'); //Add button selector
    var wrapper = $('.field_wrapper'); //Input field wrapper
    var x = 1; //Initial field counter is 1
    
    //Once add button is clicked
    $(addButton).click(function(){
        item_names=JSON.parse(localStorage.getItem("item_names"));
        var fieldHTML = set_dropdown_options(item_names,"other");
        //Check maximum number of input fields
        if(x < maxField){ 
            x++; //Increment field counter
            $(wrapper).append(fieldHTML); //Add field html
        }
    });
    
    //Once remove button is clicked
    $(wrapper).on('click', '.remove_button', function(e){
        e.preventDefault();
        $(this).parent('div').remove(); //Remove field html
        x--; //Decrement field counter
    });
});



//// ######################### UPGRADE PAGE FUNCTIONS ######################## ////

$(document).ready(function(){
    $('#lic_file_input').change(function(e){
        $('#lic_filename').hide();
        $('#lic_validate').hide();
  
        $('#lic_filename').text(e.target.files[0].name).show();
        $('#lic_filename').val(e.target.files[0].name);
        
      
        var data= new FormData();
        var request = new XMLHttpRequest();
        request.responseType="json";
        
        var file = e.target.files[0];
        var filename=file.name;
  
        data.append( "file", file);
  
        request.addEventListener("load", function(e){
  
          if(request.status == 200 ){
            $('#lic_validate').show();
          }
  
        })
        request.open("post","/upload_file_lic");
        request.send(data);
        
    });
  });
  
  






































































//################################################## HELPER FUNCTIONS###########################################################################################
function csv_to_table(river_data,tid,caption)
{
    var table_data='<table class="table table-bordered table striped" id='+tid+'>';
    if(caption)
    {
        table_data+='<caption>'+caption+'</caption>';
    }      
    //console.log(" AS ARRAY :"+ CSVToArray(e.target.result,',')[1][0]+'...'+ CSVToArray(e.target.result,',')[2]+'...'+ CSVToArray(e.target.result,',')[3]);
    for(var count=0; count<6; count++)
    {
        var cell_data=river_data[count].split(',');
        table_data+='<tr>';
        // Collect only headers
        var headers=[];
            for(var cell_count=0; cell_count<cell_data.length; cell_count++)
            {	// triple 0 means ==0 and ==integer type(0's type)
                if(count===0)
                {   
                    table_data+='<th>'+cell_data[cell_count]+'</th>';
                    headers.push(cell_data[cell_count]);
                   // console.log("headers",headers)
                    //to store an array to locastorage- make it to json
                    
                    localStorage.setItem("headers",JSON.stringify(headers));
                }
                
                else
                {
                    table_data+='<td>'+cell_data[cell_count]+'</td>';
                }
            }
            table_data+='</tr>';
    }
    table_data+='</table>';
    return table_data;
}


//for non-5 header tables
function csv_to_table_two_rows(river_data,tid,caption)
{
    var table_data='<table class="table table-bordered table striped" id='+tid+'>';
    if(caption)
    {
        table_data+='<caption>'+caption+'</caption>';
    }      
    //console.log(" AS ARRAY :"+ CSVToArray(e.target.result,',')[1][0]+'...'+ CSVToArray(e.target.result,',')[2]+'...'+ CSVToArray(e.target.result,',')[3]);
    for(var count=0; count<2; count++)
    {
        var cell_data=river_data[count].split(',');
        table_data+='<tr>';
        // Collect only headers
        var headers=[];
            for(var cell_count=0; cell_count<cell_data.length; cell_count++)
            {	// triple 0 means ==0 and ==integer type(0's type)
                if(count===0)
                {   
                    table_data+='<th>'+cell_data[cell_count]+'</th>';
                    headers.push(cell_data[cell_count]);
                    //to store an array to locastorage- make it to json
                    
                    localStorage.setItem("headers",JSON.stringify(headers));
                }
                
                else
                {
                    table_data+='<td>'+cell_data[cell_count]+'</td>';
                }
            }
            table_data+='</tr>';
    }
    table_data+='</table>';
    return table_data;
}

// }); https://stackoverflow.com/questions/33556732/flask-return-pandas-dataframe-to-ajax-errno-10054
//https://thoughtbot.com/blog/ridiculously-simple-ajax-uploads-with-formdata
//https://stackoverflow.com/questions/20310134/post-a-file-to-flask-url-using-ajax?noredirect=1&lq=1

function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
         // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
  // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];
      // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
          // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
        }
        var strMatchedValue;
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){
          // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {
          // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    // Return the parsed data.
    return( arrData );
}

//var csv is the CSV file with headers
function csvJSON(csv){
    if(getOS()=='Linux'){
        var lines=csv.split("\n");
    }
    else if(getOS()=='Windows'){
        var lines=csv.split("\r\n");
    }
     
    var result = []; 
    var headers=lines[0].split(",");
    //console.log(headers) 
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }  
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

    // JSON to CSV Converter
    function ConvertToCSV(objArray) {
        //use parse to convert string to actual json object
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var popy='';
        console.log(typeof objArray);
        console.log(typeof array);
        
        //to get headers first
        for (bar in array[1])
        {
            if (popy != '') popy += ','
            popy+=bar;
        }

        str+=popy+ '\r\n';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            
            for (var index in array[i]) {
              
                if (line != '') line += ','
                
                line += array[i][index];
                
            }
           str += line + '\r\n';
        }
        return str;
    }

