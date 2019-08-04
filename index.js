/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
const command = require('probot-commands')

const ensure = require('./lib/ensure')
const test = require('./lib/test')
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  // app.on('issues.opened', async context => {
  //   const issueComment = context.issue({
  //     body: 'Thanks for opening this issue!'
  //   })
  //   return context.github.issues.createComment(issueComment)
  // })

  command(app, 'depends', ensure)
  command(app, 'signed', ensure)

  // ...
  app.on('pull_request.opened', test)
  app.on('pull_request.reopened', test)
  app.on('pull_request.synchronize', test)
  // ...

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}