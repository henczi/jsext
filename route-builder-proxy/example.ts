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

const GLOBAL_ROUTE_BUILDER = () => createBuilder(ROUTES);

console.log(GLOBAL_ROUTE_BUILDER().customer.customerId.contact.contactId.view.$); // "/customer/:customerId/contact/:contactId/view"
console.log(GLOBAL_ROUTE_BUILDER().customer.customerId('--guid--').contact.contactId(123).view.$); // "/customer/--guid--/contact/123/view"

const ADMIN_ROUTE_BUILDER = () => createBuilder(ROUTES.admin, { relative: true });

console.log(ADMIN_ROUTE_BUILDER().profile.$); // "profile"
console.log(ADMIN_ROUTE_BUILDER().profile.edit.$);  // "profile/edit"