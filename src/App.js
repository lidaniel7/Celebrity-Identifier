import './App.css';
import React, { useEffect, useState } from 'react'
import Navigation from './Components/Navigation'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Rank from './Components/Rank/Rank'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai';



const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: '5009735fc64a4202af3518c63e0683b3'
 });


function App() {

  const [input, setInput] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [box, setBox] = useState({})
  const [celebName, setCelebName] = useState('')


  const faceHandler = (data) => {
    setCelebName(data['outputs'][0]['data']['regions'][0]['data']['concepts'][0].name)
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
    app.models.predict(Clarifai.CELEBRITY_MODEL, input)
      .then(response => (
        faceBox(faceHandler(response))
      ))
      .catch(error => console.log(error))
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
      <Navigation />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
      <FaceRecognition box={box} imageURL={imageURL}/>
    </div>
  );
}

export default App;
