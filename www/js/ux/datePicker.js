Ext.define('Nutrilicious.ux.DatePicker', {
    extend: 'Ext.field.DatePicker',
    alias: 'widget.ndatepicker',
	
	getFormattedDate: function () {
		var dp = this.getValue();
		return dp.getFullYear() + '-' + (dp.getMonth() <= 9 ? '0' : '') + (dp.getMonth() + 1) + '-' + dp.getDate();
	}
});