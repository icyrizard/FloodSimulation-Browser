var drawComponent = new Ext.draw.Component({
    items: [{
        type: 'circle',
        fill: '#79BB3F',
        radius: 100,
        x: 100,
        y: 100
    }]
});

Ext.define('app.view.Chart', {
	extend: 'Ext.Panel',
	xtype: 'chartpanel',
	config: {
		items: [drawComponent]
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
