import React from "react";
import {Link} from  "react-router-dom";

const NewsItem = (props) =>{
    let {title, description, imageUrl, NewsUrl, author, date, source} = props
    return (
      <div >
        <div className="card">
            <div style={{display: 'flex',justifyContent: "flex-end", position: "absolute", right: "0"}}>
                <span className=" badge rounded-pill bg-danger" >
                 {source}
                </span>
            </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}  </h5>
            <p className="card-text">
             {description}...
            </p>
            <Link to={NewsUrl} target="_blank" className="btn btn-sm btn-primary">
              Read More
            </Link>
            <p className="card-text"><small className="text-body-secondary">by {author} on {new Date(date).toGMTString() }</small></p>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
