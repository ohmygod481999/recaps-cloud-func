const { gql } = require("apollo-server-express");

const schema = gql`
    type UserMetadata {
        creationTime: String
        lastSignInTime: String
        lastRefreshTime: String
    }

    type CustomClaims {
        isAdmin: Boolean
    }

    type MutationResponse {
        data: String
    }

    type UserRecord {
        uid: String
        email: String
        displayName: String
        phoneNumber: String
        emailVerified: Boolean
        photoURL: String
        disabled: Boolean
        metadata: UserMetadata
        customClaims: CustomClaims
    }


    type Query {
        "A simple type for getting started!"
        userRecord(uid: String!): UserRecord
    }

    type Mutation {
        grantAdminRole(uid: String!): MutationResponse
    }
`;

module.exports = schema;
