import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [countries, setCountries] = useState([])
  const [label, setLabel] = useState('')
  const [search, setSearch] = useState('')
  const [detail, setDetail] = useState('')

  const handleFilter = e => {
    if (e.target.value !== '') {
      setSearch(e.target.value)
    } else {
      setSearch('')
      setCountries([])
    }
  }

  const showDetail = e => {
    console.log(e.target.value)
    setDetail(e.target.value)
    if (detail === e.target.value) setDetail('')
  }

  useEffect(() => {
    if (search) {
      axios
        .get(`https://restcountries.com/v3.1/name/${search}`)
        .then(response => {
          if (response.data.length <= 10) {
            console.log(response.data)
            setCountries(response.data)
            setLabel('')
          } else {
            setLabel('Too many matches, specify another filter')
          }
        })
        .catch(error => {
          alert('Search value invalid')
        })
    } else {
      setLabel('')
    }
  }, [search])

  if (countries.length === 1) {
    return (
      <div>
        <div>
          find countries <input value={search} onChange={handleFilter} />
        </div>
        <CountryDetail country={countries[0]} />
      </div>
    )
  }
  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleFilter} />
      </div>
      {label
        ? label
        : countries.map(country => {
            return (
              <div key={country.name.common}>
                <Country name={country.name.common} handleClick={showDetail} />
                {detail === country.name.common ? (
                  <CountryDetail country={country} />
                ) : (
                  ''
                )}
              </div>
            )
          })}
    </div>
  )
}

export default App
