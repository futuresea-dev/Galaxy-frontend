import { createServer, Response } from "miragejs"

export const mockServer = () =>
  createServer({
    routes() {
      this.urlPrefix = import.meta.env.VITE_API_URL
      this.timing = 1000

      this.post("/login/sign-in", (schema, request) => {
        const body = JSON.parse(request.requestBody)

        if (body.username !== "user") {
          return new Response(401, { some: "header" }, { errors: ["name cannot be blank"] })
        }

        return {
          accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc5NTgyOTEsInN1YiI6MSwiaXNzIjoibG9jYWxob3N0IiwiYXVkIjoibG9jYWxob3N0IiwiaWF0IjoxNjQ3OTU3NjkxfQ.Wnwubc5x-lyxtN9srvXkLtT3m6yZTWJh-Q5wsTqPgDE",
          expirationMinutes: 1,
        }
      })

      this.post("/login/refresh-token", () => {
        // return new Response(401, { some: "header" }, { errors: ["name cannot be blank"] })
        return {
          accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc5NTgyOTEsInN1YiI6MSwiaXNzIjoibG9jYWxob3N0IiwiYXVkIjoibG9jYWxob3N0IiwiaWF0IjoxNjQ3OTU3NjkxfQ.Wnwubc5x-lyxtN9srvXkLtT3m6yZTWJh-Q5wsTqPgDE",
          expirationMinutes: 1,
        }
      })

      this.get("/user/info", () => {
        return {
          userId: 1,
          firstName: "John",
          lastName: "Doe",
          companyEmail: "neco@neco.cz",
          img: "https://breakingpoint.gg/wp-content/uploads/2022/01/user.png",
        }
      })

      this.post("/user/record-progress", () => {
        return {
          meeting: {
            investment: [
              {
                year: 2022,
                month: 9,
                recordsCount: 10,
                recordsGoal: 25,
              },
              {
                year: 2022,
                month: 8,
                recordsCount: 13,
                recordsGoal: 25,
              },
            ],
            person: [
              {
                year: 2022,
                month: 9,
                recordsCount: 10,
                recordsGoal: 25,
              },
              {
                year: 2022,
                month: 8,
                recordsCount: 13,
                recordsGoal: 25,
              },
            ],
            property: [
              {
                year: 2022,
                month: 9,
                recordsCount: 10,
                recordsGoal: 25,
              },
              {
                year: 2022,
                month: 8,
                recordsCount: 13,
                recordsGoal: 25,
              },
            ],
            vehicle: [
              {
                year: 2022,
                month: 9,
                recordsCount: 10,
                recordsGoal: 25,
              },
              {
                year: 2022,
                month: 8,
                recordsCount: 13,
                recordsGoal: 25,
              },
            ],
            pension: [
              {
                year: 2022,
                month: 9,
                recordsCount: 10,
                recordsGoal: 25,
              },
              {
                year: 2022,
                month: 8,
                recordsCount: 13,
                recordsGoal: 25,
              },
            ],
            loan: [
              {
                year: 2022,
                month: 9,
                recordsCount: 10,
                recordsGoal: 25,
              },
              {
                year: 2022,
                month: 8,
                recordsCount: 13,
                recordsGoal: 25,
              },
            ],
            industry: [
              {
                year: 2022,
                month: 9,
                recordsCount: 10,
                recordsGoal: 25,
              },
              {
                year: 2022,
                month: 8,
                recordsCount: 13,
                recordsGoal: 25,
              },
            ],
          },
          openingRecord: [
            {
              year: 2021,
              month: 12,
              recordsCount: 40,
              recordsGoal: 50,
            },
            {
              year: 2022,
              month: 8,
              recordsCount: 33,
              recordsGoal: 50,
            },
            {
              year: 2022,
              month: 9,
              recordsCount: 22,
              recordsGoal: 50,
            },
          ],
        }
      })

      this.get("/user/last-records/:userId", () => {
        return {
          investment: {
            name: "Jan Novák",
            date: "20.04.2002",
            finished: false,
            id: 1,
          },
          person: {
            name: "Jan Novák",
            date: "20.04.2002",
            finished: true,
            id: 1,
          },
          property: {
            name: "Jan Novák",
            date: "20.04.2002",
            finished: false,
            id: 1,
          },
          vehicle: {
            name: "Jan Novák",
            date: "20.04.2002",
            finished: false,
            id: 1,
          },
          pension: {
            name: "Jan Novák",
            date: "20.04.2002",
            finished: false,
            id: 1,
          },
          loan: {
            name: "Jan Novák",
            date: "20.04.2002",
            finished: false,
            id: 1,
          },
          industry: {
            name: "Jan Novák",
            date: "20.04.2002",
            finished: false,
            id: 1,
          },
        }
      })

      this.passthrough()
    },
  })
