# Web Development Final Project - Neon Jazzscapes!

Submitted by: Angelo Urtula

This web app: Neon Jazzscapes is a place where fellow enjoyers of chill music, jazz, and all of jazz's iterations can come together and share albums or tracks that they want others to check out. Without signing in, users can check out the collection of recommendations that have already been posted on the app by those with an account. All users can upvote recommendations as much as they would like, as well. The list of recommendations can be sorted by most recent created or most amount of upvotes, and there's also a search bar that will dynamically change the display to include only recommendations that contain the search box input. After creating an account or logging in with an existiing account, both either through email+password or Google ID, users can post their own recommendations, including the title of the album or tracks, a quick blurb about the album and why they like it, and an image URL of the album. Logged in users can also leave comments on existing posts, edit posts that belong to them, and also delete posts that belong to them.

Time spent: **12** hours spent in total

## CodePath Required Features

The following **required** functionality is completed:


- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **optional** features are implemented:


- [x] Web app implements pseudo-authentication
  - Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
  - **or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
  - For both options, only the original user author of a post can update or delete it
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post
  - Users can repost a previous post by referencing its post ID
  - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface
  - e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [ ] Users can add more characterics to their posts
  - Users can share and view web videos
  - Users can set flags such as "Question" or "Opinion" while creating a post
  - Users can filter posts by flags on the home feed
  - Users can upload images directly from their local machine as an image file
- [ ] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## CodePath Video Walkthrough

Here's a walkthrough of implemented user stories:

![Proj 8 Demo](./Proj8.gif)


GIF created with ...  

[ScreenToGif](https://www.screentogif.com/) for Windows

## FAU Required Features

- [x] Class Required Feature: Web App Deployment (5 points)
  - Use one of the following cloud deployment sites:
  netlify, heroku,  (check for others)
    - provide your deployment URL in the github readme and submit your github repo link as part of this submission.
- [x] Class Required Feature:  Create a User Login & Signup and tie it in with Supabase backend (5 points)
  - (Login 1pt - Signup - userid/pw - 1pts - Google/Apple id - 1pt - pw reset flow - 1pt. logout 1pt)
- [x] Class Required Feature:  Use of LLM for app (5 points)
  -  Have LLM provide an overall summary of Post.  Need to provide title, description, posts, upvotes, comments. Display LLM summary in a nice way on the UI.

## Vercel App Link
[text](https://final-project-peach-eight.vercel.app/)


## FAU Video Walkthrough

![FAU Proj 8 Demo](./FAUProj8.gif)

GIF created with ...  

[ScreenToGif](https://www.screentogif.com/) for Windows


## Notes

Being the largest undertaking we've taken so far, the CSS rules required a good amount of assistance in order to make the site look presentable. Aside from that, most of the forms and routes were easy to set up with all the practice we've had over the semester. The largest hurdle to cross was correctly setting up the Supabase backend, especially with the authentication functionality. Deploying this project on Vercel was also somewhat of a struggle. I ended up running into bugs that I didn't have in a local environment, which required a lot of research to bug fix.

## License

    Copyright [2026] [Angelo Urtula]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.