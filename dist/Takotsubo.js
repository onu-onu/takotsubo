"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Takotsubo = void 0;
class Takotsubo {
    ENDPOINT = 'https://api.oejp-kraken.energy/v1/graphql/';
    fetchWrapper(query, variables, token) {
        return new Promise(async (resolve, reject) => {
            if (!token)
                token = '';
            try {
                let result = await fetch(this.ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": String(token)
                    },
                    body: JSON.stringify({
                        query: query,
                        variables: variables
                    }),
                });
                let jsonMsg = await result.json();
                resolve(jsonMsg);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async fetchToken(email, passwd) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = `mutation login($input: ObtainJSONWebTokenInput!) {
                    obtainKrakenToken(input: $input) {
                        token
                        refreshToken
                    }
                }`;
                const variables = { "input": { "email": email, "password": passwd } };
                const headers = {};
                let result = await this.fetchWrapper(query, variables);
                resolve(result.data.obtainKrakenToken);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async fetchData(token, accountNumber, startDate, endData) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = `
                query halfHourlyReadings(
                    $accountNumber: String!
                    $fromDatetime: DateTime
                    $toDatetime: DateTime
                ) {
                    account(accountNumber: $accountNumber) {
                        properties {
                            electricitySupplyPoints {
                                status
                                agreements {
                                    validFrom
                                }
                                halfHourlyReadings(
                                    fromDatetime: $fromDatetime
                                    toDatetime: $toDatetime
                                ) {
                                    startAt
                                    value
                                    costEstimate
                                }
                            }
                        }
                    }
                }`;
                // クエリで(startAtと同列) consumptionStep,consumptionRateBand を指定可能
                const variables = {
                    "accountNumber": accountNumber,
                    "fromDatetime": startDate,
                    "toDatetime": endData
                };
                let result = await this.fetchWrapper(query, variables, token);
                resolve(result.data.account.properties[0].electricitySupplyPoints[0].halfHourlyReadings);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.Takotsubo = Takotsubo;
