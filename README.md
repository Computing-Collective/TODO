# // TODO: Tasks, Objectives, and Discussions Organized

Have you ever been annoyed by how many services you have to use to access your course information and assignments? Meet **TODO**, an easy-to-use interface that combines your Canvas assignments and messages as well as Piazza instructor posts into one.

At UBC, courses primarily use [Canvas](https://canvas.ubc.ca/) to organize course content but many also use services such as [Piazza](https://piazza.com/)/[EdStem](https://edstem.org/) for discussions, as well as [WeBWorK](https://webwork.elearning.ubc.ca/webwork2/) and [PrairieLearn](https://ca.prairielearn.com/) for assignments. Our goal is to integrate these all into a single service that anyone at UBC can use. For nwHacks 2023, we narrowed the scope to Canvas and Piazza since those are the most important and used services.

Our technology stack consists of a Python [back end](/backend) that interacts with the [Canvas API](https://canvas.instructure.com/doc/api/) as well as an [unofficial Piazza API](https://github.com/hfaran/piazza-api). The back end also syncs data with a [MongoDB](https://www.mongodb.com/) database for storing and retrieving information. Lastly, we have a React [front end](/frontend) that communicates with our custom [Flask](https://flask.palletsprojects.com/en/2.2.x/) API to retrieve and display the information to users.
