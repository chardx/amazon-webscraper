# Agent instructions

After every change in this repository, save it in git and publish it.

1. Commit the change to the local repository on the current branch.
2. Push that commit to the remote repository (`origin`).

Do this for every completed change, including small fixes. Do not leave finished work uncommitted or unpushed.

## Commit and push

- Review `git status` and `git diff` before committing.
- Stage only the files that belong to the change.
- Start every commit message with one action prefix, then a short explanation of why:
  - `add:` a new feature or file
  - `fix:` a bug
  - `update:` a change to existing behavior or instructions
  - `refactor:` a restructure that keeps the same behavior
  - `docs:` documentation only
  - `chore:` tooling, config, or dependencies
- Example: `fix: save Bright Data results so the search page can render them`
- Push with `git push` to the tracked remote branch. Use `git push -u origin HEAD` only when the branch has no upstream yet.
- If the push is rejected, pull or rebase safely, then push again. Do not force-push unless the user explicitly asks.

## Never commit

- `.env` and any other env files with real keys
- `serviceAccountKey.json`, private keys, API tokens, or other credentials
- `node_modules`, `.next`, and other generated output

If a change only touches secrets, do not commit those files. Tell the user they were left untracked.

## Explain the change

The user is learning Next.js and already knows React with Vite. After each code change, end the reply with a short lesson about that change. Cover:

- Which libraries were involved, and what each one is for
- What changed in the app, in plain language
- The Next.js idea behind it, such as the App Router, a client component, or an API route
- The Vite equivalent, when there is one: React Router, a client-only component, `import.meta.env`, or a separate API server
- What to look at next if they want to understand this part of the framework

Keep the lesson tied to the files just edited. Do not turn it into a general Next.js tutorial. Assume React itself is familiar. Explain only the Next.js parts that Vite does not have.
