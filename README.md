# Ecommerce-platform-with-MERN

=========================== Back End : ===========================

## Run Locally

Clone the project

```bash
  git clone https://github.com/AyoubMoustahfid/Ecommerce-platform-with-MERN
```

Go to the project directory

```bash
  cd Ecommerce-platform-with-MERN
```

Install dependencies

```bash
  npm install
```

Start the server

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
| `id` && `userId`     | `string` | **Required**. Id and userId and userId of item to fetch |

#### Get all user  

```http
  GET /api/all_user/${:userId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `uderId` | `string` | **Required**. userId and userId of item to fetch |

#### Get all user just role = "SELLER"

```http
  GET /api/all_user_seller/${:userId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `uderId` | `string` | **Required**. userId of item to fetch |

#### Get: find user by Id

```http
  GET /api/find/${:id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id and userId of item to fetch |


#### Get Déconnexion

```http
  GET /api/signout
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

## API Reference ( Adsence ) /api/adsence

#### Get all adsence

```http
  GET /api/adsence/getAll
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get all adsence by limit

```http
  GET /api/adsence/get
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Create New Adsence

```http
  POST /api/adsence/add
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Delete Adsence by Id

```http
  DELETE /api/adsence/delete/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of item to fetch |

## API Reference ( Braintree Payment Method ) /api/braintree

[Documentation](https://www.braintreepayments.com/)


#### Get Token braintree

```http
  POST /api/braintree/getToken/${:userId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. userId of item to fetch |

#### Create purchase

```http
  POST /api/braintree/purchase/${:userId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. userId of item to fetch |



