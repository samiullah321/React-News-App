
import React from 'react'

export default function NewsItem(props) {
  let { title, description, imageUrl, newsUrl, author, date, source } =props;
  return (
    <div className="card my-3">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          right: "0",
        }}
      >
        <span className="badge rounded-pill bg-danger"> {source} </span>
      </div>
      <img
        src={
          !imageUrl
            ? "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
            : imageUrl
        }
        height="250em"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-muted">
            By {!author ? "Unknown" : author} on{" "}
            {new Date(date).toGMTString()}
          </small>
        </p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-dark"
        >
          Read More
        </a>
      </div>
    </div>
  )
}