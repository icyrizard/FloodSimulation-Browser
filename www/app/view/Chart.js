// var drawComponent = new Ext.draw.Component({
//     config: {
//         width: 100,
//     },
//     items: [{
//         type: 'circle',
//         fill: '#79BB3F',
//         radius: 20,
//     }]
// });

// var store = new Ext.data.JsonStore({
//         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
//         data: [
//             {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
//             {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
//             {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
//             {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
//             {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}                                                
//         ]
// });

// var chart = new Ext.chart.Chart({
//     //animate: true,
//     store: store,
//     width: 500,
//     height: 200,
    
//     axes: [
//         {
//             type: "Numeric",
//             position: 'left',
//             fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
//             title: 'Numeric',
//             minimum: 0,
//         },
//         {
//             type: 'Category',
//             position: 'bottom',
//             fields: ['name'],
//             title: 'Category',
//             label: {
//                 rotate: {
//                     degrees: 35
//                 }
//             }
//         }
//     ],

//     series: [{
//         type: 'area',
//         highlight: false,
//         axis: 'left',
//         xField: 'name',
//         yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
//         style: {
//             opacity: 0.93
//         }
//     }]
// });

Ext.define('app.view.Chart', {
	extend: 'Ext.Panel',
    id: 'flood-chart',
	xtype: 'floodChart',
    requires: ['Ext.data.Store'],

	config: {
        width: 520,
        height: 220,
        draggable: true,
		items: [{
            xtype: 'chart',
            id: 'flood-chart-id',
            store: 'chartStore',
            width: 500,
            height: 200,
            axes: [
                {
                    type: "Numeric",
                    position: 'left',
                    fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
                    title: 'Numeric',
                    minimum: 0,
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Category',
                    label: {
                        rotate: {
                            degrees: 35
                        }
                    }
                }
            ],

            series: [{
                type: 'area',
                highlight: false,
                axis: 'left',
                xField: 'name',
                yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
                style: {
                    opacity: 0.93
                }
            }]
        },
        {
            xtype: 'button',
            ui: 'circle ',
            id: 'closeChart',
            left: -15,
            top: -15,
            width: 30,
            height: 30,
            cls: 'closebutton',
            style: 'background: url(resources/images/closebutton50.png) no-repeat; background-size: 30px; border: none',

        }]
    }
});

// (function(){
// 	var drawComponent = new Ext.draw.Component({
//     items: [{
//         type: 'circle',
//         fill: '#79BB3F',
//         radius: 100,
//         x: 100,
//         y: 100
//     }]
// });

// new Ext.Panel({
//     fullscreen: true,
//     items: [drawComponent]
// });

// })();
