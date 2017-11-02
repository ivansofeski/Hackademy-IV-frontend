# Handover plan

## Current status

### Organizations:

#### create new organization
+ The form works and creates a new organization
+ The API works, and saves a new organization
- We do not a meaningful response from the server after saving a new organization.
- After clicking the submit button, we need to process a server request to know whether the record was saved, or we had a failure.
- We have client side validations, Backend should implement server side validations as well.

#### List organizations
+ We can list all organizations, and we can sort them on the client, but we can not filter them.
+ From the list we can click on an organization and see its details.
- Backend should allow sorting and filtering on the server.


#### organization page
+ we can show all organization fields.
- Backend does not provide an API to list the projects of an organization. we do this on the client.


#### Edit an organization
- Not implemented, and backend support is not tested.


#### Delete an organization
- Not implemented, and backend support is not tested

### Projects

#### Create a new project
+ The form works, and new projects are saved.
+ We geocode the project location from the address automatically.
- We do not have a meaningful response from the backend after sending data.
- We can not save project images because we need backend support for that.
- Backend should implement field validations on the project form.

#### Project list in Admin
+ The project list works and shows all projects. We do sorting and filtering on the client.
- Backend should allow filtering and sorting projects using multiple fields.

#### Project list in user/donor
+ We show active projects using a client side filter.
- backend should allow getting only active projects in a query.
- we use client side photos because backend does not allow saving images yet.

#### project page in user/donor.

+ Project page works
+ connection to swish works on the front end. waiting for backend support.
- Backend should support swish.

#### Editing a project

- Not implemented, but backend support was tested and works correctly.


#### Deleting a project

- Not implemented.

### Activities

#### Create a new activities

+ The form works, and new activities are saved.
+ 

#### activities page
+ we can show all activities fields.
- Backend does not provide an API to list the activities of an organization. we do this on the client.


#### Edit an activities
- Not implemented, and backend support is not tested.


#### Delete an activities
- Not implemented, and backend support is not tested

## To do