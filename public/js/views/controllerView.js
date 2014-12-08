var app = app || {};

app.controllerView = Backbone.View.extend({

	template: _.template( $("#controllerUI").html() ),

	initialize: function () {
		this.model.on('change', this.render, this);
	},

	render: function(con) {
		var conTemplate = this.template(this.model.toJSON());
		this.$el.html(conTemplate);
		return this;
	}
});