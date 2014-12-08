var app = app || {};

app.qrCodeModel = Backbone.Model.extend({

	defaults: {
		text: "Intro text",
		playerPos: "player#Login",
		containerClass: "gameContain"
	}
	
});