// Change the three numbers below to adjust the weight for each type of score:

// match on a flavor - the pack has the flavour you selected
var mat_weight = 1;
// relenvancy score - the flavour you selected is the highest ranked within its category for that kit, and more than 1
var rel_weight = 1;
// the weight of the intensity match 
var val_weight = 1;

function relevancy_weights(category, weight) {
	var max_value = Math.max.apply(Math, category);
	return category.map(
		function(tag) {
			return ( tag > 1 && tag == max_value ) ? 1 * weight : 0;
		})
}

function match_weights(category, weight) {
	return category.map(
		function(tag) {
			return tag > 0 ? 1 * weight : 0;
		})
}

function score(weights, test) {
	var sum = 0;
	for (var i = 0; i < weights.length; i++) {
		sum += weights[i] * test[i];
	}
	return sum;
}

function value_score(kit_value, test_value, weight) {
	//for value range 1-3
	return test_value == 0 ? 0 : (2 - Math.abs(kit_value - test_value)) * weight;
}

var kits = [
	fireplace_sipper, 
	smoking_guns, 
	berry_bunch, 
	liquid_dessert, 
	day_at_the_ocean, 
	wild_wild_west, 
	tropical_island, 
	springtime_picknic, 
	exotic_exploration, 
	mediterranean_flavours, 
	russian_roulette, 
	earth_and_salt 
];


function get_result(test_input) {

	var result_array = [];

	for (var i = 0; i < kits.length; i++) {
		var kit = kits[i];
		var kit_rel_score = 0;
		var kit_mat_score = 0;
		var kit_val_score = 0;

		for (var j = 0; j < kit.categories.length; j++) {
			var category = kit.categories[j];

			kit_rel_score += score(relevancy_weights(category, test_input.relevancyWeight), test_input.categories[j]);
			kit_mat_score += score(match_weights(category, test_input.flavourWeight), test_input.categories[j]);
		};

		for (var j = 0; j < kit.values.length; j++) {
			kit_val_score += value_score(kit.values[j], test_input.values[j], test_input.intensityWeight);
		};

		result_array.push({
			color: kit.color,
			name: kit.name,
			mat_score: kit_mat_score,
			rel_score : kit_rel_score,
			val_score: kit_val_score,
			sum_score: kit_mat_score + kit_rel_score + kit_val_score
		})


	};

	return result_array;

}


// The array.reduce version of score()
// function score2(weights, test) {
// 	return weights.reduce(function(sum, weight, i) {
// 		return sum + weight * test[i];
// 	}, 0);
// }