#!/usr/bin/env node

const { ArgumentParser } = require('argparse')

const { version } = require('../package.json')

const inGFW = require('../')

async function main (args) {

  const gfw = await inGFW()
  
  if (gfw) {
    if (!args.quite) {
      console.info('in-gfw: YES')
    }
    return 0
  } else {
    if (!args.quite) {
        console.info('in-gfw: NO')
      }
      return 1
  }

}

function parseArguments () {
  const parser = new ArgumentParser({
    addHelp     : true,
    description : 'Identify current location is located in mainland China.',
    epilog      : `Exmaple: in-gfw`,
    prog        : 'in-gfw',
    version,
  })

  parser.addArgument(
    [ '-q', '--quite' ],
    {
      help: 'Quite mode',
      action: 'storeConst',
      constant: true,
      defaultValue: false,
      dest: 'quite',
    },
  )

  return parser.parseArgs()
}

main(parseArguments())
  .then(process.exit)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
