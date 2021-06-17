import React, { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { Category, Result, Menus } from '../components';
import { API_URL } from '../utils/constants';
import axios from 'axios'
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      kategoriDipilih: 'Makanan',
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.kategoriDipilih)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log("Error nih :)", error);
      });

    this.getListKeranjang ();
  }

  // componentDidUpdate(prevState) {
  //  if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then(res => {
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       .catch(error => {
  //         console.log("Error nih :)", error);
  //       });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(error => {
        console.log("Error nih :)", error);
      })
  }

  changeCategory = (value) => {
    this.setState({
      kategoriDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log("Error nih :)", error);
      });
  }

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Successfully added to cart!",
                text: "Successfully added to cart!" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch(error => {
              console.log("Error nih :)", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Successfully added to cart!",
                text: "Successfully added to cart!" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch(error => {
              console.log("Error nih :)", error);
            });
        }
      })
      .catch(error => {
        console.log("Error nih :)", error);
      });
  };

  render() {
    const { menus, kategoriDipilih, keranjangs } = this.state
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Category changeCategory={this.changeCategory} kategoriDipilih={kategoriDipilih} />
            <Col>
              <h4 className="text-center mt-3"><strong>List Produk</strong></h4>
              <hr />
              <Row className="overflow-auto menu">
                {menus && menus.map((menu) => (
                  <Menus
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={this.masukKeranjang}
                  />
                ))}
              </Row>
            </Col>
            <Result keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang}/>
          </Row>
        </Container>
      </div>
    )
  }
}