
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
function App() {
  const[lang,setlang]=useState('');
  const [long,setlong]=useState('');
  const[loclist,setloclist]=useState([]);
  useEffect(()=>{
    // console.log("lang",lang)
    // console.log("long",long)
    console.log(loclist)
  })
const Find=()=>{
  console.log("lang",lang);
  console.log("long",long);
  Axios.post('http://localhost:5000/get',{lang:lang,long:long})
 .then((response)=>{
      console.log(response);
      setloclist(response.data);
     
   })
}
  return (
    <div >
      <label For="lang">lang</label>
      <br></br>
      <input type="number" onChange={(event)=>{
       setlang(event.target.value)
     }}></input>
      <br></br>
      <label For="long">longitiude</label>
      <br></br>
      <input  type="number"onChange={(event)=>{
       setlong(event.target.value)
     }}></input>
      <br></br>
        <button onClick={Find}>find</button>
        <div>
        <table>
          <thead>
        <th>ID</th>
        {/* <th>Location</th> */}
        <th>Name</th>
        <th>Cateory</th>
        </thead>
        <tbody>
            { loclist.map((value,key)=>{
              return(
                        <tr key={key}>
                          
                            <td>{value._id}</td>
                            {/* <td>{value.location}</td> */}
                            <td>{value.name}</td>

                            <td>{value.category}</td>
                          
                        </tr>
                       
            )})} 
            </tbody> 

        </table>
        </div>
   
    </div>
  );
}

export default App;
