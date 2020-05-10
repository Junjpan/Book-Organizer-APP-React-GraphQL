import {gql} from 'apollo-boost';

const getBooksQuery=gql`
{
    books{
        name
        id
    }
}
`
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

//passing the queries varible to the mutation and put ! behind the string mean it has to be a string and not null
const addBookMutation=gql`
mutation($name:String!,$genre:String!,$authorId:ID!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
        name
        id
    }
}
`

const getBookQuery=gql`
  query($id:ID){
    book(id:$id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
}

`

export {getAuthorsQuery,getBooksQuery,addBookMutation,getBookQuery }