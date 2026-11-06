# Agent instructions

After every change in this repository, save it in git and publish it.

1. Commit the change to the local repository on the current branch.
2. Push that commit to the remote repository (`origin`).

Do this for every completed change, including small fixes. Do not leave finished work uncommitted or unpushed.

## Commit and push

- Review `git status` and `git diff` before committing.
- Stage only the files that belong to the change.
- Write a short commit message that explains why the change was made.
- Push with `git push` to the tracked remote branch. Use `git push -u origin HEAD` only when the branch has no upstream yet.
- If the push is rejected, pull or rebase safely, then push again. Do not force-push unless the user explicitly asks.

## Never commit

- `.env` and any other env files with real keys
- `serviceAccountKey.json`, private keys, API tokens, or other credentials
- `node_modules`, `.next`, and other generated output

If a change only touches secrets, do not commit those files. Tell the user they were left untracked.
