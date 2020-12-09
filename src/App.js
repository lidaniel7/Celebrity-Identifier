import './App.css';
import React, { useEffect, useState } from 'react'
import Navigation from './Components/Navigation'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register'
import Rank from './Components/Rank/Rank'
import Name from './Components/Name/Name'
import Leaderboard from './Components/Leaderboard/Leaderboard'
import Particles from 'react-particles-js'
import axios from 'axios';





const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


function App() {

  const [input, setInput] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [box, setBox] = useState({})
  const [celebName, setCelebName] = useState('')
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setSignIn] = useState(false)
  const [leaderboard, setleaderboard] = useState({})
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  useEffect(() => {
    axios.get('https://protected-badlands-42275.herokuapp.com/leaderboard')
      .then(response => response.data)
      .then(data => setleaderboard(data))
  }, [])


  const faceHandler = (data) => {
    let name = data['outputs'][0]['data']['regions'][0]['data']['concepts'][0].name
    name = name.split(' ')
    name[0] = name[0][0].toUpperCase() + name[0].substr(1)
    name[1] = name[1][0].toUpperCase() + name[1].substr(1)
    name = name.join(" ")
    setCelebName(name)
    axios.post('https://protected-badlands-42275.herokuapp.com/updateleaderboard', { name: name })
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })

    const dimensions = data['outputs'][0]['data']['regions'][0]['region_info']['bounding_box']
    const image = document.getElementById('inputimage');
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: dimensions.left_col * width,
      topRow: dimensions.top_row * height,
      rightCol: width - (dimensions.right_col * width),
      bottomRow: height - (dimensions.bottom_row * height)
    }
  }

  const faceBox = (box) => {
    setBox(box)
  }

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const onButtonSubmit = () => {
    setImageURL(input)
    axios.post('https://protected-badlands-42275.herokuapp.com/imageurl', { input: input })
      .then(response => {
        if (response.data) {
          const userID = {
            id: user.id
          }
          axios.put('https://protected-badlands-42275.herokuapp.com/image', userID)
            .then(response => response.data)
            .then(count => {
              setUser(prevState => ({
                ...prevState,
                entries: count
              }))
            })
            .catch(console.log)
        }
        faceBox(faceHandler(response.data))
        axios.get('https://protected-badlands-42275.herokuapp.com/leaderboard')
          .then(response => response.data)
          .then(data => setleaderboard(data))
      })
      .catch(error => console.log(error))
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setSignIn(false)
      setImageURL('')
      setCelebName('')
    } else if (route === 'home') {
      setSignIn(true)
    }
    setRoute(route)
  }

  // app.models.predict({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
  //     .then(generalModel => {
  //       return generalModel.predict("https://samples.clarifai.com/face-det.jpg");
  //     })
  //     .then(response => {
  //       var concepts = response['outputs'][0]['data']['concepts']
  //       console.log(concepts)
  //     })

  return (
    <div className="App">
      <Particles className='particles'
        params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home'
        ? <div>
          <Rank name={user.name} entries={user.entries} />
          <Leaderboard leaderboard={leaderboard} />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
          {celebName ? <Name celebName={celebName} /> : <p></p>}
          <FaceRecognition box={box} imageURL={imageURL} />
        </div>
        : (
          route === 'signin'
            ? <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
            : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )
      }
    </div>
  );
}

export default App;
