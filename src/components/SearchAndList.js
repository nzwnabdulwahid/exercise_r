import React from 'react';
import { Input, Pagination, Spin } from 'antd';
import circle from '../image/circle.svg'
import starFull from '../image/star-full.svg'


const {Search} = Input

const SearchAndList = (props) => {
	const { initialSearch, isFetching, data, totalCount, currentPage, searchingString, errorMessage, searchWithPage } = props;
	const handleClickPagination = (page, pageSize) => {
		console.log("clicked pagination",page);
		searchWithPage(page);
		window.scrollTo(0, 0);
	}
	console.log("currentPage",currentPage);
	return (
		<div className="search-list-container">
			<div className="input-container">
				<Search
			      placeholder="input search text"
			      onSearch={initialSearch}
			      style={{width:'100%'}}
			      loading={isFetching}
			    />
			</div>

			<div className="list-container">
				<div className="result">{totalCount} repository results</div>
				{ 	isFetching && <div className="spinner"><Spin size="large"/></div> }
				
				{ 	!isFetching &&
					!errorMessage &&
					data.map(detailsData => <ListCard key={detailsData.id} detailsData={detailsData}  />)	}

				{ 	errorMessage && <div className="spinner">{errorMessage}</div>}
				{/*<ListCard detailsData={{full_name:'test', updated_at:'test', description: 'test', language:'java', stargazers_count:'23131'}}  />*/}
			</div>

			{
				data && 
				data.length > 0 &&
				Math.ceil(totalCount/10) > 1 &&
				!isFetching &&
				<div className="pagination-container">
					<Pagination current={currentPage} pageSize={10} total={totalCount} onChange={handleClickPagination}/>
				</div>
			}
		</div>
	)
}

const ListCard = ({detailsData}) => {
	return (
		<div className="card-container">
			<div className="left-side">
				<div className="title">{detailsData.full_name}</div>
				<div className="explaination">{detailsData.description}</div>
				<div className="updated-on">Updated on {detailsData.updated_at}</div>
			</div>
			<div className="right-side-container">
				<div className="right-side" style={{visibility: detailsData.language ? 'unset' : 'hidden'}}>
					<div className="content">
						<img src={circle} style={{width:'10%', marginRight:5}}/>
						<div className="language">{detailsData.language}</div>
					</div>
				</div>
				<div className="right-side" style={{visibility: detailsData.stargazers_count ? 'unset' : 'hidden'}}>
					<div className="content">
						<img src={starFull} style={{width:'13%', marginRight:5}}/>
						<div className="star">{detailsData.stargazers_count}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchAndList;