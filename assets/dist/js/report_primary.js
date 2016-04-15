var dt_report_primary = null;

function ReportPrimary(){
    this.initDT = initReportPrimaryDT;
    this.getClass = getReportPrimaryClass;
    this.getEducation = getReportPrimaryEducation;
    this.initDRP = initReportPrimaryDRP;
    this.resetField = resetReportPrimaryField;
    this.primaryFilter = primaryReportPrimaryFilter;
}

function initReportPrimaryDT(){
    ajaxPro('GET', '/l-fis/report_primary/resources', null, 'json', false, false, false, false, success, success, null);          
    function success(output) {                  
        
        $('#dt-report-primary').append('<tfoot><tr><th colspan="'+(output.columnDefs.length-1)+'"><center>Total</center></th><th></th></tr></tfoot>');
        dt_report_primary = $('#dt-report-primary').DataTable({
            ajax : '../l-fis/report_primary/resources2',       
            dom: 'Bfrtip', //B -> Button
            buttons: [
                {
                    text: '<i class="fa fa-filter"></i> Filter',
                    className: 'btn btn-default',
                    action: function ( e, dt, node, config ) {
                        $('#primary-report-filter').modal('show');
                    }
                },
                {
                    text: '<i class="fa fa-print"></i> Export excel',
                    className: 'btn btn-default',
                    action: function ( e, dt, node, config ) {                        
                        var tempReport = [];
                        
                        var d = new Date();    
                        var thead = $('#dt-report-primary thead').html();
                        var tbody = $('#dt-report-primary tbody').html();
                        var tfoot = $('#dt-report-primary tfoot').html();
                        
                        $(tbody).each(function(i, v){
                            var find = false;
                            $(tempReport).each(function(j, w){
                                if($(v).find('td:eq(0)').html().toString().trim().toUpperCase() === w.education.toString().trim().toUpperCase()){
                                    find = true;
                                    return false;
                                }
                            });
                            
                            if (find===false) {
                                tempReport.push({
                                    'payment_type': 'Registrasi',
                                    'education':$(v).find('td:eq(0)').html().trim().toUpperCase(),
                                    'count':0,
                                    'total':0
                                });
                            }                            
                            //                            console.log($(v).find('td:eq(0)').html());
                        });
                        
                        $(tbody).each(function(i, v){
                            var tdMaxIndex = $(v).find("td").length-1;                                                                                    
                            $(tempReport).each(function(j, w){                               
                                if($(v).find('td:eq(0)').html().toString().trim().toUpperCase() === w.education.toString().trim().toUpperCase()){
                                    w['count'] += 1;
                                    w['total'] += parseInt($(v).find('td:eq('+tdMaxIndex+')').html().toString().trim());                                    
                                    return false;                                    
                                }                                
                            });
                        });
                        
                        var tCount = 0;
                        var tTotal = 0;
                        
                        $(tempReport).each(function(j, w){                               
                            tCount += w.count;
                            tTotal += w.total;                            
                        });
                        
                        tempReport.push({
                            'payment_type': '',
                            'education':'',
                            'count':tCount,
                            'total':tTotal
                        });
                        
                        tTotal = 0;                
                        $(tbody).each(function(i, v){                            
                            $(v).find('td').each(function(j, w){
                                if(j>4 && j<($(v).find('td').length-1) && $(w).html()!=0){                                    
                                    tempReport.push({
                                        'payment_type': $('#dt-report-primary thead tr th:eq('+j+')').html(),
                                        'education': $(v).find('td:eq(2)').html(),
                                        'count':$(v).find('td:eq(0)').html(),
                                        'total':parseInt($(w).html())
                                    });
                                    tTotal += parseInt($(w).html());  
                                }                               
                            });                            
                        });
                        
                        tempReport.push({
                            'payment_type': '',
                            'education':'',
                            'count':tCount,
                            'total':tTotal
                        });
                        
                        var html = "";
                        html += "<tr>";
                        html += "<th>Payment</th>";
                        html += "<th>Education</th>";
                        html += "<th>QTY</th>";
                        html += "<th>Total</th>";
                        html += "</tr>";
                        $(tempReport).each(function(j, w){  
                            if (w.education==="") {
                                html += "<tr>";
                                html += "<td colspan='3'><center><b>Total</b></center></td>";                                
                                html += "<td>"+w.total+"</td>";
                                html += "</tr>";                                                   
                            }else{
                                html += "<tr>";
                                html += "<td>"+w.payment_type+"</td>";
                                html += "<td>"+w.education+"</td>";
                                html += "<td>"+w.count+"</td>";
                                html += "<td>"+w.total+"</td>";
                                html += "</tr>";                                                   
                            }
                        });
                        $('.table-print').html(html);
                        
                        
                        
                        //                        $('.table-print').html(thead+tbody+tfoot);
                        $("#table-print").table2excel({
                            exclude: ".table-print",
                            name: "Worksheet Name",
                            filename: "Primary Report "+ d.getFullYear() + concatString((d.getMonth() + 1)) + concatString(d.getDate()) + concatString(d.getHours()) + concatString(d.getMinutes()) + concatString(d.getSeconds()) //do not include extension
                        });                        
                    }
                }
                //                {
                //                    extend: 'collection',
                //                    text: 'Flag',
                //                    buttons: [
                //                        { text: 'High priority'},
                //                        { text: 'Medium priority'},
                //                        { text: 'Low priority'}
                //                    ],
                //                    fade: true
                //                }
                //                {
                //                    text: '<i class="fa fa-print"></i> Export excel',
                //                    className: 'btn btn-default',
                //                    extend: 'csv',
                //                    exportOptions: {
                //                        modifier: {
                //                            page: 'current'
                //                        }
                //                    }
                //                }
            ],
            "columnDefs": output.columnDefs,
            columns : output.columns,
            drawCallback: function( settings ) {
                var api = this.api();            
                var intVal = function ( i ) {
                    return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                            typeof i === 'number' ?
                    i : 0;
                };
                var total = api.column(output.columnDefs.length-1).data().reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );           
                
                var pageTotal = api.column(output.columnDefs.length-1, { page: 'current'} ).data().reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
                
                $('#dt-report-primary tfoot th:last-child').html(pageTotal); 
            },
            footerCallback: function ( row, data, start, end, display ) {            
                var api = this.api();            
                var intVal = function ( i ) {
                    return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                            typeof i === 'number' ?
                    i : 0;
                };
                var total = api.column(output.columnDefs.length-1).data().reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
                var pageTotal = api.column(output.columnDefs.length-1, { page: 'current'} ).data().reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
                
                $('#dt-report-primary tfoot th:last-child').html(pageTotal); 
            },
            pageLength : -1,
            order: []
        });                 
        
        $.fn.dataTable.ext.search.push(function( settings, data, dataIndex ) {
            var min = new Date($('#form-primary-filter input[name=start_date]').val());
            var max = new Date($('#form-primary-filter input[name=finish_date]').val());
            var value = new Date(data[4]); // use data for the age column
            
            if ((isNaN(min) && isNaN(max)) || (isNaN(min) && value <= max ) || ( min <= value   && isNaN( max ) ) ||( min <= value   && value <= max ) ){
                return true;
            }
            return false;
        });   
    } 
    
}

