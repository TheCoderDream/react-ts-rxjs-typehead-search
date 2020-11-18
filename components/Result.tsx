import React from "react";

interface Props {
  noResult: boolean;
  count: number;
  total: number;
}

const Result: React.FC<Props> = ({ noResult, total, count }) => {
  if (noResult) {
    return <p>Not found any result</p>;
  } else if (count) {
    return (
      <p>
        Displaying <strong>{count}</strong> of <strong>{total}</strong> result{" "}
        {"    "}
        {total > count && <a href={"#"}>SEE ALL RESULT</a>}
      </p>
    );
  }

  return null;
};

export default Result;
