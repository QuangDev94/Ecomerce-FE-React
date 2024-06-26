import React from "react";

const CommentFbComponent = (props) => {
  const { dataHref, width } = props;
  return (
    <div style={{ marginTop: "8px" }}>
      <div
        className="fb-comments"
        data-href={dataHref}
        data-width={width}
        data-numposts="5"></div>
    </div>
  );
};

export default CommentFbComponent;
