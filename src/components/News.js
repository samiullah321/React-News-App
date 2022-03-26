import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

    const capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    
   

    const updateNews = async ()=> {
        props.setProgress(10)
        setLoading(true)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pageSize=${props.pageSize}`;
        let data=await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        console.log(parsedData);
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
        
    }

  

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();   
    }, [])
    

    const handlePrevClick = async ()=>{
        // setLoading(true)
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page-1}&pageSize=${props.pageSize}`;
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);  
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })

        setPage(page-1)
        updateNews();
    }

    const handleNextClick = async ()=>{
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){
        //     setLoading(true)
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page+1}&pageSize=${props.pageSize}`;
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     console.log(parsedData);  
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
        // }  

        setPage(page+1)
        updateNews()
    }

    const fetchMoreData = async () => {       
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };


    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
            > 
            <div className="container">
                <div className="row">
                {!loading && articles.map((element)=>{
                    return  <div className="col-md-4" key = {element.url} >
                                <NewsItem key = {element.url+"NewsItem"} title={element.title?element.title.slice(0,45)+"...":""} description={element.description?element.description.slice(0,88)+"...":""} imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                })}
                </div>
            </div>
            </InfiniteScroll> 
            {/* <div className="container d-flex justify-content-between">
                <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                <button disabled= {(page + 1 > Math.ceil(totalResults/props.pageSize))} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div> */}
            
        </>
    )
}


News.defaultProps = {
    country: 'us',
    pageSize: 15, 
    category: 'general',
}   

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
} 
