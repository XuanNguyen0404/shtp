import React, { useState } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function Login() {
    let navigate = useNavigate();
  const [state, setState] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, " : ", e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitLogin = (e : React.SyntheticEvent) => {
    e.preventDefault();
    if (state.username === '1') {
        navigate("/enterprise/report");
    } else {
        navigate("/dashboard")
    }
  }
  return (
    <div className={cx("wrapper")}>
        
      <Card className={cx("card")}>
        <CardBody>
          <div className={cx("logoWrapper")}>
            <img
              className={cx("logoImg")}
              src="img/logoSHTP_Login.png"
              alt="logo_shtp"
            />
          </div>
          <h1 className="text-center">Đăng nhập</h1>
          <Form>
            <FormGroup>
              <Label for="username">Tên đăng nhập</Label>
              <Input
                id="username"
                name="username"
                placeholder="Nhập tên đăng nhập"
                type="text"
                value={state.username}
                onChange={(event) => {
                  handleChange(event);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm="8">
                  <Label for="password">Mật khẩu</Label>
                </Col>
                <Col sm="4" className="text-right">
                  <Link to="/">Quên mật khẩu ?</Link>
                </Col>
              </Row>
              <Input
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                type="password"
                value={state.password}
                onChange={(event) => {
                  handleChange(event);
                }}
              />
              <div className="mt-4">
                <Button block color="primary" size="" onClick={(event)=>{submitLogin(event)}}>
                  Đăng nhập
                </Button>
              </div>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
