import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const API = 'https://api.github.com'
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/users/aholachek`)
      .then(res => {
        console.log(res.data)
        setUserData(res.data)
      })
      .catch(err => console.error(err))
      .finally(() => {
        console.log('done loading')
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <header>
        <h1>nectar</h1>
      </header>
      {!loading && userData.length !== 0 ? (
        <div className='dashboard'>
          <div className='prof-pic'>
            <img src={userData.avatar_url} alt='github avatar' />
          </div>
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  )
}

export default App
