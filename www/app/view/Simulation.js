Ext.define('app.view.Simulation', {
    extend: 'Ext.navigation.View',
    xtype: 'simulationpanel',

    config: {
        title: "Map",
        layout: "card",
        items: [
            {
                xtype: 'SimulationMap',      
                flex: 2,
            },
            {
                xtype: 'panel',
                id: 'overlay',
                floating: true,
                hidden: true,
                width: 300,
                height: 80,
                scroll: false,
                items: [{
                    xtype: 'button',
                    id: 'closebutton',
                    iconCls: 'delete',
                    iconMask: true,
                    width: 45,
                    
                    bottom: -30,
                    right: -20,
                },
                {
                    xtype: 'segmentedbutton',
                    items: [
                    {
                        text: 'back'
                    },
                    {
                        text: 'forward'
                    }

                    ]
                }],
            }],
    },
});

