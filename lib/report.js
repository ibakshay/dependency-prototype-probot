const report = async (github, owner, repo, sha, state, blockers) => {


    let description = ''
    switch (state) {
        case 'success':
            description = 'Ready to be merged'
            break

        case 'failure':
            description = `Blocked by ${blockers.map(i => '#' + i).join()}`
            break

        default:
            description = 'Checking dependency states'
            break
    }

    github.repos.createStatus({
        owner,
        repo,
        context: 'dep',
        description,
        state,
        sha
    })
}

module.exports = report