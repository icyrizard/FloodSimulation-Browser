Ext.define('app.view.StepsOverlay', {
	extend: 'Ext.Container',
	xtype: 'StepsOverlay',
	requires : ['Ext.Anim'],
	
    
    config: {
    	// style: "background-image: url(resources/images/bg.png) x-repeat y-repeat !important",
    	id: 'overlay',
    	style: 'background: none;',
    	html: '<div id="controls_title"><h2>Controls<h2></div>',
    	showAnimation: {
    		type: 'slideIn',
    		direction:'left',
    	},

		hidden: true,
	    width: 220,
	    height: 130,
	    scroll: false,
	    draggable: true,
	    items: [
	    {
	        xtype: 'button',
	        id: 'closebutton',
	        top: -10,
	        right: 0,
	        ui:'plain',
	        border: 'solid',
	        style: 'color: white; background: none',
	        html: 'x',
	        handler: this.closebutton,
	        scope: this,
	    },
	    {
	        top: 30,
	        left: 35,
	        align: 'center',
	        items : [
	        {
	            xtype: "button",
	            id: 'forward',
	            ui: 'blue',
	            cls: 'overlay-button',
	            width: 45,
	            iconCls: 'arrow_up',
	            floating: 'right',
	            iconMask: true,
	            align: 'center',
	            left: 40
	        },
	        {
	        	top: 50,
	            xtype: "button",
	            id: 'backwards',
	            ui: 'blue',
	            cls: 'overlay-button',
	            width: 45,
	            floating: 'left',
	            iconCls: 'arrow_down',
	            align: 'center',
	            iconMask: true,
	            left: 40
	        },
	        {
	        	top: 24,
	            xtype: "button",
	            id: 'play',
	            ui: 'blue',
	            cls: 'overlay-button',
	            width: 40,
	            floating: 'left',
	            iconCls: 'arrow_right',
	            align: 'center',
	            iconMask: true,
	            left: 85,
	        },

	        {
	        	top: 24,
	        	hidden: true,
	            xtype: "button",
	            id: 'pause',
	            ui: 'red',
	            cls: 'overlay-button',
	            width: 40,
	            floating: 'left',
	            iconCls: 'pause',
	            align: 'center',
	            iconMask: true,
	            left: 85,
	        },
	        {
	        	top: 24,
	            xtype: "button",
	            id: 'play-backw',
	            ui: 'blue',
	            cls: 'overlay-button',
	            width: 40,
	            floating: 'left',
	            iconCls: 'arrow_left',
	            align: 'center',
	            iconMask: true,
	            left: 0,
	        },
	        {
	        	top: 24,
	        	hidden: true,
	            xtype: "button",
	            id: 'pause-backw',
	            ui: 'red',
	            cls: 'overlay-button',
	            width: 40,
	            floating: 'left',
	            iconCls: 'pause',
	            align: 'center',
	            iconMask: true,
	            left: 0,
	        }],
	    }],

	    closebutton: function(){
	    	Ext.dispatch({
	    		controller: app.controller.Main,
	    		action: 'closeoverlay'
	    	});
	    }
	}
});




