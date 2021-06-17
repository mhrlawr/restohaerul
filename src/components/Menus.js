import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { numberWithCommas } from '../utils/formatrupiah'

const Menus = ({ menu, masukKeranjang }) => {
    return (
        <Col md={3} xs={8} className="mb-5">
            <Card className="shadow" onClick={() => masukKeranjang(menu)}>
                <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
                <Card.Body>
                    <Card.Title>{menu.nama}</Card.Title>
                    <Card.Text>
                        Rp. = {numberWithCommas(menu.harga)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Menus
