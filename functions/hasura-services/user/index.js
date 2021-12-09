const { gql } = require("apollo-boost");
const apolloClient = require("../apollo-client");

const insertUser = (firebase_uid) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation insertUser($firebase_uid: String!) {
                insert_user(objects: { firebase_uid: $firebase_uid }) {
                    returning {
                        firebase_uid
                        id
                    }
                }
            }
        `,
        variables: {
            firebase_uid,
        },
    });
};

exports.insertUser = insertUser;
