// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "product-service",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      },
      "post": {
        "summary": "createProduct",
        "description": "",
        "operationId": "createProduct.post.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Create new product",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "title": {
                  "type": "string",
                  "example": "Toy"
                },
                "description": {
                  "type": "string",
                  "example": "Cool toy"
                },
                "price": {
                  "type": "integer",
                  "example": 30
                },
                "count": {
                  "type": "integer",
                  "example": 10
                },
              }
          }
          }
        ],
        
        // "parameters": [
        //   {
        //     "name": "title",
        //     "in": "body",
        //     "required": true,
        //     "title": "string"
        //   },
        //   {
        //     "name": "price",
        //     "in": "body",
        //     "required": true,
        //     "title": "number"
        //   },
        //   {
        //     "name": "description",
        //     "in": "body",
        //     "required": true,
        //     "title": "string"
        //   },
        //   {
        //     "name": "count",
        //     "in": "body",
        //     "required": true,
        //     "title": "number"
        //   },
        // ],        
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    },
    "/products/{productId}": {
      "get": {
        "summary": "getProductById",
        "description": "",
        "operationId": "getProductById.get.products/{productId}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    }
  },
  "definitions": {},
  "securityDefinitions": {},
  "host": "ii9uroeza2.execute-api.eu-west-1.amazonaws.com/dev"
};