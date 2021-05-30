# BackToLife-Backend

# User Authentication
Get all users      :  GET        http://localhost:5000/users


Signup user        : POST        http://localhost:5000/signup


Login user         : POST        http://localhost:5000/login


Get a user         : GET         http://localhost:5000/:id


Delete a user      : DELETE      http://localhost:5000/users/:id


Logout             : GET         http://localhost:5000/logout


Get profile        : GET         http://localhost:5000/me


Activate Account   : POST        http://localhost:5000/email-activate


Remove Account     : POST        http://localhost:5000/removeAccount


Delete Random Code : POST        http://localhost:5000/deleteCode


Forgot Password    : POST        http://localhost:5000/forgotPassword


Reset Password     : PUT         http://localhost:5000/resetPassword


Sort All Users     : GET         http://localhost:5000/users/sort


Check Token        : PUT        http://localhost:5000/users/:id/checkToken

# LoginDate

Get all logins     : GET         http://localhost:5000/logins


Get a login        : GET         http://localhost:5000/logins/:id


Create login       : POST        http://localhost:5000/logins


Update login       : PUT         http://localhost:5000/logins/:id


Delete login       : DELETE      http://localhost:5000/logins/:id


Increase Counter   : PUT         http://localhost:5000/logins/:id/increaseCounter

Show Counter       : GET         http://localhost:5000/logins/:id/showCounter



### Points


Get Point          : GET          http://localhost:5000/points/:id/Point




# Request And Response Table

|                  | Requests                   | Responses                           |
|------------------| -------------------        | ------------------------------------|  
|Signup            |name,email,password         | message, register: true, rToken     |
|Activate Account  |email, randomCodeReq        |success: true                        |
|Delete Random Code|                            |success: true                        |
|Login             |email,password              |success: true,token,id,counter,unicID|
|Check Token       |myRefreshToken              |success: true, decoded               |
|Get Profile       |name,email,password         |success: true, data: user            |
|Forgot Password   |email                       |message                              |
|Reset Password    |forgotCode,email,password   |success: true                        |
|Logout            |                            |success: true, data: {}              |
|Remove Account    |email                       |success: true                        |
|Get All User      |                            |success: true, count,  data          |
|Get A User        |                            |success: true, data: user            |
|Delete A User     |                            |success: true, data: {}              |
|Sort All Users    |                            | data: {ids,names,points,imageUrls}  |
|Create Login      |user                        |success: true, data: login           |
|Get All Logins    |                            |success: true, data: logins          |
|Get A Login       |                            |success: true                        |
|Update Login      |                            |success: true, data: login           |
|Delete Login      |                            |success: true, data: {}              |
|Increase Counter  |loginDate                   |success: true, data: logins          |
|Show Counter      |                            |success: true, data: login           |
|Get Point         |email, randomCodeReq        |success: true, data: points          |
