import React from "react";

const modal = (props) => {
  return (
    <div className="ui dimmer modals visible active" style={{position: "fixed", overflow: "hidden"}}>
      <div className="ui standard modal visible active">
        <div className="header">{props.title}</div>
        <div className="content">
          <a href={props.content} target="_blank" rel="noopener noreferrer">
            {props.content}
          </a>
        </div>
        <div className="actions">{props.action}</div>
      </div>
    </div>
  );
};

export default modal;
