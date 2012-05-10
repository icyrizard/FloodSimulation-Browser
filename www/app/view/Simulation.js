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
                items: [
                {
                    xtype: 'button',
                    id: 'closebutton',
                    iconCls: 'delete',
                    iconMask: true,
                    width: 45,                    
                    top: -30,
                    left: -20,
                },
                {
                    layout: 'vbox',
                    top: 15,
                    align: 'center',
                    items : [
                    {
                        xtype: "button",
                        id: 'backwards',
                        width: 45,
                        iconCls: 'arrow_left',
                        floating: 'right',
                        iconMask: true,
                        left: 90,
                        align: 'center',
                    },
                    {
                        xtype: "button",
                        id: 'forward',
                        width: 45,
                        floating: 'left',
                        iconCls: 'arrow_right',
                        align: 'center',
                        left: 155,
                        iconMask: true,
                    }]
                }],
            }]
        },
});

