
import Item from './Item';
const ListItems = ({ products, deleteProduct, makeChange, setData, page,
    setPage }) => {
    console.log(products.length);
    return (
        <div className="card">
            <div className="card-body">
                <h6 className="card-title mb-3">Listado productos</h6>
                <div className="row px-3 pt-3">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope='col'>Imagen</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(item => (
                                <Item key={item.id} item={item} makeChange={makeChange} setData={setData} />
                            ))}
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                {page !== 0 &&
                                    <button className="page-link" onClick={() => setPage(page - 5)}>Anterior</button>
                                }
                            </li>
                            <li className="page-item">
                                {products.length >= 5 &&
                                    <button className="page-link" onClick={() => { setPage(page + 5) }}>Siguiente</button>
                                }
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default ListItems;