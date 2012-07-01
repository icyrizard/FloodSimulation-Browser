Ext.define('app.view.Chart', {
	extend: 'Ext.Panel',
    id: 'flood-chart',
	xtype: 'floodChart',
    requires: ['Ext.data.Store'],

	config: {
        width: 520,
        height: 420,
        layout: 'fit',
        draggable: true,
		items: [{
            xtype: 'chart',
            theme: 'Base',
            animate: true,
            id: 'flood-chart-id',
            store: 'chartStore',
            left: 20,
            width: 490,
            height: 400,
            axes: [
                {
                    type: "Numeric",
                    position: 'left',
                    fields: ['volume'],
                    title: 'Volume',
                    minimum: 0,
                    adjustMinimumByMajorUnit: 0,
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['time'],
                    title: 'Time Step',
                    minimum: 0,
                    adjustMinimumByMajorUnit: 0,
                }
            ],

            series: [{
                type: 'line',
                highlight: false,
                smooth: true,
                axis: 'left',
                xField: ['time'],
                yField: ['volume'],
            }],

            // interactions: [
            // {
            //     type: 'panzoom',
            //     axes: ['bottom', 'left']
            // },
            // {
            //     type: 'reset'
            // }]
        },
        {
            xtype: 'button',
            ui: 'close',
            id: 'closeChart',
            left: 0,
            top: 0,
            iconCls: 'delete',
            iconMask: true,
            //style: 'background: url(resources/images/closebutton50.png) no-repeat; background-size: 30px; border: none',
        }],
        // {
        //     xtype: 'button',
        //     ui: 'toggle',
        //     top: 0,
        //     right: 0,
        //     text: 'drag'
        // },
        // {
        //     xtype: 'button',
        //     id: 'expand-button',
        //     bottom: 0,
        //     right: 0,
        //     iconCls: 'expand',
        //     iconMask: true,
            
        // }]
    }
});