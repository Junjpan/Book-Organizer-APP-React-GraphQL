const graphql=require('graphql');
const _=require('lodash');
const Book=require('../models/book');
const Author=require('../models/author');
//define object type
const {GraphQLObjectType,
        GraphQLString ,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
    }=graphql;



const BookType=new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},//you also can do type:GraphQLString,GraphQLID allow you use string or non-string
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent);
                //return _.find(authors,{id:parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType=new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                console.log(parent)
               // return _.filter(books,{authorId:parent.id}) //for the dummy data in the array
               return Book.find({authorId:parent.id})
            }
        }
    })
})

//initiate to jump to the graphql
const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},           
            resolve(parent,args){
//console.log(typeOf(args.id))//string                
//write code to get data from db/other source,when you pass the argument in the function, arg
             //return _.find(books,{id:args.id}) //using lodash to find the book based on the arg
             return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
               // return _.find(authors,{id:args.id});
               return Author.findById(args.id)
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({})
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
               return Author.find({})
            }
        }
    }
})

const Mutation=new GraphQLObjectType({
    name:'mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author=new Author({
                    name:args.name,
                    age:args.age
                });
             return  author.save(); //will return the saved object back
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)}, //It will not allow empty field for this argument and this argument need to be a string
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
               let book=new Book({
                   name:args.name,
                   genre:args.genre,
                   authorId:args.authorId
               });

               return book.save()
            }
        }
    }

})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})