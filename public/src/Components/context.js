import React from "react";
import {useState} from "react";

export const CurrentUser  = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
      name: '',
      email: '',
      balance: 0,
      password: '',
      role: 'none'
  });

  return (
      <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
          {children}
      </CurrentUser.Provider>
  );
};

export function Card(props) {
    function classes() {
      const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
      return 'card mb-3 text-center' + bg + txt;
}

    return (
        <div id="card" className={classes()}>
            <div className="card-header">{props.header}</div>
            <div className="card-body text-start">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
                {props.status && (<div id="createStatus">{props.status}</div>)}
                <div className="card-body text-center">
                {props.centered}
                </div>
            </div>
        </div>
    );
}

export function Table(props) {
    return (
        <div className="container align-items-center justify-content-center">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{props.col1}</th>
              <th scope="col">{props.col2}</th>
              <th scope="col">{props.col3}</th>
              <th scope="col">{props.col4}</th>
              <th scope="col">{props.col5}</th>
            </tr>
          </thead>
          <tbody>
            {props.list}
          </tbody>
        </table>
        </div>
    );
}


