## Download and install packages

```
git clone https://github.com/ryanfu0602/my-gpt-lambda.git

cd my-gpt-lambda

npm install
```

## Debug 

```
Add OPENAI key to .env file

VS Code -> Run -> Start Debugging
```
## Deploy

```
npm install -g serverless
sls deploy
```

## Test

```
https://pqghkw4cxgd7pqkas3fncvwam40kkthn.lambda-url.ap-southeast-2.on.aws/

Postman

Method: Post
Url: https://pqghkw4cxgd7pqkas3fncvwam40kkthn.lambda-url.ap-southeast-2.on.aws/
request:

Body:{
   "inputName": "吴文华"
}
```
## Files

### debug.ts

locale run and debug file

### handler.ts

lambda executable file

## serverless.yml

YAML syntax to deploy to aws lambda

### .env

openai key
