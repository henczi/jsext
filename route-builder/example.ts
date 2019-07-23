import { createBuilder } from "./route-builder";

const ROUTES = { 
  admin: { 
      profile: { 
          view: {},
          edit: {},
      } 
  }, 
  customer: { 
      contacts: { 
          paramId: { 
              __$$name: ':id', 
              view: {} 
          } 
      } 
  } 
}

console.log(createBuilder(ROUTES).admin.profile.edit.build()); // "/admin/profile/edit"