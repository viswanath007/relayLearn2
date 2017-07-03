import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class RBTable extends React.Component {
  state = {
    data: this.props.data
  };
  render() {
    const cellEdit = {
      mode: 'click'
    };
    const options = {
      afterInsertRow: this.props.onUpdate
    }
    return (
      <BootstrapTable data={this.state.data} insertRow options={options} cellEdit={ cellEdit } striped hover condensed>
        <TableHeaderColumn isKey dataField='id'>Person ID</TableHeaderColumn>
        <TableHeaderColumn dataField='first_name'>First Name</TableHeaderColumn>
        <TableHeaderColumn dataField='last_name'>Last Name</TableHeaderColumn>
        <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
        <TableHeaderColumn dataField='gender'>Gender</TableHeaderColumn>
        <TableHeaderColumn dataField='ip_address'>IP Address</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}