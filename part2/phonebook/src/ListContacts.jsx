const ListContacts = ({ persons, filter }) => {
const listPersons = persons.filter((x) => x.name.toLowerCase().includes(filter.toLocaleLowerCase())).map((x)=> {return <li key={x.id}>{x.name} :: {x.number}</li>})
return (
    <div>{listPersons}</div>
)
}

export default ListContacts