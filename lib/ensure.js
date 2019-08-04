// import {
//     Context
// } from "probot";

const metadata = require('probot-metadata')

const ensure = async (context, command) => {
    //console.log('Hi, it is ENSURE')
    console.log('my arguments are:', command.arguments)
    // if (!context.payload.issue.pull_request) {
    //     return
    // }


    // 2. Match issue numbers
    const issues = (command.arguments.match(/#(\d+)(?=\s*)/g) || []).map(
        i => Number(i.slice(1)) // Removes '#' prefix
    );
    console.log("issues" + issues)


    try {

        // 3. Set dependencies (override!)
        const response = await metadata(context).set('dependencies', issues);
        console.log(response)

        // 4. Extract necessary info
        const info = {
            owner: context.payload.repository.owner.login,
            repo: context.payload.repository.name,
            number: context.payload.issue.number
        };

        return issues.length > 0 ?
            context.github.issues.addLabels({
                ...info,
                labels: ['dependent']
            }) :
            context.github.issues.removeLabel({
                ...info,
                name: 'dependent'
            });

    } catch (e) {

        console.log(e)

    }

}

module.exports = ensure