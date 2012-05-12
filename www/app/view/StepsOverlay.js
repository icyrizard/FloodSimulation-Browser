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

    	//draggable: true,
    	autoDestroy: true,
    	hidden: true,
	    width: 120,
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
	        left: 20,
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




