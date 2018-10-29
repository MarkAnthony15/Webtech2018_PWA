        idb.init({
            database: "RiskReduction",
            version: 1,
            tables: [
                {
                    name: "EvacuationCenter",
                    keyPath: "address",
                    autoIncrement: false,
                    index: [{ name: "lng", unique: true}]
                },
            ]
        });

function saveData() {
    var name = document.getElementById('name').value
    var address = document.getElementById('address').value;
    var type = document.getElementById('type').value;
    var latlng = marker.getPosition();
      idb.insert("EvacuationCenter", [ 
      {title: name,
      address: address,
      type: type ,
      lat: latlng.lat(), 
      lng: latlng.lng() }], 
    
    function (isInserted, responseText) {
      console.log(isInserted);
      console.log(responseText);
    });
}
        function ManualAddingOfEvacuation() {

            idb.insert("EvacuationCenter", [ 
      {title: "Iglesia Ni Cristo",address:"Poblacion, Kibungan, Benguet",type:"Church" ,lat: "16.693295", lng: "120.652321" }, 
      {title: "Buguias Town Hall",address:"Halsema Highway, Buguias, Benguet",type:"Municipal Hall" ,lat: "16.719200", lng: "120.826897" }, 
      {title: "Mankayan Municipal Hall Sub-Office",address:"Halsema Highway, Buguias, Benguet",type:"Municipal Hall" ,lat: "16.719200", lng: "120.793360" },
      {title: "Bangao Barangay Hall",address:"Buguias, Benguet",type:"Barangay Hall" ,lat: "16.832680", lng: "120.848380" },
      {title: "Itogon Municap Hall",address:"Itogon, Benguet",type:"Municipal Hall" ,lat: "16.365770", lng: "120.633170" },
      {title: "Daclino Elementary School",address:"Ampucao, Itogon, Benguet",type:"School" ,lat: "16.249630", lng: "120.674728" },
      {title: "Juan Dela Cruz",address:"Ambuclao, Bokod, Benguet",type:"Home" ,lat: "16.476625", lng: "120.801969" },
      {title: "Ricardo Dalisay",address:"Bineng, La Trinidad, Benguet",type:"Home" ,lat: "16.480576", lng: "120.564469" },
      {title: "Delfin Daclison",address:"Ciudad Grande Phase 1, Bakakeng Road, Baguio City",type:"Home" ,lat: "16.399958", lng: "120.591247" },
      {title: "Bakakeng Elementary School",address:"Amparo Heights St Bakakeng Road, Baguio City",type:"School" ,lat: "16.390460", lng: "120.594610" },
      {title: "Crystal Cave Elementary School",address:"Crystal Cave, Baguio City",type:"School" ,lat: "16.397570", lng: "120.581000" },
      {title: "Pudong Elementary School",address:"Poblacion, Kibungan, Benguet",type:"School" ,lat: "16.406429", lng: "120.557820" },
      {title: "",address:"",type:"" ,lat: "", lng: "" }], 
      function (isInserted, responseText) {
       console.log(isInserted);
       console.log(responseText);
            });
        }
