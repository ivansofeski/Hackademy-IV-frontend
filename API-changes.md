# API Changes On the backend

## Projects:
- The organization ID in the project API is the ID of the organization (a number field), it is a foreign key linking to the primary key in the organization table.
- We need a server side filter to the project list, so that we request only closed projects and only active projects. Please note that the closed/open should follow the definition of closed projects according the product owner.



## activities:
- add the project ID, not the projectNumber(see projects above), to the activity fields.
- We need to get all the activities of a project by the id of the project, not by the projectId.


## organizations: 
- we look at the interface when the backend is ready for them.