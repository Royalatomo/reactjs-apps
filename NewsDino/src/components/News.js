import React, { Component } from 'react'
import NewsItem from "./NewsItem"
import "../css/News.css"
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        topic: 'general',
        mode: 'topHeadline'
    }

    static PropType = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        topic: PropTypes.string,
        apiKey: PropTypes.string,
        mode: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);

        let url = ""
        if (this.props.topic) {
            if (this.props.mode === "topHeadline") {
                url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.topic}&apiKey=${this.props.apiKey}`
            } else if (this.props.mode === "everything") {
                url = `https://newsapi.org/v2/everything?q=${this.props.topic}&apiKey=${this.props.apiKey}`
            }
        } else {
            window.location.replace(window.location.origin)
        }

        this.state = {
            "url": url,
            "totalResults": 0,
            "page": 1,
            "loading": true,
            "articles": []
        }

        document.title = `${this.capitalizeFirstLetter(this.props.topic)} - NewsDino - Get Daily News Free!`
    }

    updateNews = async () => {
        this.props.changeProgress(10)
        let url = `${this.state.url}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ 'loading': true })
        let data = await fetch(url)
        this.props.changeProgress(40)
        let parsedData = await data.json()
        this.props.changeProgress(60)
        this.setState({ "articles": parsedData.articles, loading: false, totalResults: parsedData.totalResults })
        this.props.changeProgress(100)

    }

    async componentDidMount() {
        this.updateNews()

    }

    convertDate = (date) => {
        let a = new Date(date)
        return a.toGMTString()
    }

    fetchMoreData = async () => {
        let url = `${this.state.url}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ "articles": this.state.articles.concat(parsedData.articles), page: this.state.page + 1, totalResults: parsedData.totalResults })
    }

    render() {

        return (

            <div id="newsContainer" style={{ width: "100vw", height: "fit-content", backgroundColor: "#f0f1f3" }}>
                <h1 className="newsHeading">NewsDino - <span style={{ color: "red" }}>{this.capitalizeFirstLetter(this.props.topic)}</span> News Headlines</h1>

                {this.state.loading ? <Spinner /> : ""}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >

                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((x, y) => {
                                return <div key={y} className="col-md-4">
                                    <NewsItem title={x.title ? x.title : ""} description={x.description ? x.description : ""} img={x.urlToImage ? x.urlToImage : "/imgs/logo.png"} url={x.url} author={x.author ? x.author : "Unknown"} date={x.publishedAt ? new Date(x.publishedAt).toGMTString() : ""} source={x.source ? x.source.name : "Unkown Source"} />
                                </div>
                            })
                            }
                        </div>
                    </div>
                </InfiniteScroll>

            </div >
        )
    }
}



export default News
