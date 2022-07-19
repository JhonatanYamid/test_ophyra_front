import Form from './components/Form';
import ListItems from './components/ListItems';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [products, setProducts] = useState([])
  const [change, makeChange] = useState('')
  const [page, setPage] = useState(0)
  const [data, setData] = useState({
    id: '',
    description: '',
    image: '',
    price: '',
    title: ''
  });

  useEffect(() => {
    const getProducts = async () => {
      
      const url = `https://test-ophyra-back.herokuapp.com/index.php/products/list`;
      let jsonData = {
        start: page,
        limit: 5
      }
      axios.post(url, jsonData)
        .then(function (response) {
          setProducts(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getProducts();
  }, [setProducts, change, page, setPage])

  const sendProduct = e => {
    e.preventDefault();
    let url = 'https://test-ophyra-back.herokuapp.com/index.php/products/insert'
    let jsonData = {
      price: parseInt(data.price),
      description: data.description,
      title: data.title,
      image: data.image
    }
    if (change === 'update') {
      let text = "Seguro que desea actualizar el producto '" + data.title + "'?";
      if (window.confirm(text) === true) {
        url = 'https://test-ophyra-back.herokuapp.com/index.php/products/update'
        jsonData = {
          id: data.id,
          price: parseInt(data.price),
          description: data.description,
          title: data.title,
          image: data.image
        }
      } else {
        return
      }
    }
    axios.post(url, jsonData)
      .then(function (response) {
        makeChange('insert');
        setData({
          id: '',
          description: '',
          image: '',
          price: '',
          title: ''
        })
      })
      .catch(function (error) {
        console.log(error);
      });

    makeChange('');
  }

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-primary">Test Ophyra</h5>
              <br />
              <div className="row">

                <div className="col-5">
                  <Form sendProduct={sendProduct} products={products} setData={setData} data={data} change={change} makeChange={makeChange} />
                </div>
                <div className="col-7">
                  <ListItems products={products} makeChange={makeChange} setData={setData} page={page} setPage={setPage} />

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div >
  );
}

export default App;
