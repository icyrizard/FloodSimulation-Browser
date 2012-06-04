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

var chart = new Ext.chart.Chart({
    width: 200,
    height: 200,
    animate: true,
});

Ext.define('app.view.Chart', {
	extend: 'Ext.chart.Panel',
    id: 'flood-chart',
	xtype: 'floodChart',

	config: {
        width: 100,
        height: 100,
        draggable: true,
		items: [chart]
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
