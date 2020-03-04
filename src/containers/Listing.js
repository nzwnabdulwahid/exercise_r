import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchAndList from '../components/SearchAndList'

class Listing extends Component {

	constructor(props){
		super(props);
		this.state = {
			currentPage: 1,
			data: [],
			loading: false,
			per_page: 10,
			totalCount: 0,
			searchingString: "",
			errorMessage: ''
		}
	}

	fetchData = (searchingString, currentPage = 1 ) => {
		this.setState({loading: true, searchingString, errorMessage: '', currentPage,})

		const { searchText, per_page } = this.state;
		axios.get(`https://api.github.com/search/repositories?per_page=${per_page}&page=${currentPage}&q=${searchingString}`)
		.then((response) => {
			const data = response.data.items || [];
			this.setState({
				loading:false,
				totalCount: response.data.total_count || 0,
				data
			})
			console.log(response);
		})
		.catch((error) => {
			this.setState({
				loading:false,
				totalCount: 0,
				errorMessage: error.response.data.message
			})
		})
	}

	render() {
		const { loading, data, totalCount, currentPage, searchingString, errorMessage } = this.state;
		return (
			<div className="listing-container">
				<div className="title-container">
					<div className="title">Github Search</div>
				</div>

				{
					<SearchAndList 
						initialSearch={(value) => this.fetchData(value)}
						searchWithPage={(pageNumber) => this.fetchData(searchingString, pageNumber)}
						isFetching={loading}
						data={data}
						totalCount={totalCount}
						currentPage={currentPage}
						searchingString={searchingString}
						errorMessage={errorMessage}
					/>
				}
			</div>
		)
	}	
}

export default Listing;
