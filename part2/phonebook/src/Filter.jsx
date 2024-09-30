const Filter = ({newFilter, handleNewFilter}) => {
    return (
        <div>
          Filter shown with: <input value={newFilter} onChange={handleNewFilter}/>  
        </div>
    )
}

export default Filter