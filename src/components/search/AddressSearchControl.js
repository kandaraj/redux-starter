import React from 'react';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery';
import 'jquery-ui';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';


export default class AddressSearchControl extends React.Component {

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

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return <span>{suggestion.name}</span>;
  }

  onSelect(info){
    this.props.onSelect(info);
  }

  loadSuggestions(value) {
    this.setState({
      isLoading: true
    });


    setTimeout(() => {
      let self = this;
      $.get('http://localhost:8080/api/address_autocomplete/' + value, function(res){
        let suggestions = [];
        for(var i=0; i< res.length; i++) {
          suggestions.push({ name: res[i].EZI_Address, coord: [res[i].lat, res[i].long] });
        }
        if (value === self.state.value) {
          self.setState({isLoading: false, suggestions });
        } else { // Ignore suggestions if input value changed
          self.setState({isLoading: false});
        }
      });
    }, 1000);

  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.loadSuggestions(value);
  }

  onSuggestionSelected(event, { suggestion }){
    this.onSelect(suggestion);
  }

  render(){
    const { value, suggestions, isLoading } = this.state;
    const inputProps = { placeholder: this.props.placeHolder, value, onChange: this.onChange };
    return(
      <div className="suggest-container">
        <Autosuggest suggestions={suggestions}
                     onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                     getSuggestionValue={this.getSuggestionValue}
                     renderSuggestion={this.renderSuggestion}
                     inputProps={inputProps}
                     onSuggestionSelected={this.onSuggestionSelected}
        />
          <div className="status">{isLoading? 'Loading...': ''}</div>
      </div>
    )
  }
}
