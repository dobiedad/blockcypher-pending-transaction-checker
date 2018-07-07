const axios = require("axios");

class BlockcypherPendingTransactionChecker {
  constructor({
    address,
    amountToRecieve,
    callback,
    ticker,
    refreshInMilliseconds
  }) {
    this._address = address;
    this._ammountToReceive = amountToRecieve;
    this._callback = callback;
    this._ticker = ticker.toLowerCase();
    this._refreshInMilliseconds = refreshInMilliseconds;
    this._transactionVerified = false;

    const loadWallet = () => {
      httpism
        .get(
          `https://api.blockcypher.com/v1/${this._ticker}/main/addrs/${
            this._address
          }`
        )
        .then(res => {
          const data = res.data;
          const pendingTransactionMatchingValue = this.getTransactionMatchingValue(
            data.unconfirmed_txrefs,
            amountToRecieve
          );

          this._transactionVerified = this.getTransactionMatchingValue(
            data.txrefs,
            amountToRecieve
          );

          let response = {
            wallet: {
              address: data.address,
              total_received: data.total_received,
              total_sent: data.total_sent,
              balance: data.balance,
              unconfirmed_balance: data.unconfirmed_balance,
              final_balance: data.final_balance,
              n_tx: data.n_tx,
              unconfirmed_transaction_count: data.unconfirmed_n_tx
            },
            confirmed_transactions: data.txrefs
          };

          if (pendingTransactionMatchingValue) {
            response.pending_transaction = {
              value: pendingTransactionMatchingValue[0].value,
              received: pendingTransactionMatchingValue[0].received,
              txHash: pendingTransactionMatchingValue[0].tx_hash,
              preference: pendingTransactionMatchingValue[0].preference,
              confirmations: pendingTransactionMatchingValue[0].confirmations
            };
          }

          if (!this._transactionVerified && pendingTransactionMatchingValue) {
            this._callback({ finished: false, data: response });
            return setTimeout(function() {
              loadWallet(address);
            }, refreshInMilliseconds);
          }

          this._callback({ finished: true, data: response });
        })
        .catch(e => this._callback({ finished: true, data: null, error: e }));
    };

    return loadWallet();
  }

  getTransactionMatchingValue(transactions, amountToRecieve) {
    return (
      transactions &&
      transactions.filter(transaction => transaction.value === amountToRecieve)
    );
  }
}
