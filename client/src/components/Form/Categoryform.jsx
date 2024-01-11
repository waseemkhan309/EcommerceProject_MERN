/* eslint-disable react/prop-types */
// import { useState } from 'react'

const Categoryform = ({handleSubmit,value,setValue}) => {

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" 
                    className="form-control" 
                    placeholder ="Enter new Category" 
                    value={value}
                    onChange={e=> setValue(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default Categoryform