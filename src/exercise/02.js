// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// Not thrilled about how we're trusting that 'key' will be passed in here. 
// What if a dev uses this with just useLocalStorageState('Dolores')? 
// Then localStorage would be like { Dolores: '' }
function useLocalStorageState(key, initialName = '') {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || initialName,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
