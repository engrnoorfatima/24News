import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    // const capitalizeFirstLetter = (string) =>{
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }

        const[articles, setArticles] = useState([])
        const[page, setPage] = useState([1])
        const[totalResults, setTotalResults] = useState([1])
        const[loading, setLoading] = useState([true])

    const updateNews = async() =>{
        props.changeProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=053b67a3df2c4989a3490ca9421ceb96&page=${page}&pageSize=${props.pageSize}`;   
        setLoading(true)
        let data = await fetch(url);
        props.changeProgress(30)
        let parsedData = await data.json();
        props.changeProgress(70)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.changeProgress(100)
    }

    useEffect(() => {
        // document.title = `${capitalizeFirstLetter(props.category)} - News24`;
        updateNews();
        // eslint-disable-next-line
      },[])

    const fetchMoreData = async() =>{   
        setPage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=053b67a3df2c4989a3490ca9421ceb96&page=${page}&pageSize=${props.pageSize}`; 
        // setLoading(loading: true)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    const handlePrevClick = async () =>{
        setPage(page - 1)
       updateNews();
    }

    const handleNextClick = async() =>{
        setPage(page + 1)
        updateNews();
        }

    return (
        <div className="container my-3">

            {/* <h1 className='text-center' style={{margin: "30px 0px"}}>24News - Top {capitalizeFirstLetter(props.category)}</h1> */}
            {/* {loading && <Spinner/>} */}

            <h1 className='text-center' style={{margin: "30px 0px"}}>24News - Top {props.category} Headlines</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
                > 
            <div className="container">
            <div className="row">
            {/* {!loading && state.articles.map((element)=>{ */}
            {Array.isArray(articles) && articles.map((element) => {
              if (!element || !element.url) return null; // Skip if element or url is missing
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""}
                 imageUrl= {element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
            })}
            </div>
            </div>
            </InfiniteScroll>
          
            {/* <div className="container d-flex justify-content-between">
               <button type="button" disabled={page<=1}  onClick={handlePrevClick} className="btn btn-dark">&larr; Previous</button>
               <button type="button" disabled={page+1> Math.ceil(totalResults/props.pageSize)} onClick={handleNextClick}  className="btn btn-dark">Next &rarr;</button>
            </div> */}

      </div>
    )
}

News.defaultProps = {
    country: "us",
    pageSize: 9,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
// ({ country= "us",
// pageSize= 9,
// category= "general" })
export default News