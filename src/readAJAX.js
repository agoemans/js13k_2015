function loadFile(cb, ctx, file){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onload = function(){
		var level = xmlhttp.responseText;
		
     	cb.call(ctx, level);
	}
	
    xmlhttp.open("GET",file, true);
    xmlhttp.send();
    
}


    
    

    

