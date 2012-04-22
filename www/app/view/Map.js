Ext.define('app.view.Map', {
	extend: "Ext.Map",
	xtype: 'SimulationMap',
	id: 'mapa',

	config: {
		mapOptions : {
			zoom : 10,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			navigationControl: true,
			navigationControlOptions: {
				style: google.maps.NavigationControlStyle.DEFAULT
			}
		}
	},

	example: function() {
		console.log("example function");
	}
});