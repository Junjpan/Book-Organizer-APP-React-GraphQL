
const express=require('express');
const graphqlHTTP=require('express-graphql');
const schema=require('./schema/schema');
const mongoose=require('mongoose');


require('dotenv').config();

const app=express();

mongoose.connect(process.env.DBA_URL,{useNewUrlParser:true,useUnifiedTopology:true})

mongoose.connection.once('open',()=>{
        console.log('connect to MongoDB');
    
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true //mean we'll use graphiql tool when we go to the /graphql
}));

app.listen(4000,()=>{
    console.log('listening on port 4000 ')
})