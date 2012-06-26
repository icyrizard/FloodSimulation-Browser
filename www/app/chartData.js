Ext.define('app.chartData', {
	singleton: true,

	init: function(){
		self.csvFiles = new Array();
	},

	setCsvFile: function(file){
		self.csvFiles.push(file)
	}

	
});