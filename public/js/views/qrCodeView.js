var app = app || {};

app.qrCodeView = Backbone.View.extend({

	template: _.template( $("#QRcode").html() ),

	initialize: function () {
		this.model.on('change', this.render, this);
	},

	render: function(qr) {
		var qrTemplate = this.template(this.model.toJSON());
		this.$el.html(qrTemplate);
		return this;
	}
});