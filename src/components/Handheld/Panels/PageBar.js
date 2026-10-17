import React from 'react';
import PropTypes from 'prop-types';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

// bottom bar of a panel: an optional control hint and the page count,
// with left/right carets when there are pages to flip between
function PageBar({ page, pageCount, hint }) {
  const hasPages = pageCount > 1;
  return (
    <div className="handheld-screen__interface__content__page flex items-center mt-auto">
      {hint}
      <p className="page-bar__count flex items-center ml-auto">
        {hasPages && <AiFillCaretLeft aria-hidden="true" />}
        {page}/{pageCount}
        {hasPages && <AiFillCaretRight aria-hidden="true" />}
      </p>
    </div>
  );
}

PageBar.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  hint: PropTypes.node,
};

PageBar.defaultProps = {
  hint: null,
};

export default PageBar;
