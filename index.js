const container = require('./middlewares/container.js')

const product = new Promise((res,rej) => { 
    res({
        title: 'title',
        price: 222,
        description: 'description' 
    })
})
product.then(async(res)=>{
    try{
            const obj = res
            await container.save(obj)
            return obj
        }
        catch{console.error('error save')}
    })
.then(async(res)=>{
    const id = await container.save(res)
    return id
})
.then(async(res)=>{
    const obj = await container.getById(res)
    if(obj!==undefined){
        return obj
    }else{}
})
.then((res)=>{
    if(res){
        console.log(res)
        setTimeout(()=>{
            container.deleteById(res.id)
        }, 1000)
    }else{}
})
.then(()=>{
    setTimeout(async()=>{
        const all = await container.getAllProducts()
        console.log(all)
    }, 2000)
})
.then(()=>{
    setTimeout(async()=>{
        await container.deleteAll()
    }, 3000)
})