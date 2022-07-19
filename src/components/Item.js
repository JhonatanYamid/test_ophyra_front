import axios from 'axios';
const Item = ({ item: { id, title, description, image, price }, makeChange, setData }) => {
    const deleteProduct = (id, title) => {
        let text = "Seguro que desea eliminar el producto '" + title + "'?";
        if (window.confirm(text) === true) {
            axios.post('http://localhost/test_ophyra_back/index.php/products/delete', {
                id: id
            })
                .then(function (response) {
                    makeChange('delete');
                })
                .catch(function (error) {
                    console.log(error);
                });
            makeChange('');
        }
    }
    const setUpdate = () => {
        setData({ id: id, description: description, image: image, price: price, title: title });
        makeChange('update');
    }
    let thumb = (!image || image === '') ? 'without-image.jpg' : "http://localhost/test_ophyra_back/" + image
    return (
        <tr>
            <td><img src={thumb} className='img-thumbnail' alt="thumbnail" /></td>
            <td>{title}</td>
            <td>{description}</td>
            <td>${price}</td>
            <td>
                <button className="btn btn-primary" onClick={setUpdate}>Editar</button>
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteProduct(id, title)}>Eliminar</button>
            </td>
        </tr>
    );
}

export default Item;