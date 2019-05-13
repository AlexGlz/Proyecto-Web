

$("#addClasif").click(function() {
	if($("#clasifSelector").val()){
		var newIntredient = `<li><input type="textRecipe" placeholder="Clasificación" class="clasif verify" disabled=""></li>`
		$("#clasifContainer").append(newIntredient)
		clasifname = $("#clasifSelector").val()
		$("#clasifContainer li input").last().val(clasifname)
		disableClasif(clasifname)
		$("#clasifSelector").val('0')
	}
})

function enableClasif(clasifname){
	options = $("#clasifSelector option");
	for(i=0;i<options.length;i++){
		if(clasifname == options[i].value){
			options[i].disabled=false;
		}
	}
}

function disableClasif(clasifname){
	options = $("#clasifSelector option");
	for(i=0;i<options.length;i++){
		if(clasifname == options[i].value){
			options[i].disabled = true;
		}
	}
}

$("#delClasif").click(function() {
	clasifname = $("#clasifContainer li input").last().val()
	console.log(clasifname)
	$("#clasifContainer li").last().remove()
	enableClasif(clasifname);
})


$("#addIngredient").click(function() {
	var newIntredient = `<li><input type="textRecipe" placeholder="Ingrediente" class="ingrediente verify"></li>`
	$("#ingredientsContainer").append(newIntredient)

})


$("#delIngredient").click(function() {
	$("#ingredientsContainer li").last().remove()
})


$("#addStep").click(function() {
	var newStep = `<li><textarea class="paso verify"></textarea></li>`
	$("#stepsContainer").append(newStep)
})


$("#delStep").click(function() {
	$("#stepsContainer li").last().remove()
})


var url_string = window.location.href
var url = new URL(url_string);
var recetaId = url.searchParams.get("receta");
var mode = url.searchParams.get("mode");

if(mode == "edit"){
	$("#modo").html("Editar Receta")
	console.log("modo editar")
	console.log(recetaId)
	loadRecipe();
}


function loadRecipe() {
  $.ajax({
    //url: 'http://localhost:3000/recipes/'+recetaId,
    url: 'https://proy-final.herokuapp.com/recipes/'+recetaId,
    headers: {
        'Content-Type':'application/json',
        //'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
    	console.log("load edit")
    	$("#url").val(data.photo_url)
    	$("#name").val(data.name)
    	$("#servings").val(data.servings)
    	$("#prep_time").val(data.prep_time)
    	$("#cook_time").val(data.cook_time)
    	$("#difficulty").val(data.difficulty)
    	loadIngredients(data.ingredients)
    	loadSteps(data.steps)
    	loadClasif(data.clasif)
    	$("#kcal").val(data.nutrition.kcal)
    	$("#sugar").val(data.nutrition.sugar)
    	$("#fat").val(data.nutrition.fat)
    	$("#saturates").val(data.nutrition.saturates)
    	$("#salt").val(data.nutrition.salt)
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

function loadClasif(clasifs){
	//$("#clasifContainer li input").last().val(clasifs[0])
	//disableClasif(clasifs[0])	
	for (var i = 0; i < clasifs.length; i++) {
		var newClasif = `<li><input type="textRecipe" placeholder="Clasificación" class="clasif verify" disabled=""></li>`
		$("#clasifContainer").append(newClasif)
		$("#clasifContainer li input").last().val(clasifs[i])
		disableClasif(clasifs[i])
	}
}

function loadIngredients(ingredientes){
	$("#ingredientsContainer li input").last().val(ingredientes[0])	
	for (var i = 1; i < ingredientes.length; i++) {
		var newIntredient = `<li><input type="textRecipe" placeholder="Ingrediente" class="ingrediente verify"></li>`
		$("#ingredientsContainer").append(newIntredient)
		$("#ingredientsContainer li input").last().val(ingredientes[i])
	}
	
}

function loadSteps(steps){
	$("#stepsContainer li textarea").last().val(steps[0])	
	for (var i = 1; i < steps.length; i++) {
		var newStep = `<li><textarea class="paso verify"></textarea></li>`
		$("#stepsContainer").append(newStep)
		$("#stepsContainer li textarea").last().html(steps[i])
	}
	
}



function getIngredients(){
	var camposIn = $("#ingredientsContainer li input");
	var ingredientes = [];
	for(i=0; i<camposIn.length;i++){
		ingredientes.push(camposIn[i].value)
	}
	return ingredientes;
}

function getSteps()
{
	var camposSteps = $("#stepsContainer li textarea")
	var steps = [];
	for(i=0; i<camposSteps.length;i++){
		steps.push(camposSteps[i].value)
	}
	return steps;
}

function getClasif(){
	var camposCl = $("#clasifContainer li input");
	var clasifs = [];
	for(i=0; i<camposCl.length;i++){
		clasifs.push(camposCl[i].value)
	}
	console.log(clasifs)
	return clasifs;
}


function updateRecipe(){
	var ingredients = getIngredients();
	var steps = getSteps();
	var clasif = getClasif()
	json_to_send = {
		"photo_url": $("#url").val(),
		"name": $("#name").val(),
		"servings":$("#servings").val(),
    	"prep_time":$("#prep_time").val(),
    	"cook_time":$("#cook_time").val(),
    	"difficulty":$("#difficulty").val(),
    	"ingredients": ingredients,
    	"steps": steps,
    	"clasif": clasif,
    	"nutrition":{
    			"kcal":$("#kcal").val(),
		    	"sugar":$("#sugar").val(),
		    	"fat":$("#fat").val(),
		    	"saturates":$("#saturates").val(),
		    	"salt":$("#salt").val()
    		}
	}
	json_to_send = JSON.stringify(json_to_send);
	$.ajax({
    //url: 'http://localhost:3000/recipes/'+recetaId,
    url: 'https://proy-final.herokuapp.com/recipes/'+recetaId,
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'PATCH',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      console.log("success");
      alert("Receta actualizada")
      window.location = './user.html'
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

function createRecipe(){
	var ingredients = getIngredients();
	var steps = getSteps();
	var clasif = getClasif()
	json_to_send = {
		"photo_url": $("#url").val(),
		"name": $("#name").val(),
		"servings":$("#servings").val(),
    	"prep_time":$("#prep_time").val(),
    	"cook_time":$("#cook_time").val(),
    	"difficulty":$("#difficulty").val(),
    	"ingredients": ingredients,
    	"steps": steps,
    	"clasif": clasif,
    	"nutrition":{
    			"kcal":$("#kcal").val(),
		    	"sugar":$("#sugar").val(),
		    	"fat":$("#fat").val(),
		    	"saturates":$("#saturates").val(),
		    	"salt":$("#salt").val()
    		}
	}
	json_to_send = JSON.stringify(json_to_send);
	$.ajax({
    //url: 'http://localhost:3000/recipes',
    url: 'https://proy-final.herokuapp.com/recipes',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      console.log("success");
      alert("Receta Creada")
      window.location = './user.html'
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}


$("#btnGuardar").click(function(event){
	if(!verifyData()){
		alert("Favor de llenar todos los campos")
	}else if(mode == 'edit'){
		updateRecipe();
		
	}else if(mode == 'create'){
		createRecipe();
		//window.location = './user.html'
	}
	
})

function verifyData(){
	var inputs = $(".verify")
	for(i=0;i<inputs.length;i++){
		if(inputs[i].value == ""){
			inputs[i].focus()
			return false;
		}
	}
	return true;
}