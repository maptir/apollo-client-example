import {Query, Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import React, {Component} from 'react'

class Customers extends React.Component {
  constructor() {
    super()
    this.state = {
      createCustomerInput: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        website: ''
      }
    }
  }

  handleCustChange = (e) => {
    this.setState({
      createCustomerInput: {
        ...this.state.createCustomerInput,
        [e.target.name]: e.target.value
      }
    })
  }

  async createCustomer() {
    await this.props.createCustomer({
      variables: {
        createCustomerInput: this.state.createCustomerInput
      }
    })
  }

  render() {
    return (<div className="App-body">
      <h1>Customers</h1>
      <div className="input-group">

        <span>firstName</span>
        <input className="text-input" name="firstName" onChange={e => this.handleCustChange(e)} value={this.state.createCustomerInput.firstName}/>

        <span>lastName</span>
        <input className="text-input" name="lastName" onChange={e => this.handleCustChange(e)} value={this.state.createCustomerInput.lastName}/>

        <span>email</span>
        <input className="text-input" name="email" onChange={e => this.handleCustChange(e)} value={this.state.createCustomerInput.email}/>

        <span>website</span>
        <input className="text-input" name="website" onChange={e => this.handleCustChange(e)} value={this.state.createCustomerInput.website}/>

        <button className="button-input" onClick={() => this.createCustomer()}>CREATE</button>
      </div>
      <div className="nameCardGroup">
        {
          this.props.data.customers.map(customer => (
            <div key={customer.id} className="nameCard">
              <div className="smallBlock">
                ID: {customer.id} <br/>
                FirstName: {customer.firstName} <br/>
                LastName: {customer.lastName} <br/>
                Email: {customer.email} <br/>
                Website: {customer.website} <br/>
              </div>
            </div>
          ))
        }
      </div>
    </div>)
  }
}

const getCurrentCustomer = gql `
  query GetCurrentCustomer {
      customers {
        id
        firstName
        lastName
        email
        website
      }
  }
`

const createCustomer = gql `
  mutation createCustomer($createCustomerInput : CreateCustomerInput) {
      createCustomer(createCustomerInput : $createCustomerInput){
          id
          firstName
          lastName
          email
          website
      }
  }
`

const AppBindQuery = () => (
  <Mutation mutation={createCustomer} update={(cache, {data: { createCustomer }}) => {
    const {customers} = cache.readQuery({query: getCurrentCustomer})
    cache.writeQuery({
      query: getCurrentCustomer,
      data: {
        customers: customers.concat([createCustomer])
      }
    })
  }}>
  {
    (createCustomer, data) => (
      <Query query={getCurrentCustomer}>
        {
          ({loading, data, subscribeToMore}) => (
            !loading
            ? (<Customers data={data} createCustomer={createCustomer}/>)
            : null)
        }
      </Query>)
  }
</Mutation>)

export default AppBindQuery;
