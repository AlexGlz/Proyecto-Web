const mongoose = require('mongoose');
const validator = require('validator')


const recipeSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	prep_time:{
		type: Number,
		required: true
	},
	cook_time:{
		type: Number
	},
	difficulty:{
		type: Number,
		validate(value){
			if(value>3 || value<0){
				throw new Error('Dificultad solamente se permite entre 1 y 3');
			}
		}
	},
	servings:{
		type: Number
	},
	clasif:{
		type: [String]
	},
	nutrition:{
		kcal:{
			type: Number
		},
		sugar:{
			type: Number
		},
		fat:{type: Number},
		saturates:{type: Number},
		salt:{type: Number}
	},
	ingredients:{
		type:[String],
		required: true
	},
	steps:{
		type:[String],
		required: true
	},
	photo_url:{
		type:String
		//Validate URL
	},
	createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}); 

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;