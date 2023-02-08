import { useState, useEffect } from 'react'
import './App.css';

function App() {

  const [resourceType, setResourceType] = useState('posts');
  const [items, setItems] = useState([]);

  const [windowWith, setWindowWith] = useState(window.innerWidth);

  console.log('rendered')

  useEffect(() => {
    console.log('useEffect')
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then(response => response.json())
      .then(json => setItems(json))
  }, [resourceType])//only fetches when resourceType changes

  const handleResize = () => {
    setWindowWith(window.innerWidth)
  }

  useEffect(() => {
    console.log('useEffect window')
    window.addEventListener('resize', handleResize)
    return () => {//this return is the cleaning or unmount
      window.removeEventListener('resize', handleResize)
    }
  }, [])//On mount capture the size of the browser window

  return (
    <>
      <h1>Window Width: {windowWith}</h1>
      <div className="App">
        <button onClick={() => { setResourceType('posts') }} >Posts</button>
        <button onClick={() => { setResourceType('users') }} >Users</button>
        <button onClick={() => { setResourceType('comments') }} >Comments</button>
      </div>
      <h1>{resourceType}</h1>
      {items.map(item => {
        return <pre>{JSON.stringify(item)}</pre>
      })}

    </>
  );
}

export default App;
