# TEMPLATE FOR RETROSPECTIVE (Team 19)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Stories committed: 2 vs Stories done: 2
- Total tasks committed: 15 vs. 11 done
- Nr of hours planned: 56 vs. spent 45

**Remember**a story is done ONLY if it fits the Definition of Done:

No automated tests perfomed

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests: 2/2
  - Get ticket (customer)
  - Diplay queue (customer)

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story | # Tasks                                 | Points | Hours est. | Hours actual |
| ----- | --------------------------------------- | ------ | ---------- | ------------ |
| _#0_  | Define folder structure for server      |        | 30m        | 30m          |
| _#0_  | Planning                                |        | 1h 30m     | 1h 30m       |
| _#0_  | Define DB structure and tables          |        | 2h         | 5h           |
| _#0_  | API to select service types             |        | 2h         | 2h           |
| _#0_  | Define UI for login                     |        | 1h         | 1h           |
| _#0_  | Learning about code structure in server |        | 1h 30m     | 2h           |
| _#1_  | Ticket controllers and routes           | 3      | 30m        | 30m          |
| _#1_  | Define UI interface for ticket request  | 3      | 16m        | 2h           |
| _#1_  | Manage API to add ticket in DB          | 3      | 2h         | 2h           |
| _#1_  | Return ticket ID to customer            | 3      | 2h         | 2h           |
| _#3_  | UI elements for displaying the queue    | 5      | 3h         | 3h           |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
  - Task average Estimated: 1.4h
  - Task average Actual: 1.95h
  - Task standard deviation Estimated: 0.8h
  - Task standard deviation Actual: 1.15h
- Total task estimation error ratio: -0.3

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 0
  - Total hours spent: 0
  - Nr of automated unit test cases: 0
  - Coverage (if available): Not available
- E2E testing:
  - Total hours estimated: 0
  - Total hours spent: 2h (Included in related tasks)
- Code review
  - Total hours estimated: 0
  - Total hours spent: 2h (Included in "Learing about code structure in server" task)

## ASSESSMENT

- What caused your errors in estimation (if any)?
- Lack of experience with the project
- Differences in code structure and style
- Lack of knowledge of the technologies used
- Need to fix minor bugs in the code

- What lessons did you learn (both positive and negative) in this sprint?

  - Organization of the project is very important when working in a team
  - Communication is key to avoid misunderstandings
  - It is important to have a clear idea of the project before starting to work on it
  - Estimation is very important to avoid overloading the team, and it's hard to do it right
  - Sharing problems and doubts is important to avoid wasting time

- Which improvement goals set in the previous retrospective were you able to achieve?
- Which ones you were not able to achieve? Why?

  - No previous retrospective

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - No next spint

> Propose one or two

- One thing you are proud of as a Team!!
  - We managed to get the project running and to get the first features working
  - We manged to work together as a team and to communicate well
