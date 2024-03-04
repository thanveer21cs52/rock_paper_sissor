const express=require("express")
const app=express()
const http=require("http")
const cors =require("cors")
const joinarr=[]
const movearr=[]
const playerlog=[]
const {Server}=require("socket.io")
const { join } = require("path")
app.use(cors())
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
         origin:"http://localhost:3000"
    }
    
});
io.on("connection",(socket)=>{
    console.log(`user id ${socket.id}`)
    socket.on("join_room",(data)=>{
        if(joinarr.length<=2){
            socket.join(data.room)
            if(joinarr.length==0){
                joinarr.push(data)
            }
            else if(joinarr.length==1){
                if(data.room===joinarr[0].room){
                    joinarr.push(data)
                    let roomdetail={
                        user1:joinarr[0].name,
                        user2:joinarr[1].name,room:joinarr[0].room,
                        roomfull:true
                    }
                    io.sockets.in(data.room).emit("room_details",roomdetail);
                    playerlog.push(roomdetail)
                    joinarr.splice(0,2)
                }
            }
        }
       
      
    })
    socket.on("message_sent",(data)=>{
        if(movearr.length==0){
            movearr.push(data)
            socket.to(data.room).emit("receive_message",{data,shake:false})
        }
        else if(movearr.length==1){
            movearr.push(data)
            socket.to(data.room).emit("receive_message",{data,shake:false})
            if(movearr.length==2){
                console.log(movearr);
                io.sockets.in(data.room).emit("start_game",{shake:true});
                movearr.splice(0,2)
                
        
            }
           
        }
      
    })
})
server.listen(3001,()=>{
    console.log("SERVER IS RUNNING")
})