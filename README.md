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
## Deploy()

```
npm install -g serverless
sls deploy
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
