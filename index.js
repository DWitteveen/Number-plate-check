function getRdwData(carCriteria){
    let baseUrl = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json?';
    
    let dataOutputFields = [
        'kenteken',
        'voertuigsoort',
        'merk',
        'handelsbenaming',
        'eerste_kleur',
        'tweede_kleur',
        'variant',
        'uitvoering',
        'taxi_indicator',
        'datum_eerste_toelating'
    ];
    let dataOutputFieldsUrl = '&$select=';

    for (let [index,value] of dataOutputFields.entries()) {
        if(index == 0){
            dataOutputFieldsUrl = dataOutputFieldsUrl + value;
        }else{
            dataOutputFieldsUrl = dataOutputFieldsUrl + '%2C' + value;
        }
    }

    let rdwRequestUrl = baseUrl + carCriteria + dataOutputFieldsUrl;
    // console.log(rdwRequestUrl);

    var oReq = new XMLHttpRequest();
    oReq.open("GET", rdwRequestUrl);
    oReq.send();
    oReq.addEventListener("load", reqListener);

    function reqListener () {
        console.log(this.responseText);
        return this;
    }
}

function processCarCriteria(kenteken,voertuigsoort,merk,handelsbenaming){
    kentekenChars = kenteken.split('');
    let kentekenSearchVal = '';
    for (let value of kentekenChars){
        if(value == '#'){
            kentekenSearchVal = kentekenSearchVal + '_';
        }else if(value == '?'){
            kentekenSearchVal = kentekenSearchVal + '%25';
        }else{
            kentekenSearchVal = kentekenSearchVal + value;
        }
    }
    // console.log(kentekenSearchVal);
        
    let carCriteriaString = '';
    if(kentekenSearchVal != null){
        carCriteriaString = carCriteriaString + '$where=kenteken%20like%20%27' + kentekenSearchVal + '%27';        
    }
    if(voertuigsoort != null){
        carCriteriaString = carCriteriaString + '&voertuigsoort=' + voertuigsoort;        
    }
    if(merk != null){
        carCriteriaString = carCriteriaString + '&merk=' + merk;        
    }
    if(handelsbenaming != null){
        carCriteriaString = carCriteriaString + '&handelsbenaming=' + handelsbenaming;        
    }    
    
    return carCriteriaString;
}
function updateWebContent(rdwData){
    // console.log(rdwData);
}

// event listners
var nbdata = document.getElementById('nummerbord');
var nummerbord_input = document.getElementById('nummerbord_input');

nummerbord_input.addEventListener("submit", function(){ 
    console.log(nbdata.value);
    let carCriteria = processCarCriteria(nbdata.value); 
    let rdwData = getRdwData(carCriteria);
    updateWebContent(rdwData);
}, false);
