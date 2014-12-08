// Namespace our flowerApp
var app = app || {};

// A group (array) of Flower models
app.squareCollection = Backbone.Collection.extend({

  // What type of models are in this collection?
  model: app.singleSquare

});