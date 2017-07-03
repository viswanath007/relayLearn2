import React from 'react';
import Relay from 'react-relay';
import RBTable from './RBTable';

class App extends React.Component {
  state = {
    data: this.props.viewer.widgets
  };
  handleUpdate (row) {
    let data = this.state.data.slice();
    data.push(row);
    this.setState({
      data: data
    })
  }
  render() {
    return (
      <div>
        <h1>Widget list</h1>
        <ul>
          {this.state.data.map(widget => {
            return (
              <li key={widget.id}>
                {widget.id} {widget.first_name}
                {widget.last_name} {widget.email}
                {widget.gender} {widget.ip_address}
              </li>
            );
          })}
        </ul>
        <br /><hr /><br />
        <h2>React Bootstrap Table Component</h2>
        <RBTable data={this.state.data} onUpdate={this.handleUpdate.bind(this)} />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        widgets {
          id,
          first_name,
          last_name,
          email,
          gender,
          ip_address
        },
      }
    `,
  },
});
