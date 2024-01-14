import { } from 'react'
import { IoIosSearch } from "react-icons/io";
import { useSearch } from '../../context/search';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const SearchInput = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{    
            const {data} =  await axios.get(`http://localhost:5000/api/v1/product/searchproduct/${values.keyword}`)
            setValues({...values, results: data})
            navigate('/search')
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className="w-100">
                <form className="d-flex w-50 m-auto " role="search" onSubmit={handleSubmit}>
                    <input className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={values.keyword}
                        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        <IoIosSearch />
                    </button>
                </form>
            </div>
        </>
    )
}

export default SearchInput