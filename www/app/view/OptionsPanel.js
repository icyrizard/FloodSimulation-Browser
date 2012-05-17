Ext.define('app.view.OptionsPanel', {
	extend: 'Ext.Panel',
	xtype: 'SimulationOptions',
	id: 'simulation_options',
	config: {
		right: 40,
		width: 200,
		height: 100,
		//scroll: true,
		modal: true,
		items: [{
			xtype: 'list',
			fullscreen: true,
			itemTpl: 'Simulation {type}',
			data: [
				{type: "Flood Simulation"},
				{type: "Lsm"}
			],
		}]
	}
});