import React, { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { Category, Result, NavbarComponent, Menus } from './components';
import { API_URL } from './utils/constants';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      kategoriDipilih: 'Makanan'
    }
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.kategoriDipilih)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error);
      })
  }

  changeCategory = (value) => {
    this.setState({
      kategoriDipilih: value,
      menus: []
    })
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const { menus, kategoriDipilih } = this.state
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <Category changeCategory={this.changeCategory} kategoriDipilih={kategoriDipilih}/>
              <Col>
                <h4><strong>List Produk</strong></h4>
                <hr />
                <Row>
                  {menus && menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                    />
                  ))}
                </Row>
              </Col>
              <Result />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}