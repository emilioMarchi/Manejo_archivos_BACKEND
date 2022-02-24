const fs = require('fs').promises

class Container {
    
    getAllProducts = async () => {
        try{
            const data = await fs.readFile('./uploads/products.json', 'utf8')
            const dataParse = JSON.parse(data)
            return dataParse
        }
        catch{
            console.error('error')
        }
    }
    getId = async () => {
        try{
            const products = await this.getAllProducts()
            let count = products.length++

            products.map((item)=>{
                if(count === item.id) {
                    count ++
                } else {}
            })
            return count
        }
        catch{
            console.error('error id')
        }
    }

    save = async ({title, price, description}) => {
        try{
            const products = await this.getAllProducts()
            const id = await this.getId()
            const obj = {
                id,
                title,
                price,
                description,
                'date' : Date()
            }
            products.push(obj)
            fs.writeFile('./uploads/products.json', JSON.stringify(products))
            return id
        }
        catch(err){console.log(err)}
    }
    getById = async (i) => {
        try{
            const products = await this.getAllProducts()
            const product = products.find(item => item.id == i)
            if(product===undefined){
                return null
            } else{
                return product 
            }
        }
        catch{
            return null
        }
 }
    deleteById = async (i) => {
       try{
        const products = await this.getAllProducts()
        if(products.length !== 0 || products.length !== undefined){
            const product = await this.getById(i)
            if(!product){
                console.log('The operation could not be completed')
            } 
            else if (product.id==i) {
                const array = products.filter((item)=>{
                    if(item.id!==i){
                        return item
                    } else {}
                })
                fs.writeFile('./uploads/products.json', JSON.stringify(array))
                .then(res => console.log('Product removed'))
                .catch(err => console.log(err))
            }else {console.log('algo paso')}
        }
        else{console.log('error')}
       } 
       catch(err){
        console.log(err)
       }
    }
    deleteAll = async () => {
        const array = []
        fs.writeFile('./uploads/products.json', JSON.stringify(array))
        .then(()=>{console.log('Delete all')})
    }
}

const container = new Container()

module.exports = container