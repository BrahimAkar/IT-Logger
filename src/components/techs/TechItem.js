import React from "react";
import { connect } from "react-redux";
import { deleteTechs } from "../../actions/techActions";

const TechItem = ({ tech, deleteTechs }) => {
  return (
    <li className="collection-item">
      <div>
        {tech.firstName} {tech.lastName}
        <a
          href="#!"
          className="secondary-content"
          onClick={() => deleteTechs(tech.id)}
        >
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

export default connect(null, { deleteTechs })(TechItem);
