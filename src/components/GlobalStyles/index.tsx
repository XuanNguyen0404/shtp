import React from "react";
import "./GlobalStyles.scss";

interface Props { }

function GlobalStyles(props: React.PropsWithChildren<Props>) {
  return <div>{props.children}</div>;
}
export default GlobalStyles;
