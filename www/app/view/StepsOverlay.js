Ext.define('app.view.StepsOverlay', {
	extend: 'Ext.Container',
	xtype: 'StepsOverlay',
	requires : ['Ext.Anim'],
	
    
    config: {
    	id: 'overlay',
    	showAnimation: {
    		type: 'slideIn',
    		direction:'left',
    	},

    	hideAnimation:{
    		type: 'slideOut',
    		direction:'right',
    	},
    	dragging: true,
    	autoDestroy: true,
    	hidden: true,
	    width: 200,
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
	        right: 10,
	        border: 'solid',
	        handler: this.closebutton,
	        scope: this,
	    },
	    {
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
	            left: 10,
	            align: 'center',

	        },
	        {
	            xtype: "button",
	            id: 'forward',
	            width: 45,
	            floating: 'left',
	            iconCls: 'arrow_right',
	            align: 'center',
	            left: 100,
	            iconMask: true,
	        }]
	    }],

	    listeners: [{
	    	hide: function(){
	    		console.log('hide StepsOverlay');
	    	}
	    }],

	    closebutton: function(){
	    	console.log('closebutton');
	    	Ext.dispatch({
	    		controller: app.controller.Main,
	    		action: 'closeoverlay'
	    	});
	    }
	}
});




