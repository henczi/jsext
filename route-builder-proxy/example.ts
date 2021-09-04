import { createBuilder } from "./route-builder";

const ROUTES = { 
  admin: { 
      profile: { 
          view: {},
          edit: {},
      } 
  }, 
  customer: {
      customerId: {
          __$$name: ':customerId', 
          contact: {
              contactId: { 
                  __$$name: ':contactId', 
                  view: {} 
              } 
          } 
      }
  } 
}

console.log(createBuilder(ROUTES).customer.customerId.contact.contactId.view.$); // "/customer/:customerId/contact/:contactId/view"
console.log(createBuilder(ROUTES).customer.customerId('--guid--').contact.contactId(123).view.$); // "/customer/--guid--/contact/123/view"