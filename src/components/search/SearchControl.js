import React from 'react';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery';
import 'jquery-ui';

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

export default class SearchControl extends React.Component {

  constructor(){
    super();
    this.state = {
      value: '',
      suggestions: [],
      isLoading: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.loadSuggestions = this.loadSuggestions.bind(this);
  }

  onSelect(info){
    this.props.onSelect(info);
  }

  loadSuggestions(value) {
    this.setState({
      isLoading: true
    });
    let self = this;
    $.get('http://localhost:8080/api/address_autocomplete/' + value, function(res){
      let suggestions = [];
      for(var i=0; i< res.length; i++) {
        suggestions.push({
          name: res[i].EZI_Address,
          coord: [res[i].lat, res[i].long]
        });
      }
      if (value === self.state.value) {
        self.setState({
          isLoading: false,
          suggestions
        });
      } else { // Ignore suggestions if input value changed
        self.setState({
          isLoading: false
        });
      }

    });

  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.loadSuggestions(value);
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }){
    this.onSelect(suggestion);
  }

  render(){
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type \'c\'',
      value,
      onChange: this.onChange
    };
    return(
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps}
                   onSuggestionSelected={this.onSuggestionSelected}
      />
    )
  }
}
