import React from "react";
import Moment from "react-moment";
import { deleteLog, setCurrent } from "../../actions/logActions";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";

const LogItem = ({ log, deleteLog, setCurrent }) => {
  const onDelete = () => {
    deleteLog(log.id);
    M.toast({
      html: "✅ Deleted successfully",
      classes: "green text-white rounded",
    });
  };
  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-log-modal"
          onClick={() => setCurrent(log)}
          className={`modal-trigger ${
            log.attention ? "red-text" : "blue-text"
          } `}
        >
          {log.message}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">ID #{log.id}</span> last updated by{" "}
          <span className="black-text">{log.tech}</span> on{" "}
          <Moment format="MMMM Do YYYY, h:mm:ss a">{log.date}</Moment>
        </span>
        <a className="secondary-content" href="##" onClick={onDelete}>
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

export default connect(null, { deleteLog, setCurrent })(LogItem);
