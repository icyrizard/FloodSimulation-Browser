Ext.define('app.model.SimulationDetails', {
	extend: 'Ext.data.Model',

	config: {
		fields: ['name', 'center', 'corners', 'size', 'extents', 'visbounds', 'vissize', 'projection', 'dikes'],
	},
});
