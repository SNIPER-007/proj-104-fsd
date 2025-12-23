import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error){
    return { error }
  }

  componentDidCatch(error, info){
    console.error('Unhandled error caught by ErrorBoundary', error, info)
    this.setState({ info })
  }

  render(){
    if(this.state.error){
      const { error, info } = this.state
      return (
        <div style={{padding:20}}>
          <h2>Something went wrong</h2>
          <div style={{marginBottom:12}}>
            <strong>Error:</strong>
            <pre style={{whiteSpace:'pre-wrap',background:'#fff',padding:12}}>{String(error && error.toString())}</pre>
          </div>
          {error && error.stack && (
            <div style={{marginBottom:12}}>
              <strong>Stack:</strong>
              <pre style={{whiteSpace:'pre-wrap',background:'#fff',padding:12}}>{error.stack}</pre>
            </div>
          )}
          {info && info.componentStack && (
            <div style={{marginBottom:12}}>
              <strong>React component stack:</strong>
              <pre style={{whiteSpace:'pre-wrap',background:'#fff',padding:12}}>{info.componentStack}</pre>
            </div>
          )}
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=> window.location.reload()}>Reload</button>
            <button onClick={()=> navigator.clipboard && navigator.clipboard.writeText(
              `${error && error.toString()}\n\n${error && error.stack || ''}\n\n${info && info.componentStack || ''}`
            ).then(()=> alert('Copied to clipboard'))}>Copy details</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
