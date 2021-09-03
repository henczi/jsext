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

console.log(createBuilder(ROUTES).customer.customerId.contact.contactId.view.build()); // "/customer/:customerId/contact/:contactId/view"
console.log(createBuilder(ROUTES).customer.customerId.contact.contactId.view.build('--guid--', 123)); // "/customer/--guid--/contact/123/view"