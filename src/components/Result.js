import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class Category extends Component {
    render() {
        return (
            <Col md={3} mt="2">
                <h4><strong>Result</strong></h4>
                <hr />
            </Col>
        )
    }
}