import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const API = 'https://api.github.com'
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/users/walela`)
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
    <div className='App'>
      <header>
        <h1>nectar</h1>
      </header>
      {!loading && userData.length !== 0 ? (
        <div className='dashboard'>
          <div className='profile'>
            <img src={userData.avatar_url} alt='github avatar' />
            <div className='following'>
              <div className='follower-titles'>
                <span>FOLLOWING</span>
                {'  '}
                <span>FOLLOWERS</span>
              </div>
              <div className='follower-data'>
                <span>{userData.following}</span>
                {'  '}
                <span>{userData.followers}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  )
}

export default App
