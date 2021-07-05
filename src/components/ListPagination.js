import React from "react";
import { useDispatch } from "react-redux";

import agent from "../agent";
import { SET_PAGE } from "../constants/actionTypes";

const ListPagination = ({ articlesCount, pager, currentPage }) => {
  const dispatch = useDispatch();
  const range = [];
  for (let i = 0; i < Math.ceil(articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = (page) => {
    if (pager) {
      dispatch({ type: SET_PAGE, page, payload: pager(page) });
    } else {
      dispatch({ type: SET_PAGE, page, payload: agent.Articles.all(page) });
    }
  };

  if (articlesCount <= 10) {
    return null;
  }

  return (
    <nav>
      <ul className="pagination">
        {range.map((v) => {
          const isCurrent = v === currentPage;
          const onClick = (ev) => {
            ev.preventDefault();
            setPage(v);
          };
          return (
            <li
              className={isCurrent ? "page-item active" : "page-item"}
              onClick={onClick}
              key={v.toString()}
            >
              <a className="page-link" href="">
                {v + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ListPagination;
