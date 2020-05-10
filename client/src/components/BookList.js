import React, { Component } from 'react';
import {gql} from 'apollo-boost';//graphql query language is not javascript, when we construct it, we need to import gql
import {graphql} from 'react-apollo';
import AddBook from './AddBook';
import BookDetails from './BookDetails'

const getBooksQuery=gql`
{
    books{
        name
        id
    }
}


`

class BookList extends Component {
    constructor(props){
        super(props);
        this.state={
            selected:null
        }
    }

    displayBooks(){
        var data=this.props.data
        if(data.loading){
            return (<div>Loading Books...</div>)
        }else{
            return (data.books.map((book)=>{
                return (<li key={book.id} onClick={e=>{this.setState({selected:book.id})}}>{book.name}</li>)
            }))
        }
    }


    render() {
        //console.log(this.props)
        return (
            <div>
                <div>
                    <ul className="" id="book-list">
                        {this.displayBooks()}
                    </ul>
                    <BookDetails bookid={this.state.selected} />
                </div>
                <AddBook />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);
//using graphql bind getBooksQuery to this component BookList and insdie this
//component has access all the data comeback from this query and stored inside the component props. 