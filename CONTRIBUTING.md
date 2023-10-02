# Contributing

- [How to Contribute](#how-to-contribute)
- [Development](#development)
- [Code of Conduct](#contributor-covenant-code-of-conduct)

## How to Contribute

FigLog is open to pull requests, issue reports, and questions from the community. Here are some good ways to get help if you need it.

- If you have a question, please [open a new Q&A discussion thread](https://github.com/FormidableLabs/FigLog/discussions/new?category=q-a)
- If you think you have found a bug, [open a new issue](https://github.com/FormidableLabs/FigLog/issues/new)

If you are a new contributor looking to learn more about FigLog, check out our [good first issues board](https://github.com/orgs/FormidableLabs/projects/34/views/3).

### Current goals and initiatives

We are currently working toward our first 1.0 release. As such, current features should be considered experimental and may rapidly change. Ref our [current issues](https://github.com/FormidableLabs/FigLog/issues) for more, the following are our current priorities.

- Additional settings and theme options
- Add support for choosing a changelog type
- Add support for defining a link per changelog
- Add support for exporting changelogs to a file

## Development

Reference the Figma Developers [Widget Docs](https://www.figma.com/widget-docs/) for additional information on widget development.

FigLog uses TypeScript and Bun, two modern tools for creating JavaScript applications.

### Requirements

- [Node.js](https://nodejs.org/) 16 or higher.
- [bun](https://bun.sh/) 1 or higher.

### Setup

Clone this repo:

```sh
$ git clone https://github.com/FormidableLabs/figlog.git
$ cd figlog
```

Use [bun](https://bun.sh/) to install esbuild and the latest type definitions by running:

```sh
$ bun install
```

### Builds

To build the application run:

```sh
$ bun run build
```

### Live Reload

To see code changes live and to regenerate the JavaScript build file each time you save run:

```sh
$ bun run watch
```

### Tests

To typecheck the widget run:

```sh
$ bun run tsc
```

## Contributor Covenant Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity
and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at coc@formidable.com. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 1.4, available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
