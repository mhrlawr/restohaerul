import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/formatrupiah';
import axios from 'axios';
import { API_URL } from '../utils/constants';


export default class Total extends Component {
    submitTotal = (Total) => {
        const pesanan = {
            total: Total,
            menus: this.props.keranjangs
        }
        axios.post(API_URL+"pesanans", pesanan).then((res) => {
            this.props.history.push('/sukses')
        })
    };
    render() {
        const Total = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);
        return (
            <>

            {/*FOR WEB APPS*/}
            <div className="fixed-bottom d-none d-md-block">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h5>
                            <strong>Total Harga: </strong>
                            <strong className="float-right mr-2">Rp. {numberWithCommas(Total)}</strong>
                        </h5>
                        <Button variant="primary" block className="mb-2 mt-3 mr-3" size="lg" onClick={() => this.submitTotal(Total)}>
                            <FontAwesomeIcon icon={faShoppingCart} /> <strong>BUY</strong>
                        </Button>
                    </Col>
                </Row>
            </div>

            {/*FOR MOBILE APPS*/}
            <div className="d-sm-block d-md-none">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h5>
                            <strong>Total Harga: </strong>
                            <strong className="float-right mr-2">Rp. {numberWithCommas(Total)}</strong>
                        </h5>
                        <Button variant="primary" block className="mb-2 mt-3 mr-3" size="lg" onClick={() => this.submitTotal(Total)}>
                            <FontAwesomeIcon icon={faShoppingCart} /> <strong>BUY</strong>
                        </Button>
                    </Col>
                </Row>
            </div>
            </>
        )
    }
}
