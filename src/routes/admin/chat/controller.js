const autoBind = require('auto-bind');

module.exports = new class{
    constructor(){
        autoBind(this);
        this.users = [];
    }

    showPage(req,res){
        res.render('pages/admin/chat/chat')
    }

    showRoomPage(req,res){

        res.render('pages/admin/chat/chatRoom')
    }

    connectToSocket(io){
        io.on('connection',(socket)=>{

            socket.on('join',(query,cb)=>{
                if(query.room == '' | !query.room){
                    cb('room not found')
                }else{
                    socket.join(query.room); // create section
                    this.userRemove(socket.id); // remove from all forum
                    this.usersJoin(socket.id,query.user,query.room) // join to forum
                
                    io.to(query.room).emit('userList',this.userList(query.room)) //join to section and send online users
                
                    socket.emit('chat-message',this.generateMessage('welcome to chat','admin'))
            
                    socket.broadcast.to(query.room).emit('chat-message',this.generateMessage(`${query.user} join`,'admin'))
                
                    cb();
                }
            })

            socket.on('chat-message',(msg)=>{
                const user = this.getUser(socket.id);

                if(user)
                    io.to(user.room).emit('chat-message',this.generateMessage(msg.message,msg.sender))
            })
        
            socket.on('disconnect',()=>{
                const user = this.getUser(socket.id);
                this.userRemove(socket.id);

                if(user){
                    io.to(user.room).emit('userList', this.userList(user.room))
                    io.to(user.room).emit('chat-message', this.generateMessage(`${user.name} left`,'admin'))
                }

            })
        })
    }

    userRemove(id){
        
        this.users = this.users.filter(user => user.id != id);

    }

    usersJoin(id,name,room){
        const user = {id,name,room};
        this.users.push(user);
    }

    userList(room){
        const users = this.users.filter(user => user.room == room);
        const usernames = users.map(user => user.name);
        
        return usernames;
    }

    generateMessage(message,sender){
        return{
            message,
            sender
        }
    }

    getUser(id){
        const user = this.users.filter(user => user.id === id)[0];
        return user;
    }



}