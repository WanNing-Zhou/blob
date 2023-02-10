//初始化服务启动模块
const  initServer = async (app)=>{
    return new Promise((resolve, reject) => {
        const PORT = process.env.PORT || 8080;
        //服务
        app.listen(PORT,()=>{
            console.log(`Server running on http://localhost:${PORT}`);
            resolve();
        }).on('error',(error)=>{
            console.log('Server start fail:',error);
            reject();
        })

    })
}

module.exports = initServer;