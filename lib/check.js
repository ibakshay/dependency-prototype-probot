const metadata = require('probot-metadata');

const report = require('./report');

const check = async (github, owner, repo, sha, deps) => {

    await report(github, owner, repo, sha, 'pending')

    let pass = true
    let blockers = []

    for (const number of deps) {
        const issue = await github.issues.get({
            owner,
            repo,
            number
        })

        if (issue.data.state === 'open') {
            pass = false
            blockers.push(number)
        }

    }
    console.log(pass)

    report(github, owner, repo, sha, pass ? 'success' : 'failure', blockers)

}

module.exports = check;