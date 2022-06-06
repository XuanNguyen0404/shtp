import React from 'react';
import styles from './DashboardEmployee.module.scss'
import classNames from "classnames/bind"; 
import { Line } from 'react-chartjs-2';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { data, options } from '~/layouts/DashboardLayout/DashboardLayout';

const cx = classNames.bind(styles);


function DashboardEmployee() {
    return (
        <Row style={{ margin: 0 }}>
          <Col sm="10" className={cx("chartContainer")}>
            <Card>
              <CardHeader>
                <h6 className="surtitle">Overview</h6>
                <h5 className="h3 mb-0">Total sales</h5>
              </CardHeader>
              <CardBody className={cx("cardBody")}>
                <Line options={options} data={data} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
}

export default DashboardEmployee;