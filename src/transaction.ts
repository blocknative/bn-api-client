import { createEmitter } from './utilities'
import { Emitter, TransactionLog, TransactionHandler } from './interfaces'
import { validateTransaction } from './validation'

function transaction(this: any, hash: string, id?: string) {
  validateTransaction(hash, id)

  // create startTime for transaction
  const startTime: number = Date.now()

  // create emitter for transaction
  const emitter: Emitter = createEmitter()

  // create eventCode for transaction
  const eventCode = 'txSent'

  // put in queue
  this._watchedTransactions.push({
    hash,
    emitter
  })

  const transaction: TransactionLog = {
    hash,
    id: id || hash,
    startTime,
    status: 'sent'
  }

  const newState = {
    ...transaction,
    eventCode
  }

  // logEvent to server
  this._sendMessage({
    eventCode,
    categoryCode: 'activeTransaction',
    transaction
  })

  const transactionObj = {
    details: transaction,
    emitter
  }

  function emitState(this: any) {
    const emitterResult = emitter.emit(newState)
    this._transactionHandlers.forEach((handler: TransactionHandler) =>
      handler({ transaction: newState, emitterResult })
    )
  }

  // emit after delay to allow for listener to be registered
  setTimeout(emitState.bind(this), 5)

  return transactionObj
}

export default transaction
