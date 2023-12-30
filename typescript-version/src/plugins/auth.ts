import { createAuth } from 'vue-auth3'
import driverAuthBearer from 'vue-auth3/drivers/auth/bearer'
import driverHttpFetch from 'vue-auth3/drivers/http/fetch'

export const auth = createAuth({
  // plugins: {router},
  fetchData: {
    enabled: true, // send a request to `/api/user` if the user information stored in the cookie is not visible
    cache: true, //save user information to localStorage for use
    enabledInBackground: true, // refresh user information in the background
  },
  refreshToken: {
    enabled: false, // refresh token in goto page
    enabledInBackground: true, // refresh token in background
  },
  drivers: {
    http: driverHttpFetch,
    auth: driverAuthBearer,
  },
})
