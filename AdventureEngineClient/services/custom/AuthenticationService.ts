//This service is used instead of the user service for login/registration workflows
//to hit the separated endoints on the backend, which also need to deal with special
//password and session logic. There are no associated queries for users since the
//relevant actions will only be hit during initial access with no need for re-querying

import { type User } from "../../types/appTypes/appTypes";


export async function registerUser(username: string, password: string): Promise<null> {
   try {
      const response = await fetch("http://localhost:8080/register", {
         method: "POST", 
         headers: {"Content-Type": "application/json"}, 
         body: JSON.stringify({
            Attributes: {
               Username: username,
               Password: password
            },
            Relationships: {
               OneToMany: {},
               ManyToOne: {}
            }
         } as User)
      });
      const returnObj = await response.json();
      return returnObj;
   }
   catch (errors) {
      throw errors
   }
}

