# Ecommerce-platform-with-MERN

=========================== Back End : ===========================

## Deployment

Install my-project with npm

1- install node_modules

```bash
  npm install
```

2- Run server

```bash
  nodemon app 
```


## API Reference ( Authentification ) /api

#### Post User ( Signup ) 

```http
  POST /api/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Post User ( Signin ) 

```http
  POST /api/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Post: Connexion Vendeur ( Vendeur ) 

```http
  POST /api/buyer/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Put user to seller

```http
  PUT /api/validationSeller/${id}/${userId}
```

```javascript
exports.validateBuyer = (req, res) => {

    User.findByIdAndUpdate(req.params.id, {role: 'SELLER'})
        .exec((err, user) => {
            if(!user){
                return res.status(404).json({
                    error: 'User not found with id :' + req.params.id
                })
            }

            res.json({
                user
            })

        })
}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` && `userId`     | `string` | **Required**. Id and userId of item to fetch |


#### Put seller to Admin

```http
  PUT /api/validationAdmin/${id}/${userId}
```

```javascript
exports.validateAdmin = (req, res) => {

    User.findByIdAndUpdate(req.params.id, {role: 'ADMIN'})
        .exec((err, user) => {
            if(!user){
                return res.status(404).json({
                    error: 'User not found with id :' + req.params.id
                })
            }

            res.json({
                user
            })
        })
}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` && `userId`     | `string` | **Required**. Id and userId of item to fetch |

