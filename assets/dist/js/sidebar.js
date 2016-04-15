/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Sidebar(){
    this.initSd = getMenuBySession;
    this.initUsername = getUsername;
}

function getMenuBySession(){    
    var formData = new FormData($(this)[0]);        
    formData.append('detail', 'Sidebar');  
    ajaxPro('POST', '/l-fis/menu/getByIdType', formData, 'JSON', false, false, false, false, success, success, null);     
    function success(output) {           
        var html = '';
        $(output.data).each(function(i, v){
            html += '<li>';
            html += '<a href="../l-fis/'+v.controller+'">';
            html += '<i class="'+v.icon+'"></i> <span>'+v.detail+'</span>';
            html += '</a>';
            html += '</li>';
        });
        $('#sidebar-menu').html(html);
    } 
}

function getUsername(){            
    ajaxPro('POST', '/l-fis/staff/getBySession', null, 'JSON', false, false, false, false, success, success, null);     
    function success(output) {           
        var html = '';
        html += '<img src="'+output.data.photo+'" class="user-image" alt="User Image">';
        html += '<span class="hidden-xs">'+output.data.username+'</span>';
        $('#user-login').html(html);
    } 
}