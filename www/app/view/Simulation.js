/*simulationpanel, this is the right side of the app, on flex 2*/
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
            title: 'Flood Simulation Browser',
        },
        {
            xtype: 'SimulationMap',
        }],
    }
});