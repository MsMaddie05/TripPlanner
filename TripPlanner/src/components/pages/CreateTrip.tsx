import countries from "../../data/countries.json"

const CreateTrip = () => {
    return (
        <div>Create trip!
            <button onClick={()=>console.log(countries)}></button>
            {countries[0].name}
        </div>
    )
}

export default CreateTrip;