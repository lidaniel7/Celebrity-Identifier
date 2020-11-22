import './App.css';
import Navigation from './Components/Navigation'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import Particles from 'react-particles-js'


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

function App() {
  return (
    <div className="App">
      <Particles className='particles'
        params={particlesOptions} />
      <Navigation />
      <Rank />
      <ImageLinkForm />
      
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
