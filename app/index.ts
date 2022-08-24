import {setupServer, NODE_ENV} from "./setup";
import ACCROLLUPCore from "./ACCROLLUP-core";

if (NODE_ENV === "develop") {
  setupServer();
}

//TODO: properly setup ACCROLLUP core object that can be used throughout the app
export const ACCROLLUPCorePromise = ACCROLLUPCore.create({
  ACCROLLUPContract: {}, 
  from: "0x0",
  web3: {}
});
export * from "./setup";
export * from './modules';
export * from './lib';
export * from "./constants";
