Ext.define('app.view.Simulation', {
    extend: 'Ext.Panel',
    xtype: 'simulationpanel',
    config: {
        layout: 'card',
        items: 
        [
        {   
            docked: 'top',
            xtype: 'toolbar',
            ui: 'darker_blue',
            title: 'Flood Simulation Browser',
        },
        {
            xtype: 'SimulationMap',
            flex: 2,
        }],
    }
});