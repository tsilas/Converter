({
    getResponse: function(component, base) {
        // create a server side action.       
        var action = component.get("c.getCalloutResponseContents");
        
       	//set the Currencies and access key as variables
        var list ="USD,GBP,CHF,CAD,JPY,";
        var key = "ca39da97f144ca230d289441409d95d7"
        
        // set the url parameter for getCalloutResponseContents method (to use as endPoint) 
        action.setParams({
            "url": 'http://data.fixer.io/api/latest?access_key='+key+'&base='+base+'&symbols='+list
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                //Check if API Call was a success
                if (response.getReturnValue()["success"]){
                    // set the response object.      
                component.set("v.response", response.getReturnValue());
                // get all rates from response
                var getAllRates = component.get("v.response")['rates'];
                //create list array
                var CurrencyList = [];
                // loop through rates object and put the rates with name in the CurrencyList
                for (var key in getAllRates) {
                    CurrencyList.push(key + ' = ' + getAllRates[key]); // i.e : INR = 67.919  
                }
                // put the CurrencyList to ListOfCurrency attribute on component.           
                component.set("v.ListOfCurrency", CurrencyList);
                //console.log(response.getReturnValue());
                }
                //Error Handling
                else{
                    if (response.getReturnValue()["error"]["code"] == 105){
                        var CurrencyList = ["Error code: "+ response.getReturnValue()["error"]["code"] + " . The current subscription plan does not support this Currency as Base Currency"];
                    	component.set("v.ListOfCurrency", CurrencyList);
                    }
                    else {
                        var CurrencyList = ["Error code: "+ response.getReturnValue()["error"]["code"] + " . Please contact your Administrator"];
                    	component.set("v.ListOfCurrency", CurrencyList);
                    }
                }
            } 
        });
        $A.enqueueAction(action);
    },
})