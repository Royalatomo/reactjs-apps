import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {

        let { title, description, img, url, author, date, source } = this.props;

        return (
            <div>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={img} className="card-img-top" alt="..." />
                    <div className="card-body">

                        <span style={{"fontSize": "15px", "left": "90% !important"}} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {source}
                        </span>

                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">{date}</small></p>
                        <a target="_blank" rel="noreferrer" href={url} className="btn btn-danger">Read More</a>
                    </div>
                    <p className="author"><small>Author: </small> <strong>{author}</strong></p>
                </div>
            </div>
        )
    }
}

export default NewsItem
