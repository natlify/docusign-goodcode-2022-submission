# DISCLOSURE

All code within this repository was written during the span of the Hackathon and the commit history supports the same claim. This peoject has borrowed heavily from developer documentation of DocuSign and ArcGIS.

However we can assure you that none of the code has been lifted from a different project/author. Nor any piece of code was written prior to this hackthon starting.

 All libraries have been used with appropriate licenses.

## List of major frameworks and libraries used

- Apart from Mantine UI no other external library has been used
- The code repository was clone from an existing project opinionted online (usage was as a template) for ease of set up
- No logic has been reused as part of this project. All of the boilerplate code have been removed altogether.

## Code References and videos

- [MyGovernment Sample App Development Process | Developer Education](https://www.youtube.com/watch?v=uiv0plgJG2M)
- [Postman API Challenge: Building a DocuSign Workflow | Developer Conference](https://www.youtube.com/watch?v=kT7paM_izdM)
- [Building best practices webhook listeners, part 1: Webhook listeners and Connect](https://www.docusign.com/blog/dsdev-webhook-listeners-part-1?utm_source=social&utm_medium=youtube)
- [Using the DocuSign REST API to Add Additional Documents to an Envelope](https://www.docusign.com/blog/dsdev-using-docusign-rest-api-add-additional-documents-envelope)
- <https://github.com/docusign/code-example-net-framework-auth-code-grant>

## Note on Mock data

- Application contains mock data either in form of JSON/ HTML
- Typically this is found in /data directories
- They were used during development phase to aid in quick coding
- None of the data are being imported or used in the application code anymore
- Evaluators are requested to ignore the presence of those mock data
- And not penalise assuming the application is not dynamic

## Note on testing deployed out project

- We are using heroku platform & supabase to host our application
- As you already may be aware, heroku is known to have cold start issues in the past
- Since our application doesn't expect traffic, while testing it may not behave as expected (for initial load)
- Supabase shuts down application if there is no activity. We will do our  best to make sure there is regular activity until evaluation is complete.
- In case any of the evaluators are facing issues in gaining access to application, please ping us on slack or email; we would resolve it on immediate basis
