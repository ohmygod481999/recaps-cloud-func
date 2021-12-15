const { UserInputError } = require("apollo-server-express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

const resolversFunctions = {
    Query: {
        userRecord: async (parent, args, context, info) => {
            const { uid } = args;
            try {
                const userRecord = await admin.auth().getUser(uid);

                functions.logger.info(userRecord, {
                    structuredData: true,
                });
                return userRecord;
            }
            catch(err){
                return null
            }

        },
    },
    Mutation: {
        grantAdminRole: async (_, { uid }, { dataSource }) => {
            const auth = admin.auth();
            const userRecord = await auth.getUser(uid);
            const customClaims = userRecord["customClaims"];
            if (customClaims && customClaims.isAdmin) {
                throw new UserInputError(
                    "This account have had admin role already"
                );
            } else {
                await auth.setCustomUserClaims(uid, {
                    isAdmin: true,
                });
                return {
                    data: "OK",
                };
            }
        },
    },
};

module.exports = resolversFunctions;
