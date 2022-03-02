import { Ac, Tx } from './interfaces'
import { isAddress, isTxid } from './utilities'

function simulate(this: any, payload: any) {
  if (this._destroyed)
    throw new Error(
      'The WebSocket instance has been destroyed, re-initialize to continue making requests.'
    )

  if (payload) {
    // send payload to server
  } else {
    throw new Error(
      `Error trying to simulate ${payload}`
    )
  }
}

export default simulate