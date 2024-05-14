import { APIGatewayEvent, Context } from "aws-lambda";
import { main } from "./handler";

debugger;

main(
  {
    body: JSON.stringify({ inputName: "weather" }),
  } as APIGatewayEvent,
  {} as Context
).catch((e) => {
  console.error(e);
  debugger;
});
