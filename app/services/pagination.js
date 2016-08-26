angular.module('app.pagination', [])

.factory('Pagination', function() {
	return {
		generateInfo: function(response) {
			var pages_to_display = [];
			var max_pages_to_display = 10;
			var pages_till_end = response.metadata.number_of_pages - response.metadata.page;

			if (response.metadata.number_of_pages <= max_pages_to_display) {
				for (var i = 1; i <= response.metadata.number_of_pages; i++) {
					pages_to_display.push(i);
				}
			} else if (pages_till_end <= max_pages_to_display/2) {
				for (var i = max_pages_to_display - pages_till_end; i <= response.metadata.number_of_pages; i++) {
					pages_to_display.push(i);
				}
			} else {
				var first_page = Math.max(1, response.metadata.page - max_pages_to_display/2);
				for (var i = first_page; i <= first_page + max_pages_to_display; i++) {
					pages_to_display.push(i);	
				}
			}

			return {
				page: response.metadata.page,
				last_page: response.metadata.number_of_pages,
				pages_to_display: pages_to_display
			}
		}
	}
});
