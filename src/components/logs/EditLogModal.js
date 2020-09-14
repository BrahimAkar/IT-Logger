import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { updateLog, clearCurrent } from "../../actions/logActions";
import { connect } from "react-redux";

const EditLogModal = ({ current, updateLog, clearCurrent }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({
        html: "⚠️ Please enter a message & tech",
        classes: "red text-white rounded",
        completeCallback: () => {
          console.log("DISMISED");
        },
      });
    } else {
      const { id } = current;
      const newLog = { id, message, tech, attention };
      updateLog(newLog);
      M.toast({
        html: "✅ Logs saved successfully",
        classes: "green text-white rounded",
        completeCallback: () => {
          console.log("DISMISED");
        },
      });
      console.log(message, attention, tech);

      //* CLEAR FIELDS
      setMessage("");
      setTech("");
      setAttention(false);

      //* CLEAR CURRENT
      clearCurrent();
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit System log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor="message" className="active">
              Log message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={(e) => setTech(e.target.value)}
            >
              <option value="" disabled>
                Select technitian
              </option>
              <option value="John Doe">John Doe</option>
              <option value="Sam smith">Sam smith</option>
              <option value="Sara wilson">Sara wilson</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Needs attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue  btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "70%",
  height: "70%",
};

const mapStateToProps = (state) => ({
  //* PROP: state: name of state in our root reducer ( index.js)
  current: state.log.current,
});

export default connect(mapStateToProps, { updateLog, clearCurrent })(
  EditLogModal
);
