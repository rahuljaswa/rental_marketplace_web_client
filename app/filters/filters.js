angular.module('app.filters', [])

.filter('formattedCard', function() {
	return function(card) {
		return (card.brand + " ending in " + card.last_four + " (exp. " + card.exp_month + "/" + card.exp_year + ")");
	};
});
