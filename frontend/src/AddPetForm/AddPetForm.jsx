import {useState} from 'react'
import { useEffect } from 'react'
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
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [popup]);
   
    function changeHandler(event){
      const name= event.target.name
      const value=(event.target.type==="file")?event.target.files[0]:event.target.value
      setInfo({...info,[name]:value})
    }
    function handleSubmit(event){
        event.preventDefault()
       const newErrors = {};

  if (!info.age || Number(info.age) <= 0) {
    newErrors.age = 'Please enter a valid age above 0.';
  }

  if (!/^\d{10}$/.test(info.number)) {
    newErrors.number = 'Enter a valid 10-digit phone number.';
  }
  if (!info.price || Number(info.price) <= 0) {
  newErrors.price = 'Please enter a valid price above 0.';
}
if (!info.Image) {
  newErrors.Image = 'Please upload an image.';
} 
 if (!info.Image.type.startsWith("image/")) {
  newErrors.Image = 'Only image files are allowed.';
} 
 if (info.Image.size > 2 * 1024 * 1024) {
  newErrors.Image = 'Image must be less than 2MB.';
}

if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});

  setIsSubmitting(true);
        const formData= new FormData()
        for(let key in info){
            formData.append(key,info[key])
        }
        const BASE_URL=import.meta.env.VITE_API_URL
        fetch(`${BASE_URL}/pet`,{
            method:"POST",
            body:formData})
        .then(res=>res.json())   
        .then(data=>{setPopup(true)}) 
        .then(()=>{ setInfo({
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
        Image:""})
        })
        .catch(error=>{alert("something went wrong")})
        .finally(() => setIsSubmitting(false));
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
        {errors.number && <small style={{ color: "red" }}>{errors.number}</small>}
        <label htmlFor="state">State :</label>
        <input  className="textField"value={info.state} type="text" name="state" onChange={changeHandler}required/>
        
        
        <h2 className='box-shadow shadow p-2 ps-4 my-4 border rounded-pill'>Pet Information</h2>
        <label>Pet Category :</label>
        <select  required className="textField" name="category" value={info.category} onChange={changeHandler}>
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
        {errors.age && <small style={{ color: "red" }}>{errors.age}</small>}
        <label htmlFor="breed">Breed :</label>
        <input  className="textField" type="text" value={info.breed} name="breed" onChange={changeHandler} required />
        <label htmlFor="gender">Gender:</label>
        <label><input required className="radio" name="gender"type="radio"  value={"Male"} checked={info.gender==="Male"} onChange={changeHandler}/>Male</label>
        <label><input className="radio" name="gender" type="radio" value={"Female"} checked={info.gender==="Female"}onChange={changeHandler}/>Female</label>
        <label htmlFor="vaccine">Vaccinated :</label>
        <label><input required className="radio" name="vaccine" type="radio" value={"Yes"} checked={info.vaccine==="Yes"} onChange={changeHandler}/>Yes</label>
        <label><input className="radio" name="vaccine" type="radio" value={"No"} checked={info.vaccine==="No"} onChange={changeHandler}/>No</label>
        <label>Image:</label>
        <input  className="textField" type="file" name="Image"  accept="image/*" onChange={changeHandler} required/>
        {info.Image && (<img src={URL.createObjectURL(info.Image)} alt="Pet Preview" 
                        style={{ width: '200px', marginTop: '10px' }}/>)}
        <label htmlFor="price">Price($) :</label>
        <input  className="textField"type="number" value={info.price} name="price" onChange={changeHandler} required/>  
        {errors.price && <small style={{ color: "red" }}>{errors.price}</small>}              
        <button className="submit" type="submit">
  {isSubmitting ? "Submitting..." : "Submit"}</button>
        {popup && (<div className='popup'>
            <h2>Form Submitted Successfully </h2>
            </div>)}
        </form>
    </>
    )
}

export default Form