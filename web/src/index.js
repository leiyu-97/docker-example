import React from 'react'
import request from './request'

export default class App extends React.Component {
  state = { health: false };

  componentWillMount() {
    request({ url: 'health' }).then(() => this.setState({ health: true }))
  }

  render() {
    const { health } = this.state
    return (
      <div>
        <div>
          branch: master
        </div>
        <div>
          server status:
          {health ? 'health' : 'unhealth'}
        </div>
      </div>
    )
  }
}
