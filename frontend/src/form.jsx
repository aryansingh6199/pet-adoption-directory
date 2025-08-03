import {useState} from 'react'
function Form(){
    const[info,setInfo]=useState({
        name:"",
        number:"",
        state:"",
        petname:"",
        age:"",
        breed:"",
        price:"",
        gender:"",
        vaccine:"",
        category:"",
        Image:""
    })
    const[popup,setPopup]=useState(false)
   
    function changeHandler(event){
      const name= event.target.name
      const value=(event.target.type==="file")?event.target.files[0]:event.target.value
      setInfo({...info,[name]:value})
    }
    function handleSubmit(event){
        event.preventDefault()
        const formData= new FormData()
        for(let key in info){
            formData.append(key,info[key])
        }
        fetch("http://localhost:3000/pet",{
            method:"POST",
            body:formData})
        .then(res=>res.json())   
        .then(data=>{setPopup(true)}) 
        .then(()=>{ info.name="";
        info.number="";
        info.state="";
        info.petname="";
        info.age="";
        info.breed="";
        info.price="";
        info.gender="";
        info.vaccine="";
        info.category="";
        info.Image="";

        })
        .catch(error=>{alert("something went wrong")})
    }
    return(
        <>
         <form onSubmit={handleSubmit}>
            
        <h1>Pet Seller Form</h1>
        
        <h2 className='box-shadow shadow p-2 ps-4 my-4 border rounded-pill'>Seller Information</h2>
        <label htmlFor="name">Name :</label>
        <input  className="textField"value={info.name} type="text" name="name" onChange={changeHandler} required/>
        <label htmlFor="number">Phone Number :</label>
        <input  className="textField"type="number" value={info.number} name="number" onChange={changeHandler} required/>
        <label htmlFor="state">State :</label>
        <input  className="textField"value={info.state} type="text" name="state" onChange={changeHandler}required/>
        
        
        <h2 className='box-shadow shadow p-2 ps-4 my-4 border rounded-pill'>Pet Information</h2>
        <label>Pet Category :</label>
        <select  className="textField" name="category" value={info.type} onChange={changeHandler}>
            <option value="">select</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Hamster">Hamster</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
            <option value="Guinea pig">Guinea pig</option>
        </select>
        <label htmlFor="info_name">Pet's Name :</label>
        <input className="textField" type="text" value={info.petname} name="petname"onChange={changeHandler} required />
        <label htmlFor="age">Age :</label>
        <input  className="textField" type="number" value={info.age} name="age"onChange={changeHandler} required/>
        <label htmlFor="breed">Breed :</label>
        <input  className="textField" type="text" value={info.breed} name="breed" onChange={changeHandler} required />
        <label htmlFor="gender">Gender:</label>
        <label><input className="radio" name="gender"type="radio"  value={"Male"} checked={info.gender==="Male"} onChange={changeHandler}/>Male</label>
        <label><input className="radio" name="gender" type="radio" value={"Female"} checked={info.gender==="Female"}onChange={changeHandler}/>Female</label>
        <label htmlFor="vaccine">Vaccinated :</label>
        <label><input className="radio" name="vaccine" type="radio" value={"Yes"} checked={info.vaccine==="Yes"} onChange={changeHandler}/>Yes</label>
        <label><input className="radio" name="vaccine" type="radio" value={"No"} checked={info.vaccine==="No"} onChange={changeHandler}/>No</label>
        <label>Image:</label>
        <input  className="textField" type="file" name="Image" onChange={changeHandler} required/>
        {info.Image && (<img src={URL.createObjectURL(info.Image)} alt="Pet Preview" 
                        style={{ width: '200px', marginTop: '10px' }}/>)}
        <label htmlFor="price">Price($) :</label>
        <input  className="textField"type="number" value={info.price} name="price" onChange={changeHandler} required/>                
        <button className="submit">Submit</button>
        {popup && (<div className='popup'>
            <h2>Form Submitted Successfully </h2>
            </div>)}
        </form>
    </>
    )
}

export default Form