function getReportPrimaryClass(element){
    ajaxPro('POST', '/l-fis/classes/getAll', null, 'json', false, false, false, false, success, success, null);          
    function success(output) {                  
        var html = '<option value=""> - </option>';
        $(output.data).each(function(i, v){                        
            html += '<option value="'+v.detail+'">'+v.detail+'</option>'; 
        });        
        $(element).html(html);
    } 
}

function getReportPrimaryEducation(element){
    ajaxPro('POST', '/l-fis/education/getAll', null, 'json', false, false, false, false, success, success, null);          
    function success(output) {                  
        var html = '<option value=""> - </option>';
        $(output.data).each(function(i, v){                        
            html += '<option value="'+v.detail+'">'+v.detail+'</option>'; 
        });        
        $(element).html(html);
    }  
}

function initReportPrimaryDRP(element){
    $(element).daterangepicker({        
        "singleDatePicker": true,
        "showDropdowns": true,        
        locale: {
            format: 'YYYY-MM-DD',
            cancelLabel:'Reset'
        }
    });
    $(element).val('');
}

function resetReportPrimaryField(trigger, target){
    $(trigger).click(function(){
        $(target).val('');
    });
}

function primaryReportPrimaryFilter(){
    $('#form-primary-filter').submit(function (event) {
        event.preventDefault();                    
        var education = $('#form-primary-filter select[name=education]').val();
        var classes = $('#form-primary-filter select[name=class]').val();
        var status = $('#form-primary-filter select[name=status]').val();
        dt_report_primary.column(0).search(education);
        dt_report_primary.column(3).search(classes);
        dt_report_primary.column(7).search(status);         
        dt_report_primary.draw();
        dt_report_primary.ajax.reload();
        $('#primary-report-filter').modal('hide');
        return false;
    });   
}


function concatString(val) {
    if (val.toString().length === 1) {
        val = '0' + val;
    }
    return val;
}