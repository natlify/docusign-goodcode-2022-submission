## Inspiration

Being in tech for a few years now, I always asked myself the dreaded question — “Does the work I do really matter?” We as a team are always concerned about making a real life impact and ensuring that the work we do helps the people around us. The Good Code Hackathon gave us this opportunity. It opened our eyes to the fact that tech is really changing lives around the world.

We were excited to partner with Jane Goodall Institution and help out in any tiny way that we could through this Hackathon.  The problem statement really intrigued us because it was a refreshing change from the usual SaaS, crypto or deep-tech projects that we work on.

### App Idea

![The Robust Gameboy - Do you hear it?](https://static.wixstatic.com/media/c8261d_22c237bf2c35497b9d049a4755342f32~mv2.png/v1/fill/w_158,h_158,al_c/sameboy.png)
Also our application is heavily inspired by [Nintendo GameBoy.](https://www.youtube.com/watch?v=Oy8zSYKkczI) We wanted to make our application pretty straightforward, same time intriguing. [UI] has only 4 buttons but does everything it needs to do. And more than anything, a plug & play module that can take in any platform and adapt to it.

## What it does

![Highlights of Application](https://vgvkuskuhjjxyafyrwyp.supabase.co/storage/v1/object/public/bob-hub/supershot.png?t=2022-08-12T04%3A00%3A16.782Z)

### Integrates Data from ArcGIS & Survey123 in 1-Click

Happens in background, probably you won't even notice

### Generates a dynamic document and dispatches to signers

No filling of complex webforms any more. Documents within the DocuSign Envelope become validation application

### Ultra Simple UI and Most wanted intuitive flows

Provision to handle sensitive images separately. 5yo can operate this.

### In Built Security

Data doesn;’t get copied to any external servers including Zapene’s frontend. All processing happens on mediaValet and DocuSign Envelopes itself.

## How we built it

We started by putting ourselves in end users shoes. What do they seek... what is their biggest pain point.. Where can we add value. The problem statement's scope was very large ; meaning lot of areas one could potentially cover (like uploading assets to media-valet for example). However we wanted to focus on a core set of requirements that could be completed within the time-frame of the hack.

Each one in our team brought their best forward with their skils, and helped to design, plan and develop the product.

Via our project you can see the following APIs, Services and features in action. They power our app to fully achieve what it intends to do

- eSignature API
- DocuSign Templates with AutoPlace
DocuSign Auth Mechanism : JWT Grant
- Dynamic Document Addition to Envelopes created from Templates.
- DocuSign Connect for event notifications
- Click API
- Embedded Signing Mechanism
- Brand Feature from DocuSign
- Query a feature layer from ArcGIS
- SceneView API from Esri to programtically take screenshots of map

## Challenges we ran into

The biggest challenge we tackled :
We loved Power Forms for its simplicity and ease of integration, however we couldn’t extract the degree of customization we wanted to provide to our users. At the same time it was a huge task to configure everything via eSign APIs.
We knew we wanted to have the best of worlds; where we leverage the DocuSign Dashboard to do & manage configurations, at the same time without losing the customization of our documents, its format and the richness.
This way we could keep configs outside of code, (better way to manage) and not churn out a lot of code, to create workflows.
Few Other Challenges :
Adding images & Dynamically generating docs
Navigating through All SDKs’ docs & their nuances. **documentTemplateList** is an Object. but **documentTemplate** is an Array (List)!
Working with envelope drafts
Designing a system where all different platforms can work together
Working with barebones REST Api for Media Valet

## Accomplishments that we're proud of

- Our hack is much more than code. Not everyone on our team is a developer and so unlike most of the hacks ours has lesser code. We have resorted to use existing platforms and tooling without reinventing the wheel wherever possible
- Inspite of several technical challenges our team mates never shied away from reaching out for help. Being extremely introverted some of us happy and proud that others have come out of their shells.
- Our UI - This time our app interface looks slick and clean, being non-designers, we're definetly patting on each others back for that.
- Final Presentation Video - Initially we were worried about exceeding the time limit for the presentation. But we are proud that we put our heads together and re-worked on storyboard and got it under time. Someone cat stop beaming :D :D
- Turning in a submission itself feels like a big accomplishment, honestly we never thought we could come this far. Proud of reaching the finish line.

## What we learned

We explored new frontiers in this hack. One of our biggest takeaways was learning about the two mammoth platforms — Esri’s ArcGIS and DocuSign. Both have enormous developer support and extensive documentation. Although it was a bit intimidating at first, once we started going over the docs over the past week or so, we did become familiar with them slowly.

Another learning although not related to coding or building was time management and async work. All of us were distributed across time zones and had to work remotely; while managing our day jobs. We had to plan out our entire hack in such a way that we got most stuff done late at night & during weekends. We were constantly in touch through the day, collecting information and brainstorming solutions.

## What's next for Zapene

We arrived on the scene pretty late. Owing to a delayed start to the hackathon, we couldn’t fully implement all the features & ideas we planned for.

Listing a few of them down, as where to go from here :

- [ ] Batch Processing of Images
- [ ] Bug Bashing for edge cases
- [ ] Migrating to NextJS for improved performance
- [ ] Enhancing RBAC on the platform
- [ ] Supporting upload from our portal
- [ ] Adding
- [x] Automatically moving sensitive images to a Restricted Access Group on Media valet _[WIP]_
- [ ] Exploring use-cases of DocuSign Admin API for management _[WIP]_
- [ ] Using ArcGIS StoryMaps to display audit trail of a camera
