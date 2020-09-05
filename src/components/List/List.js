import React, { useState, useRef, useCallback } from "react";
import useQuestionSearch from "../useQuestionSearch";
import Moment from "react-moment";
import Spinner from "../Spinner/Spinner";
import classes from "./List.module.css";
import Modal from "../Modal/Modal";

const List = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    title: "",
    content: "",
  });

  const { loading, error, question, hasMore } = useQuestionSearch(pageNumber);

  const observer = useRef();
  const lastQuestionElementRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  const onRowClick = (title, link) => {
    console.log(title);
    console.log(link);
    setModalDetails({ title: title, content: link });
    setModalShow(true);
  };

  const tableBody = question.map((ques, index) => {
    if (question.length === index + 1) {
      return (
        <tr
          ref={lastQuestionElementRef}
          key={index}
          onClick={() => onRowClick(ques.title, ques.link)}
        >
          <td>{ques.owner.display_name}</td>
          <td>{ques.title}</td>
          <td>
            <Moment format="DD/MM/YYYY">{ques.creation_date * 1000}</Moment>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={index} onClick={() => onRowClick(ques.title, ques.link)}>
          <td>{ques.owner.display_name}</td>
          <td>{ques.title}</td>
          <td>
            <Moment format="DD/MM/YYYY">{ques.creation_date * 1000}</Moment>
          </td>
        </tr>
      );
    }
  });

  const renderActions = (
    <button onClick={() => setModalShow(false)} className="ui button negative">
      Cancel
    </button>
  );
  return (
    <div className={classes.List}>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Creation Date (DD/MM/YYYY)</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
      <div>{loading && <Spinner />}</div>
      <div>{error && "Error"}</div>
      {modalShow && (
        <Modal
          title={modalDetails.title}
          content={modalDetails.content}
          action={renderActions}
        />
      )}
    </div>
  );
};

export default List;
