Ext.define('app.view.StepsOverlay', {
	extend: 'Ext.Container',
	xtype: 'StepsOverlay',
	requires : ['Ext.Anim'],
	
    
    config: {
    	style: "background: none",
    	id: 'overlay',
    	showAnimation: {
    		type: 'slideIn',
    		direction:'left',
    	},

    	hideAnimation:{
    		type: 'slideOut',
    		direction:'right',
    	},

    	//autoDestroy: true,
    	hidden: true,
	    width: 200,
	    height: 100,
	    scroll: false,
	    items: [
	    {
	        xtype: 'button',
	        id: 'closebutton',
	        iconCls: 'delete',
	        iconMask: true,
	        height: 10,   
	        ui: 'red',               
	        top: 0,
	        right: 0,
	        border: 'solid',
	        handler: this.closebutton,
	        scope: this,
	    },
	    {
	        top: 10,
	        left: 30,
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




