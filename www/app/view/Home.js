Ext.define('app.view.Home', {
	extend: "Ext.tab.Panel",
	xtype: 'homepanel',

	config: {
		title: 'Home',	
		iconCls: 'home',
		styleHtmlContent: true,
		scrollable: true,
		html: [	
			'<h1>Home Page</h1>',
			'<p>This the home page<p>',
		].join('')
	}
});