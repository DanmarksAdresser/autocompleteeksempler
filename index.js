import './styles.css';
import * as dawaAutocomplete2 from 'dawa-autocomplete2';
import autocomplete from 'autocomplete.js';
import 'babel-polyfill';
import 'whatwg-fetch';

function initAutocomplete(input, url, selected) {

  function search(url) {
    return async function search(query, callback) {
      let response= await fetch(url+query);
      let resultat= await response.json();
      callback(resultat);
    }
  }

  autocomplete(input, {hint: true, openOnFocus: true}, [
    {
      source: search(url),
      displayKey: 'betegnelse',
      templates: {
        suggestion: function(suggestion) {
          return suggestion.betegnelse;
        }
     }
    }
  ]).on('autocomplete:selected', function(even, suggestion, dataset) {
    selected(suggestion);
  });
}

function selected(ressource) {
  return (objekt) => {document.getElementById('label').textContent = ressource + ': Du valgte ' + objekt.betegnelse;}
}

dawaAutocomplete2.dawaAutocomplete(document.getElementById('adresse'), {
    select: selected('Adresse')
  }
);

dawaAutocomplete2.dawaAutocomplete(document.getElementById('adgangsadresse'), {
    select: selected('Adgangsadresse'),        
    adgangsadresserOnly: true
  }
);

initAutocomplete('#vejstykke', 'https://dawa.aws.dk/vejstykker?autocomplete&q=', selected('Vejstykke'));
initAutocomplete('#navngivenvej', 'https://dawa.aws.dk/navngivneveje?autocomplete&q=', selected('Navngiven vej'));
initAutocomplete('#supplerendebynavn', 'https://dawa.aws.dk/supplerendebynavne2?autocomplete&q=', selected('Supplerende bynavne'));
initAutocomplete('#postnummer', 'https://dawa.aws.dk/postnumre?autocomplete&q=', selected('Postnummer'));
initAutocomplete('#by', 'https://dawa.aws.dk/stednavne2?autocomplete&undertype=by&q=', selected('By'));
initAutocomplete('#stednavn', 'https://dawa.aws.dk/stednavne2?autocomplete&q=', selected('Stednavn'));
initAutocomplete('#jordstykke', 'https://dawa.aws.dk/jordstykker?autocomplete&q=', selected('Jordstykke'));
initAutocomplete('#ejerlav', 'https://dawa.aws.dk/ejerlav?autocomplete&q=', selected('Ejerlav'));
initAutocomplete('#sogn', 'https://dawa.aws.dk/sogne?autocomplete&q=', selected('Sogne'));
initAutocomplete('#kommune', 'https://dawa.aws.dk/kommuner?autocomplete&q=', selected('Kommune'));
initAutocomplete('#region', 'https://dawa.aws.dk/regioner?autocomplete&q=', selected('Region'));
initAutocomplete('#landsdel', 'https://dawa.aws.dk/landsdele?autocomplete&q=', selected('Landsdel'));
initAutocomplete('#politikreds', 'https://dawa.aws.dk/politikredse?autocomplete&q=', selected('Politikreds'));
initAutocomplete('#retskreds', 'https://dawa.aws.dk/retskredse?autocomplete&q=', selected('Retskreds'));
initAutocomplete('#afstemningsområde', 'https://dawa.aws.dk/afstemningsomraader?autocomplete&q=', selected('Afstemningsområde'));
initAutocomplete('#opstillingskreds', 'https://dawa.aws.dk/opstillingskredse?autocomplete&q=', selected('Opstillingskreds'));
initAutocomplete('#storkreds', 'https://dawa.aws.dk/storkredse?autocomplete&q=', selected('Storkreds'));
initAutocomplete('#valglandsdel', 'https://dawa.aws.dk/valglandsdele?autocomplete&q=', selected('Valglandsdel'));