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
Postman

Method: Post
Url: https://pqghkw4cxgd7pqkas3fncvwam40kkthn.lambda-url.ap-southeast-2.on.aws/
request:

Body:{
   "inputName": "吴文华"
}
<img width="953" alt="image" src="https://github.com/ryanfu0602/my-gpt-lambda/assets/43898376/0c1d80f7-0639-408c-975b-d368e2921e72">

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
