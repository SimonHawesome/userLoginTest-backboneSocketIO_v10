var app = app || {};

app.gameView = Backbone.View.extend({

	template: _.template( $("#gameUI").html() ),

	initialize: function () {
		this.model.on('change', this.render, this);
	},

	render: function(con) {
		var gameTemplate = this.template(this.model.toJSON());
		this.$el.html(gameTemplate);
		return this;
	}
});