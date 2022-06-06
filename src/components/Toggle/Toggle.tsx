import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
function Toggle(
  props: React.PropsWithChildren<{
    title?: string;
    onStr: string;
    offStr: string;
    isToggle: boolean;
    isEditable: boolean;
    setStatus: Function;
  }>
) {
  const [toggleState, setToggleState] = useState<boolean>(false);
  const handleSwitchChange = () => {
    setToggleState(!toggleState);
    if (!toggleState) {
      props.setStatus(props.onStr);
    } else {
      props.setStatus(props.offStr);
    }
  };
  const handleToggle = (isToggle: boolean) => {
    setToggleState(isToggle);
  };
  useEffect(() => {
    handleToggle(props.isToggle);
  }, [props.isToggle]);

  return (
    <>
      {props && props.isEditable ? (
        <>
          {props && props.title ? (
            <Row>
              <Col sm="4">
                <span>{props.title}</span>
              </Col>
              <Col sm="8">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitches"
                    checked={toggleState}
                    onChange={() => handleSwitchChange()}
                    readOnly
                    style={{ cursor: "pointer" }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitches"
                    style={{ cursor: "pointer" }}>
                    {toggleState ? (
                      <span className="text-success">{props.onStr}</span>
                    ) : (
                      <span className="text-danger">{props.offStr}</span>
                    )}
                  </label>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col sm="12">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitches"
                    checked={toggleState}
                    onChange={() => handleSwitchChange()}
                    readOnly
                    style={{ cursor: "pointer" }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitches"
                    style={{ cursor: "pointer" }}>
                    {toggleState ? (
                      <span className="text-success">{props.onStr}</span>
                    ) : (
                      <span className="text-danger">{props.offStr}</span>
                    )}
                  </label>
                </div>
              </Col>
            </Row>
          )}
        </>
      ) : (
        <Row>
          <Col sm="12">
            {toggleState ? (
              <>
                <FontAwesomeIcon icon={faDotCircle} color="#31cf8b" />
                <span className="text-success px-1">{props.onStr}</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faDotCircle} color="#f55575" />
                <span className="text-danger px-1">{props.offStr}</span>
              </>
            )}
          </Col>
        </Row>
      )}
    </>
  );
}

export default Toggle;
