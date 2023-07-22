import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/navbar/Navbar";
import Header from "../../Components/Header/Header.js";
import './List.css'
import { useLocation } from 'react-router-dom';
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from '../../Components/SearchItem/SearchItem';
import axios from 'axios';

const List = () => {

  const location = useLocation();

  //console.log(location);

  const [result,setResult] = useState();
  const [loading, setLoading] = useState();


  useEffect(() => {
    axios
      .get(`http://localhost:3001/hotels?city=${destination}`)
      .then((response) => {
        setResult(response.data);
        //console.log(response.data);
        console.log("data", result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [destination,setDestination] = useState(location.state.destination);
  const [date,setDate] = useState(location.state.date);
  const [options,setOptions] = useState(location.state.options)
  const [openDate,setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const handleClick = () =>{
    setLoading(true);
    try {
       axios.get(`http://localhost:3001/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`).then((response)=>{
        setResult(response.data);
      })
     } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (

  <div>
  <Navbar />
  <Header type="list" />
  <div className="listContainer">
    <div className="listWrapper">
      <div className="listSearch">
        <h1 className="lsTitle">Search</h1>
        <div className="lsItem">
          <label>Destination</label>
          <input placeholder={destination} type="text" />
        </div>
        <div className="lsItem">
          <label>Check-in Date</label>
          <span onClick={() => setOpenDate(!openDate)}>{`${format(
            date[0].startDate,
            "MM/dd/yyyy"
          )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              ranges={date}
            />
          )}
        </div>
        <div className="lsItem">
          <label>Options</label>
          <div className="lsOptions">
            <div className="lsOptionItem">
              <span className="lsOptionText">
                Min price <small>per night</small>
              </span>
              <input
                type="number"
                onChange={(e) => setMin(e.target.value)}
                className="lsOptionInput"
              />
            </div>
            <div className="lsOptionItem">
              <span className="lsOptionText">
                Max price <small>per night</small>
              </span>
              <input
                type="number"
                onChange={(e) => setMax(e.target.value)}
                className="lsOptionInput"
              />
            </div>
            <div className="lsOptionItem">
              <span className="lsOptionText">Adult</span>
              <input
                type="number"
                min={1}
                className="lsOptionInput"
                placeholder={options.adult}
              />
            </div>
            <div className="lsOptionItem">
              <span className="lsOptionText">Children</span>
              <input
                type="number"
                min={0}
                className="lsOptionInput"
                placeholder={options.children}
              />
            </div>
            <div className="lsOptionItem">
              <span className="lsOptionText">Room</span>
              <input
                type="number"
                min={1}
                className="lsOptionInput"
                placeholder={options.room}
              />
            </div>
          </div>
        </div>
        <button onClick={handleClick}>Search</button>
      </div>
      <div className="listResult">
        {loading ? (
          "loading"
        ) : (
          <>
            {result && result.map((item) => ( // Add a check for 'result' before mapping
              <SearchItem item={item} key={item._id} />
            ))}
          </>
        )}
      </div>
    </div>
  </div>
</div>
  )
}

export default List