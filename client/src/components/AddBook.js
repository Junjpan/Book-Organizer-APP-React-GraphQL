import React, { Component } from "react";
import { graphql} from "react-apollo";
import * as compose from 'lodash.flowright'; //compose is removed from  React apollo,now to use compose,we can use lodash's flowright
import { gql } from "apollo-boost";
import {getAuthorsQuery,addBookMutation,getBooksQuery} from '../queries/queries'

class AddBook extends Component {
  constructor(props){
      super(props);
      this.state={
          name:'',
          genre:'',
          authorId:''
      }
  }  

  submitForm=(e)=>{
    e.preventDefault();
    const {name,genre,authorId}=this.state;
    this.props.addBookMutation({
      variables:{
        name,
        genre,
        authorId
      },
      refetchQueries:[{query:getBooksQuery}] //to allow refetch the particular query
    })
    
  
  }
  render() {
      //console.log(this.props)
    const data=this.props.getAuthorsQuery  
    return (
      <form id="add_book" onSubmit={this.submitForm.bind(this)}>
        <div className='field'>
          <label >Book Name:</label>
          <input type='text'  onChange={(e)=>this.setState({name:e.target.value})}/>
        </div>
        <div className='field'>
          <label htmlFor=''>Genre:</label>
          <input type='text' onChange={(e)=>this.setState({genre:e.target.value})} />
        </div>
        <div className='field'>
          <label htmlFor=''>Author:</label>
          <select onChange={(e)=>this.setState({authorId:e.target.value})}>
              <option>Select Author</option>
              {!data.loading ? data.authors.map((author)=>{
                  return(<option key={author.id} value={author.id}>{author.name}</option>)
              }):<option>Loading authors</option>}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
graphql(getAuthorsQuery,{name:'getAuthorsQuery'}),
graphql(addBookMutation,{name:'addBookMutation'})
)(AddBook);
