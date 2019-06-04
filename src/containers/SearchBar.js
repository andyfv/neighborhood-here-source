import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles/SearchBar.css';
import { updateQuery, fetchPlaces, clearQuery } from '../actions/searchActions';
import { _debounce } from '../utils/debounce';

const SearchBar = ({query, clearQuery, searchPlaces, updateQuery}) => {
    let debounce = _debounce((query) => {this.handleQueryChange(query)}, 300);
    return ( 
        <form className = "search-bar" 
            role = "search" 
            onSubmit={(e) => e.preventDefault()}>
            <svg id = "search-icon" />
            <div className = "search-input-wrapper" >
                <input 
                    className = "search-input"
                    type = "text"
                    aria-label = "search field"
                    placeholder = "Search"
                    value = {query}
                    // onChange = {(e) => debounce(e.target.value)}
                    onChange = {(e) => {
                        updateQuery(e.target.value)}
                        }
                    onKeyPress = { e =>  {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            searchPlaces(e.target.value);
                        }
                    }}
                />
                <button id = "delete-button"
                    aria-label = "clear search field"
                    onClick = {clearQuery}>
                </button>
            </div>
        </form>
    )
}


SearchBar.propTypes = {
    query: PropTypes.string.isRequired,
    searchPlaces: PropTypes.func.isRequired,
    clearQuery: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired
} 

const mapStateToProps = (state) => {
    return {
        query: state.search.query
    }
}

const mapDispatchToProps = {
    searchPlaces: fetchPlaces,
    clearQuery: clearQuery,
    updateQuery: updateQuery
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);