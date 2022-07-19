const Form = ({ sendProduct, products, data, setData, change, makeChange }) => {

    const getValue = e => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const getImage = e => {
        e.preventDefault();
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = e => {
            const formData = { file: file = e.target.result }
            setData({
                ...data,
                image: formData
            })
        }
    }
    let formTitle = (change === 'update') ? 'Editar producto' : 'Insertar producto'
    let hideButton = (change === 'update') ? 'inline-block' : 'none'
    const cancel = () => {
        makeChange('')
        setData({
            id: '',
            description: '',
            image: '',
            price: '',
            title: ''
        })
    }

    return (
        <div className="card">
            <div className="card-body">
                <h6 className="card-title mb-3">{formTitle}</h6>
                <form onSubmit={sendProduct} encType="multipart/form-data">
                    <div className="form-group">
                        <input type="text" className="form-control" id="title" name="title" placeholder="Titulo" value={data.title} onChange={getValue} />
                        <br />
                        <input type="number" className="form-control" id="price" name="price" placeholder="Precio" value={data.price} onChange={getValue} />
                        <br />
                        <input type="text" className="form-control" id="description" name="description" placeholder="Descripción" value={data.description} onChange={getValue} />
                        <br />
                        <label htmlFor="images">Imagen</label>
                        <input type="file" className="form-control-file" id="images" name="images" onChange={getImage} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary m-1">Enviar</button>
                    <button className={"btn btn-danger m-1 d-" + hideButton} onClick={cancel}>Cancelar</button>
                </form>
            </div>
        </div >

    );
}

export default Form;