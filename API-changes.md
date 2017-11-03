# API Changes On the backend

## General
- Provide a meaningful response to each request.

## Projects:
- The organization ID in the project API is the ID of the organization (a number field), it is a foreign key linking to the primary key in the organization table.
- We need a server side filter to the project list, so that we request only closed projects and only active projects. Please note that the closed/open should follow the definition of closed projects according the product owner.



## activities:
- We need to get all the activities of a project by the id of the project, not by the projectId.


## organizations: 
- we look at the interface when the backend is ready for them.