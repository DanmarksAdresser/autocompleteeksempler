import './styles.css';
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

initAutocomplete('#input', 'https://dawa.aws.dk/jordstykker?autocomplete&q=', selected('Jordstykke'));