# Introduction

ClassChat is an education based web application designed around allowing students to ask and answer questions anonymously. One key issue on the topic is that many people will not ask questions in front of other students. Students will go as far as not asking questions and never knowing the answer. Most of the time teachers will prefer a lively class but most students will not participate because they are shy, have anxiety, or just because they are with others (Ray, K et. al, 2014). Most students will not be able to learn if they do not ask questions. Questions are a big part of learning. With our project, we hope to be able to give students a way in which they can ask questions without worrying about their anxiety and to make it enjoyable in the process.

# Storyboard

# Functional Requirements

1. As a student, I want to be able to anonymously send messages.

   **Example 1**
   
   Given: The user is in a group.
   
   Given: A feed of group data is available.
   
   Given: The user is able to send messages.
   
   When: The user clicks "Send Silently" in a group.
   
   Then: The user's message will be posted in the group without their name attached to it.


   **Example 2**
   
   Given: A feed of users is available.
   
   When: The user clicks "Send Silently" in a private DM.
   
   Then: The user's message will be posted in a private, 1:1, message without their name attached to it.
   

2. As a student, I want to be able to manage the groups I am in.
   
   **Example 1**
   
   Given: A feed of group data is available.
   
   When: The user clicks "Join Group" on a group.
   
   Then: The user will be added to the group's list of members.
   
   Then: The group will be added to the user's list of groups.
   

   **Example 2**
   
   Given: A feed of group data is available.
   
   When: The user clicks "Create Group" on the "Groups" menu.
   
   Then: The a group will be created with the specified information.
   
   Then: The user will be added to the group as the owner.
   

3. As a student, I want to be able to use a school account.
   
   **Example 1**
   
   Given: A feed of account data is available.
   
   When: The user clicks "Create Account"
   
   When: The user provides an email ending in ".edu".
   
   Then: An account will be generated with the provided information.
   

   **Example 2**
   
   Given: A feed of account data is available.
   
   When: the user clicks "Create Account"
   
   When: The user provides an email that does not end in ".edu"
   
   Then: The user will be prompted to use an email that ends in ".edu"
   

   **Example 3**
   
   Given: A feed of account data is available.
   
   Given: The user has previously created an account.
   
   When: The user enters their email and password.
   
   When: The user clicks "Sign In".
   
   Then: The user will be signed into their account.


# Class Diagram

# Project Roles

Project Manager/Security Analyst: Chase Lambrinides

Software Architect: Colton Dalton

Software Developer/Designer: Alex Balogh


# Github Project

[https://github.com/users/AlexBalogh1933/projects/1/views/1](https://github.com/users/AlexBalogh1933/projects/1/views/1)


# References

Ray, K., Downs, D., Vey, H., Azmy, K., & Squires, A. (2014). Problem description (overview) - wordpress.com. maxliboiron. Retrieved March 8, 2023, from https://maxliboiron.files.wordpress.com/2014/12/anonimity-and-classroomparticipation.pdf
