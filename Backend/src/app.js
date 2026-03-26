const express=require('express');
const aiRoutes=require('./routes/ai.routes')
const app=express();
const cors=require('cors')


app.use(express.json());
app.use(cors({
  origin: "https://ai-powered-code-reviewer-16zd.onrender.com",
  credentials: true
}));

app.get('/',(req,res)=>{
    res.send("hello world");
})
app.use('/ai',aiRoutes)


module.exports=app