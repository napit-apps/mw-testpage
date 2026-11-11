# mehrwert.tech – Company Homepage

This repository contains the source code for the official website of  
**mehr.wert Software und IT Beratung GmbH**.

The website represents our work and perspective on sustainable software engineering, agile product development, and pragmatic tech leadership.

Live site: https://mehrwert.tech

---

# About mehr.wert
### We give IT value.<br />And your business lasting resilience.
#### We think strategically, act responsibly, and shape change with technical clarity. The results are sustainable structures, effective teams, and software with a lasting impact.

We stand for MEHR.WERT (MORE.VALUE) – and that starts with attitude.  
We support companies that not only want to keep up digitally, but also want to shape the future. As the founder of mehr.wert, I – Marcel Russ – bring over a decade of experience in software development, agile leadership, and technology support to the table.
Our mission: strategic clarity, partnership-based consulting, and technical thinking with responsibility. Together, we develop structures, teams, and solutions that work – today and tomorrow.

---

## Tech Stack

The website is built with a lightweight, performance-focused stack:
- Jekyll (static site generator)
- Dizer theme (customized)
- SCSS for styling
- GitHub Pages for hosting
- Multilingual setup (i18n)

The site intentionally avoids unnecessary complexity in favor of clarity, speed, and maintainability.

---


## Design Principles

This project follows a few clear principles:

- Performance first
- Clarity over decoration
- Accessibility-aware design
- Long-term maintainability

---

## License

The source code is provided for reference and inspiration.  
Content, branding, and design are © mehr.wert Software und IT Beratung GmbH.

---

## Contact

For questions or feedback:

Email: kontakt@mehrwert.tech  
Website: https://mehrwert.tech


## Isolated GitHub Pages test export

The source repository remains the source of truth. The separate test repository
contains only the generated files on its `main` branch.

Create a new export directory outside this repository:

```sh
python3 _scripts/build-test.py /tmp/mehrwert-pages-test
```

The command uses `_config.yml,_config.test.yml`, verifies every generated HTML
file (including both languages, blog articles, project details and archives),
requires exactly one `noindex, nofollow` meta tag inside each `<head>`, and rejects
active `robots.txt` crawling restrictions. It omits the production `CNAME` and
adds `.nojekyll`. Copy the complete directory contents, including `.nojekyll`,
to the separate test repository. The command does not commit, push or deploy.
It refuses existing output directories to avoid overwriting local files.

Production continues to use `bundle exec jekyll build` with `_config.yml` only:
`test_environment` defaults to `false`. Do not use `_config.test.yml` or copy
a test export into the production deployment. Always build production afresh
from the sources. The test flag is independent of page layout and branch name,
so merging these sources does not enable the test directive in production.

The test hosting URL is not configured here. Existing root-relative asset and
navigation URLs still require appropriate hosting at the domain root; a GitHub
Pages project subpath needs a separate URL/base-path review once its URL is known.

### Deploy to the sibling test repository

Run `./deploy-testpage.sh` on `fb_update-2027`. It builds in a temporary directory
inside this project, validates the test output, then mirrors the artifacts into
`../mw-testpage`, commits changes and pushes its currently checked-out branch to
`origin`. No branch is created or switched. Git metadata is preserved; obsolete
artifacts in the test repository are removed. The target must be clean before
starting. The regular `_site` and the production deployment script are untouched.
