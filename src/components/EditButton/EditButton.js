function EditButton({ setEdit }) {
    return (<a onClick={() => { setEdit(true) }}>Edit</a>)
}

export default EditButton;