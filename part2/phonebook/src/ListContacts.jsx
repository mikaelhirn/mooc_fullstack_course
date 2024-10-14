const ListContacts = ({ persons, filter, handleDeleteName }) => {
const listPersons = persons.filter((x) => x.name.toLowerCase().includes(filter.toLocaleLowerCase())).map((x) => <li key={x.id}><button onClick={() => {handleDeleteName(x.id)}}>del</button> {x.name} :: {x.number}</li>)
return (
    <div>{listPersons}</div>
)
}

export default ListContacts
