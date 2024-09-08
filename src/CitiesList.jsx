/*
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CitiesList.css';

const CitiesList = () => {
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [change, setChange] = useState('');
  const [filterData, setFilterData] = useState([]);

  const fetchCities = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${(page - 1) * 20}`);
      const newCities = response.data.results;
      setCities(prevCities => [...prevCities, ...newCities]);
      setHasMore(newCities.length > 0); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);


  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
      if (hasMore && !loading) {
        setPage(prevPage => prevPage + 1); 
      }
    }
  };

  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  
  const changeValues = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setChange(searchValue);

    if (searchValue === '') {
      setFilterData([]);
    } else {
      const filteredData = cities.filter((city) =>
        city.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchValue)
      );
      setFilterData(filteredData);
    }
  };

  return (
    <div className="container-fluid w-100">
      <div className="row justify-content-center w-100 bg align-items-center">
        <div className="col-12 col-md-10 col-lg-8 p-0 ">
          <div className='bg bg1 mb-1'>
            <h1 className="m-4 text-white fst-italic text-decoration-underline text-center">Weather Forecast</h1>
          </div>

          <input
            type="text"
            value={change}
            onChange={changeValues}
            placeholder="Search Here with City Name..."
            className="form-control mb-3 border border-black"
          />

          {filterData.length > 0 && (
            <ul className="list-group ">
              {filterData.map((city) => (
                <li key={city.geoname_id} className="list-group-item bgg">
                  <Link to={`/weather/${city.name}`} target="_blank">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <table className="table border table-hover table-responsive">
            <thead className="thead-dark">
              <tr>
                <th className='table-secondary'>CITY</th>
                <th className='table-secondary'>COUNTRY</th>
                <th className='table-secondary'>TIME ZONE</th>
              </tr>
            </thead>
            <tbody>
              {(change ? filterData : cities).map((city) => (
                <tr key={city.geoname_id}>
                  <td>
                    <Link to={`/weather/${city.name}`} target="_blank">
                      {city.name}
                    </Link>
                  </td>
                  <td>{city.cou_name_en}</td>
                  <td>{city.timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && <p>Loading more cities...</p>}
          {!hasMore && !loading && <p>No more cities to load.</p>}
        </div>
      </div>
    </div>
  );
};

export default CitiesList;

*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import './CitiesList.css'


const CitiesList = () => {
  const [cities, setCities] = useState([]); // List of cities
  const [selectedCity, setSelectedCity] = useState(null); // Selected city for weather details
  const[change,setChange]=useState('')
  const[filterData,setFilterData]=useState([])

  useEffect(()=>{
      axios.get("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100")
      .then(res=>{
        setCities(res.data.results)})
      .catch(err=>{
        console.log(err)
        })
  },[])

  const handleCityClick = (city) => {
    setSelectedCity(city);
    
  };

  

  const changeValues=(event)=>{
    const searchValue=event.target.value.toLowerCase();
    setChange(searchValue);

    if(searchValue===""){
      setFilterData([])
    }else{
      const filteredData=cities.filter((city)=>city.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchValue));
      setFilterData(filteredData);

    }
    
  }

  return (
    <div className="container w-100">
      <div className="row justify-content-center w-100 bg align-items-center">
        <div className="col-12 col-md-10 col-lg-8 p-0 ">
          <div className='bg bg1 mb-1'>
          <h1 className="m-4 text-white fst-italic text-decoration-underline  text-center">Weather Forecast</h1>
          </div>
          
          <input
            type="text"
            value={change}
            onChange={changeValues}
            placeholder="Search Here"
            className="form-control mb-3 border border-black"
          />

          {filterData.length > 0 && (
            <ul className="list-group">
              {filterData.map((city) => (
                <li key={city.jeoname_id} className="list-group-item">
                  <Link to={`/weather/${city.name}`} target="_blank"  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <table className="table border  table-responsive">
            <thead className="thead-dark">
              <tr>
                <th className='table-secondary'>City Name</th>
                <th className='table-secondary'>Country</th>
                <th className='table-secondary'>Time Zone</th>
              </tr>
            </thead>
            <tbody>
              {(change ? filterData : cities).map((city) => (
                <tr key={city.jeoname_id} onClick={() => handleCityClick(city)}>
                  <td>
                    <Link to={`/weather/${city.name}`} target="_blank">
                      {city.name}
                    </Link>
                  </td>
                  <td>{city.cou_name_en}</td>
                  <td>{city.timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      );
    };


export default CitiesList