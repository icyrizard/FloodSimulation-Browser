Ext.define('app.view.SimulationList', {
	extend: 'Ext.List',
	xtype: 'SimulationList',
	id: 'summary',


	config: {
		scrollable: {
			momentum: false
		},
		title: 'Floods',
		fullscreen: true,
		store: 'SimulationsSummary',
		itemTpl: '<div><img class="map_thumb" id="{test_id}_map"' +
                    'src=""/> ' +
                    '<img class="flood_thumb" id="{test_id}_flood"' +
                    'style:"width: 100px;" src=""/>' +
                    '<div style:"clear:both">'+
                    '<div id="{test_id}_control" class="control"></div>' +  
                    '</div><h3><b>submitted:</b></h3> <bold>{submitted}</bold></div></div>'
	},

	listeners : {
		scroll: function() {
			console.log('scroll');
		}
	}
});