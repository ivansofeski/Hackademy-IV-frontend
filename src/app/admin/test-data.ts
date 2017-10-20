/*
 * Use this object when testing components that depend on data from injected services.
 * 
 * Available properties
 *   orgList: the organizations list
 *   projectList: the project list
 *   activitiesList: the activities list
 *   donorList: the list of donors.
 * 
 * Example usage:
 * 
 * In the following code, in the beforeEach() function of the unit test file, we are getting
 * the service from the injector, and spying on the appropriate property, then returning the 
 * value from the test data instead of getting the data from the server. 
 * 
  
  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationPageComponent);
    component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let orgSpy = spyOn(dataService,'getOrganizations').and.returnValue(Observable.of(testData.orgList));
  });
 
 * As we know the test data, we now know how the component should behave, and we can test that.
 * 
 */

export const testData = {
    orgList: [
        {
            "id": 1,
            "orgId": "J67P24-cUKb",
            "name": "Unicef",
            "address": "Främsteby Karlsborg 3, 28236, Malmö",
            "contact": {
                "phone": "046-8807494",
                "email": "support@orten.io",
                "person": "Ivan"
            },
            "password": "@#aaOB23WEpp!",
            "billing": "5569-9339-5553-5681",
            "description": "Hello compassionate hyena one up infectiously scowled octopus one far walrus goodness as gosh when inclusively lenient husky this bluebird underneath this where more jeepers under thoughtful."
        },
        {
            "id": 2,
            "orgId": "biSarl-6a3t",
            "name": "Red Cross",
            "address": "Norrfjäll 58, 26215, Goteborg",
            "contact": {
                "phone": "016-4859091",
                "email": "support@jayway.com",
                "person": "Olaf"
            },
            "password": "qwerty@#45",
            "billing": "4572-6569-8361-8819",
            "description": "Far more some goodness alas hello jeepers hello amongst jeepers seagull anathematically well drove more one bound through while much in however overshot strived orca in burned showed however by."
        },
        {
            "id": 3,
            "orgId": "lScbkv-Ilz6",
            "name": "Remotion",
            "address": "Stockton Street, Broadlands",
            "contact": {
                "phone": "(826) 410-3649",
                "email": "mcbridewise@remotion.com",
                "person": "Ballard Petty"
            },
            "password": "59d6277005660094ca1d8150",
            "billing": "5569-9339-5553-5681",
            "description": "proident exercitation aute enim aliqua cupidatat culpa eu ex et"
        },
        {
            "id": 4,
            "orgId": "hW732U-HIyG",
            "name": "Exodoc",
            "address": "Albemarle Road, Edneyville",
            "contact": {
                "phone": "(855) 465-2981",
                "email": "ballardpetty@exodoc.com",
                "person": "Alford Reed"
            },
            "password": "59d6277096e63b3d91f79c5e",
            "billing": "4572-6569-8361-8819",
            "description": "consequat ut ea nisi cupidatat excepteur aute excepteur ex id"
        },
        {
            "id": 5,
            "orgId": "wyzNls-bkTb",
            "name": "Talent without Borders",
            "address": "Törneby 41, Landskrona",
            "contact": {
                "phone": "(855) 465-2981",
                "email": "ballardpetty@exodoc.com",
                "person": "Alford Reed"
            },
            "password": "59d6277096e63b3d91f79c5e",
            "billing": "4485-8777-8550-8000",
            "description": "consequat ut ea nisi cupidatat excepteur aute excepteur ex id"
        },
        {
            "id": 6,
            "orgId": "FJn5Ka-x4zj",
            "name": "Imnseta",
            "address": "Verdandi Gränd 33, Ömeå",
            "contact": {
                "phone": "(855) 465-2981",
                "email": "ballardpetty@exodoc.com",
                "person": "Alford Reed"
            },
            "password": "59d6277096e63b3d91f79c5e",
            "billing": "4453-2514-0591-1130",
            "description": "consequat ut ea nisi cupidatat excepteur aute excepteur ex id"
        },
        {
            "id": 7,
            "orgId": "iWVGUT-cyQv",
            "name": "Do it!",
            "address": "Ellenö 76, Helsinborg",
            "contact": {
                "phone": "(855) 465-2981",
                "email": "ballardpetty@exodoc.com",
                "person": "Alford Reed"
            },
            "password": "59d6277096e63b3d91f79c5e",
            "billing": "4402-0071-4599-0684",
            "description": "consequat ut ea nisi cupidatat excepteur aute excepteur ex id"
        },
        {
            "id": 8,
            "orgId": "ZXP8qn-XSPJ",
            "name": "Get rythem",
            "address": "Klinta 43, Käglinge",
            "contact": {
                "phone": "(855) 465-2981",
                "email": "ballardpetty@exodoc.com",
                "person": "Alford Reed"
            },
            "password": "59d6277096e63b3d91f79c5e",
            "billing": "4916-0053-9151-3102",
            "description": "consequat ut ea nisi cupidatat excepteur aute excepteur ex id"
        }
    ],
    projectList: [
        {
            "id": 1,
            "projectName": "Childrens Rights",
            "fromDate": "2017/09/01",
            "toDate": "2017/12/01",
            "location": {
                "lat": 55.607543,
                "lng": 13.002294
            },
            "address": "Hamngatan 10",
            "neededFunding": 1000,
            "raisedFunding": 550,
            "description": "Litora sed purus lorem vel quam sagittis euismod lacinia mattis nec, habitasse nunc lorem vivamus torquent suspendisse ac aenean leo consectetur taciti, donec sociosqu dictumst mollis vivamus nam aliquet nibh vestibulum magna mauris duis nulla fermentum enim convallis, ipsum urna curabitur netus et etiam, suspendisse ligula volutpat fames aenean.",
            "mainImage": "./assets/photos/project001/main/001.jpg",
            "images": [
                "./assets/photos/project001/main/001.jpg",
                "./assets/photos/project001/main/002.jpg",
                "./assets/photos/project001/main/003.jpg"
            ],
            "projectManager": "Mats Nilsson",
            "projectId": "001",
            "organizationName": "Red Cross",
            "organizationId": 2,
            "open": "true"
        },
        {
            "id": 2,
            "projectName": "Climate changes in Sweden",
            "fromDate": "2017/09/15",
            "toDate": "2017/11/15",
            "location": {
                "lat": 55.607495,
                "lng": 12.999504
            },
            "address": "Kompanigatan 1",
            "neededFunding": 1000,
            "raisedFunding": 380,
            "description": "Litora sed purus lorem vel quam sagittis euismod lacinia mattis nec, habitasse nunc lorem vivamus torquent suspendisse ac aenean leo consectetur taciti, donec sociosqu dictumst mollis vivamus nam aliquet nibh vestibulum magna mauris duis nulla fermentum enim convallis, ipsum urna curabitur netus et etiam, suspendisse ligula volutpat fames aenean.",
            "mainImage": "./assets/photos/project002/main/001.jpg",
            "images": [
                "./assets/photos/project002/main/001.jpg",
                "./assets/photos/project002/main/002.jpg",
                "./assets/photos/project002/main/003.jpg"
            ],
            "projectManager": "Johan Ericsson",
            "projectId": "002",
            "organizationName": "Unicef",
            "organizationId": 1,
            "open": "true"
        },
        {
            "id": 3,
            "projectName": "Human Rights in Malmö",
            "fromDate": "2017/09/01",
            "toDate": "2017/12/01",
            "location": {
                "lat": 55.605556,
                "lng": 13.001264
            },
            "address": "Storetorget 5",
            "neededFunding": 2000,
            "raisedFunding": 400,
            "description": "Litora sed purus lorem vel quam sagittis euismod lacinia mattis nec, habitasse nunc lorem vivamus torquent suspendisse ac aenean leo consectetur taciti, donec sociosqu dictumst mollis vivamus nam aliquet nibh vestibulum magna mauris duis nulla fermentum enim convallis, ipsum urna curabitur netus et etiam, suspendisse ligula volutpat fames aenean.",
            "mainImage": "./assets/photos/project003/main/001.jpg",
            "images": [
                "./assets/photos/project003/main/001.jpg",
                "./assets/photos/project003/main/002.jpg",
                "./assets/photos/project003/main/003.jpg"
            ],
            "projectManager": "Mats Nilsson",
            "projectId": "003",
            "organizationName": "Remotion",
            "organizationId": 3,
            "open": "true"
        },
        {
            "id": 4,
            "projectName": "Education for adults",
            "fromDate": "2017/09/15",
            "toDate": "2017/11/15",
            "location": {
                "lat": 55.606210,
                "lng": 13.006070
            },
            "address": "Östergatan 4",
            "neededFunding": 1000,
            "raisedFunding": 700,
            "description": "Litora sed purus lorem vel quam sagittis euismod lacinia mattis nec, habitasse nunc lorem vivamus torquent suspendisse ac aenean leo consectetur taciti, donec sociosqu dictumst mollis vivamus nam aliquet nibh vestibulum magna mauris duis nulla fermentum enim convallis, ipsum urna curabitur netus et etiam, suspendisse ligula volutpat fames aenean.",
            "mainImage": "./assets/photos/project004/main/001.jpg",
            "images": [
                "./assets/photos/project004/main/001.jpg",
                "./assets/photos/project004/main/002.jpg",
                "./assets/photos/project004/main/003.jpg"
            ],
            "projectManager": "Johan Ericsson",
            "projectId": "004",
            "organizationName": "Exodoc",
            "organizationId": 4,
            "open": "true"
        },
        {
            "id": 5,
            "projectName": "Brighten my home",
            "fromDate": "2017/09/15",
            "toDate": "2017/10/01",
            "location": {
                "lat": 55.606210,
                "lng": 13.006070
            },
            "address": "Östergatan 4",
            "neededFunding": 1000,
            "raisedFunding": 700,
            "description": "Litora sed purus lorem vel quam sagittis euismod lacinia mattis nec, habitasse nunc lorem vivamus torquent suspendisse ac aenean leo consectetur taciti, donec sociosqu dictumst mollis vivamus nam aliquet nibh vestibulum magna mauris duis nulla fermentum enim convallis, ipsum urna curabitur netus et etiam, suspendisse ligula volutpat fames aenean.",
            "mainImage": "./assets/photos/project005/main/001.jpg",
            "images": [
                "./assets/photos/project005/main/001.jpg",
                "./assets/photos/project005/main/002.jpg",
                "./assets/photos/project005/main/003.jpg"
            ],
            "projectManager": "Mia Larsson",
            "projectId": "005",
            "organizationName": "Talent without Borders",
            "organizationId": 5,
            "open": "false"
        },
        {
            "id": 6,
            "projectName": "More green, More Life",
            "fromDate": "2017/09/15",
            "toDate": "2017/10/15",
            "location": {
                "lat": 55.606210,
                "lng": 13.006070
            },
            "address": "Östergatan 4",
            "neededFunding": 1000,
            "raisedFunding": 1000,
            "description": "Litora sed purus lorem vel quam sagittis euismod lacinia mattis nec, habitasse nunc lorem vivamus torquent suspendisse ac aenean leo consectetur taciti, donec sociosqu dictumst mollis vivamus nam aliquet nibh vestibulum magna mauris duis nulla fermentum enim convallis, ipsum urna curabitur netus et etiam, suspendisse ligula volutpat fames aenean.",
            "mainImage": "./assets/photos/project006/main/001.jpg",
            "images": [
                "./assets/photos/project006/main/001.jpg",
                "./assets/photos/project006/main/002.jpg",
                "./assets/photos/project006/main/003.jpg"
            ],
            "projectManager": "Johan Ericsson",
            "projectId": "006",
            "organizationName": "Imnseta",
            "organizationId": 6,
            "open": "false"
        },
        {
            "id": 7,
            "projectName": "Rusty Cage",
            "fromDate": "2017/02/21",
            "toDate": "2017/06/01",
            "location": {
                "lat": 55.606210,
                "lng": 13.006070
            },
            "address": "Östergatan 4",
            "neededFunding": 1500,
            "raisedFunding": 1500,
            "description": "Litora sed purus lorem vel quam sagittis euismod lacinia mattis nec, habitasse nunc lorem vivamus torquent suspendisse ac aenean leo consectetur taciti, donec sociosqu dictumst mollis vivamus nam aliquet nibh vestibulum magna mauris duis nulla fermentum enim convallis, ipsum urna curabitur netus et etiam, suspendisse ligula volutpat fames aenean.",
            "mainImage": "./assets/photos/project007/main/001.jpg",
            "images": [
                "./assets/photos/project007/main/001.jpg",
                "./assets/photos/project007/main/002.jpg",
                "./assets/photos/project007/main/003.jpg"
            ],
            "projectManager": "Johnny Cash",
            "projectId": "007",
            "organizationName": "Do it!",
            "organizationId": 7,
            "open": "false"
        },
        {
            "id": 8,
            "projectName": "In the garden",
            "fromDate": "2017/09/15",
            "toDate": "2018/01/15",
            "location": {
                "lat": 55.606210,
                "lng": 13.006070
            },
            "address": "Östergatan 4",
            "neededFunding": 9000,
            "raisedFunding": 3000,
            "description": "Litora sed purus lorem vel quam sagittis euismod lacinia mattis nec, habitasse nunc lorem vivamus torquent suspendisse ac aenean leo consectetur taciti, donec sociosqu dictumst mollis vivamus nam aliquet nibh vestibulum magna mauris duis nulla fermentum enim convallis, ipsum urna curabitur netus et etiam, suspendisse ligula volutpat fames aenean.",
            "mainImage": "./assets/photos/project008/main/001.jpg",
            "images": [
                "./assets/photos/project008/main/001.jpg",
                "./assets/photos/project008/main/002.jpg",
                "./assets/photos/project008/main/003.jpg"
            ],
            "projectManager": "Elvis",
            "projectId": "008",
            "organizationName": "Get rythem",
            "organizationId": 8,
            "open": "true"
        },
        {
            "id": 9,
            "projectName": "The One Rose",
            "fromDate": "2016/09/03",
            "toDate": "2018/10/09",
            "location": {
                "lat": 55.606210,
                "lng": 13.006070
            },
            "address": "Östergatan 4",
            "neededFunding": 7350,
            "raisedFunding": 2250,
            "description": "Litora sed purus lorem vel quam sagittis euismod lacinia mattis nec, habitasse nunc lorem vivamus torquent suspendisse ac aenean leo consectetur taciti, donec sociosqu dictumst mollis vivamus nam aliquet nibh vestibulum magna mauris duis nulla fermentum enim convallis, ipsum urna curabitur netus et etiam, suspendisse ligula volutpat fames aenean.",
            "mainImage": "./assets/photos/project009/main/001.jpg",
            "images": [
                "./assets/photos/project009/main/001.jpg",
                "./assets/photos/project009/main/002.jpg",
                "./assets/photos/project009/main/003.jpg"
            ],
            "projectManager": "Frank Sinatra",
            "projectId": "009",
            "organizationName": "Get rythem",
            "organizationId": 8,
            "open": "true"
        },
        {
            "id": 10,
            "projectName": "Whie vail",
            "fromDate": "2017/05/22",
            "toDate": "2017/10/04",
            "location": {
                "lat": 55.606210,
                "lng": 13.006070
            },
            "address": "Östergatan 4",
            "neededFunding": 2000,
            "raisedFunding": 2000,
            "description": "Litora sed purus lorem vel quam sagittis euismod lacinia mattis nec, habitasse nunc lorem vivamus torquent suspendisse ac aenean leo consectetur taciti, donec sociosqu dictumst mollis vivamus nam aliquet nibh vestibulum magna mauris duis nulla fermentum enim convallis, ipsum urna curabitur netus et etiam, suspendisse ligula volutpat fames aenean.",
            "mainImage": "./assets/photos/project010/main/001.jpg",
            "images": [
                "./assets/photos/project010/main/001.jpg",
                "./assets/photos/project010/main/002.jpg",
                "./assets/photos/project010/main/003.jpg"
            ],
            "projectManager": "Sara Andersson",
            "projectId": "010",
            "organizationName": "Unicef",
            "organizationId": 1,
            "open": "false"
        }
    ],
    activitiesList: [
        {
            "activityId": 1,
            "projectId":1,
            "activityTitle":"Educating children about their rights",
            "activityDescription": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            "activityDate":"2017/12/20",
            "activityImage":"./assets/photos/project001/events/001.jpg"},
        {
            "activityId": 2,
            "projectId":1,
            "activityTitle":"Educating parents how to treat their children",
            "activityDescription": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            "activityDate":"2017/12/25",
            "activityImage":"./assets/photos/project001/events/002.jpg"
        },
        {
            "activityId": 3,
            "projectId":2,
            "activityTitle":"Educating parents how to treat their children",
            "activityDescription": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            "activityDate":"2017/12/25",
            "activityImage":"./assets/photos/project001/events/002.jpg"
        }
    ],
    donorList: [
        {
            "id": 1,
            "userName": "Natasa",
            "userSlogan": "Do your home work in time",
            "userImage": "./assets/photos/userImage1.jpeg",
            "wallet": { "total": 0, "donated": 125 },
            "savedProject": [1,2,3,4]
        }
    ]
    
}