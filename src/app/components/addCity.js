import React from 'react';

const AddCity = ({addBlock, handleChange}) => {
  return(
  <div className="addCityBlock">
    <form onSubmit={addBlock}>
      <input name="newCity" type="text"  placeholder="Type city name" onChange={handleChange} />
      <input type="submit" id="butt" value="Add city"/>
    </form>
  </div>
  )
}

export default AddCity;
