Ext.define('app.model.SimulationModel', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: ['name', 'corners', 'visbounds', 'area_id', 'center', 'size'],
	},
});