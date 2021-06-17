import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faBeer, faHotdog } from '@fortawesome/free-solid-svg-icons'

const Icon = ({ nama }) => {
    if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
    if (nama === "Minuman") return <FontAwesomeIcon icon={faBeer} className="mr-2" />
    if (nama === "Cemilan") return <FontAwesomeIcon icon={faHotdog} className="mr-2" />

    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
}

export default class Category extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "categories")
            .then(res => {
                const categories = res.data;
                this.setState({ categories });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { categories } = this.state;
        const { changeCategory, kategoriDipilih } = this.props;
        return (
            <Col md={2} className="mt-3">
                <h4 className="text-center"><strong>Kategori</strong></h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item key={category.id} onClick={() => changeCategory(category.nama)}
                            className={kategoriDipilih === category.nama && "category-aktif"}
                            style={{ cursor: 'pointer' }}>
                            <h6><Icon nama={category.nama} /> {category.nama}</h6>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        );
    }
}