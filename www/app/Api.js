//    GET /drfsm/<test_id>/results/izid/<izid>.csv

// for example

//    GET /drfsm/5/results/izid/1234.csv


Ext.define('app.Api', {
	mixins: ['Ext.mixin.Observable'],
	singleton: true,

	getIzid: function(lat, lng, area_id) {
		var me = this;
		var requestName = Ext.Ajax.request({
            method: 'GET',
            url: 'http://sangkil.science.uva.nl:8003/area/1/izid.json?latlng=' + lat + ',' + lng,
	        
	        success: function(response, opts){
	            var result = Ext.decode(response.responseText);
				me.fireEvent('gotIzid', result['izid']);
	        },

	        failure: function(){
	             console.log('failed to get izid');
        	}
        });
	},

	getCsvFile: function(test_id, izid) {
		console.log(izid);
		console.log()
		console.log('/drfsm/'+test_id+'/results/izid/'+izid+'.csv');
		var me = this;
     	var requestName = Ext.Ajax.request({
            method: 'GET',
            url: 'http://sangkil.science.uva.nl:8003/drfsm/'+test_id+'/results/izid/'+izid+'.csv',
	        success: function(response, opts){
	        	console.log(opts)
	            me.fireEvent('gotCsv', response.responseText)
	        },

	        failure: function(){
	             console.log('failed to get csv file');
        	}
        });
	}
});