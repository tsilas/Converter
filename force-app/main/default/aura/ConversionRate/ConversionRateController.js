({
    //Radio Buttons Functionality
	onGroup: function(component, event) {
		 var selected = event.getParam("value");
         var base2 = selected;
		 var resultCmp = component.find("radioGroupResult");
		 resultCmp.set("v.value", selected);
	 },
    // Getting the user choice of Currency and setting it as base parameter for the request.
    calloutCtrl : function(component, event, helper) {
        var base = component.find("radioGroupResult").get("v.value");
        helper.getResponse(component, base);
    }
})