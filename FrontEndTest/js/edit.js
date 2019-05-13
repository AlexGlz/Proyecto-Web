$("#addIngredient").click(function() {
	var newIntredient = `<li><input type="textRecipe" placeholder="Ingrediente" class="ingrediente"></li>`
	$("#ingredientsContainer").append(newIntredient)
})


$("#delIngredient").click(function() {
	$("#ingredientsContainer li").last().remove()
})


$("#addStep").click(function() {
	var newStep = `<li><textarea class="paso"></textarea></li>`
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
	console.log("modo editar")
	console.log(recetaId)
	loadRecipe();
}


function loadRecipe() {
  $.ajax({
    url: 'http://localhost:3000/recipes/'+recetaId,
    //url: 'https://exam-final.herokuapp.com/todos',
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

function loadIngredients(ingredientes){
	$("#ingredientsContainer li input").last().val(ingredientes[0])	
	for (var i = 1; i < ingredientes.length; i++) {
		var newIntredient = `<li><input type="textRecipe" placeholder="Ingrediente" class="ingrediente"></li>`
		$("#ingredientsContainer").append(newIntredient)
		$("#ingredientsContainer li input").last().val(ingredientes[i])
	}
	
}

function loadSteps(steps){
	$("#stepsContainer li textarea").last().val(steps[0])	
	for (var i = 1; i < steps.length; i++) {
		var newStep = `<li><textarea class="paso"></textarea></li>`
		$("#stepsContainer").append(newStep)
		$("#stepsContainer li textarea").last().html(steps[i])
	}
	
}