import { APIGatewayEvent, Context } from "aws-lambda";
import { main } from "./handler";

debugger;

main(
  {
    body: JSON.stringify({ inputName: "Wu Huawen" }),
  } as APIGatewayEvent,
  {} as Context
).catch((e) => {
  console.error(e);
  debugger;
});
