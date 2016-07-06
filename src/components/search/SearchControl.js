import React from 'react';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery';
import 'jquery-ui';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';

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
    const inputPropsAddress = {
      placeholder: 'Type address',
      value,
      onChange: this.onChange
    };
    const inputPropsSlid = {
      placeholder: 'Type SLID',
      value,
      onChange: this.onChange
    };
    return(

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="clearfix">
          <Col sm={4}>
            <Nav bsStyle="pills" stacked>
              <NavItem eventKey="first">
                Search by address
              </NavItem>
              <NavItem eventKey="second">
                Search by SLID
              </NavItem>
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content animation>
              <Tab.Pane eventKey="first">
                <Autosuggest suggestions={suggestions}
                             onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                             getSuggestionValue={getSuggestionValue}
                             renderSuggestion={renderSuggestion}
                             inputProps={inputPropsAddress}
                             onSuggestionSelected={this.onSuggestionSelected}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Autosuggest suggestions={suggestions}
                             onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                             getSuggestionValue={getSuggestionValue}
                             renderSuggestion={renderSuggestion}
                             inputProps={inputPropsSlid}
                             onSuggestionSelected={this.onSuggestionSelected}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

    )
  }
}
