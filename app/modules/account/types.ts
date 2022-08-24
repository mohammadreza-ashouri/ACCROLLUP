import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} from "graphql";
import {Account} from "./";

export const AccountType = new GraphQLObjectType({
  name: "account",
  description: "Account Type",
  isTypeOf: account => account instanceof Account,
  fields: () => ({
    address: {
      type: GraphQLString,
    },
    nonce: {
      type: GraphQLInt,
    },
    balance: {
      type: GraphQLFloat,
    },
    signers: {
      type: GraphQLList(GraphQLString),
    },
  }),
});


export const GetAccountInput = {
  address: {
    type: GraphQLString
  },
};

export const PutAccountInput = {
  address: {
    type: GraphQLString,
  },
  initialSigningKey: {
    type: GraphQLString,
  },
  balance: {
    type: GraphQLFloat,
  }
};
