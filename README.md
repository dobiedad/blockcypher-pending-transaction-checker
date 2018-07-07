# Blockcypher Pending Transaction Checker

## Install

`yarn add blockcypher-pending-transaction-checker`

## Usage

```
// in satoshi's, 0.00715387 BTC = 715387
const amountToRecieve = 715387;

// Refresh every 10 seconds
const refreshInMilliseconds = 10000;
```

```
new BlockcypherPendingTransactionChecker({
  ticker: "btc",
  address: "3Nuuc2fcDoHx2uMR9f3Bpe5mdM267MmbTR",
  amountToRecieve,
  refreshInMilliseconds,
  callback: data => {
    console.log(JSON.stringify(data, null, 2));
  }
})
```

## Unconfirmed Response

```
{
  "finished": false,
  "data": {
    "wallet": {
      "address": "3Nuuc2fcDoHx2uMR9f3Bpe5mdM267MmbTR",
      "total_received": 0,
      "total_sent": 0,
      "balance": 0,
      "unconfirmed_balance": 715387,
      "final_balance": 715387,
      "n_tx": 0,
      "unconfirmed_transaction_count": 1
    },
    "pending_transaction": {
      "value": 715387,
      "received": "2018-07-07T09:16:50.923Z",
      "txHash": "efcc03f156e208488d5fe7f549c6a7113e975293f65697b9d07d3e5279d9dcd2",
      "preference": "low",
      "confirmations": 0
    }
  }
}
```

## Confirmed Response

```
{
  "finished": true,
  "data": {
    "wallet": {
      "address": "3Nuuc2fcDoHx2uMR9f3Bpe5mdM267MmbTR",
      "total_received": 715387,
      "total_sent": 0,
      "balance": 715387,
      "unconfirmed_balance": 0,
      "final_balance": 715387,
      "n_tx": 1,
      "unconfirmed_transaction_count": 0
    },
    "confirmed_transactions": [
      {
        "tx_hash": "efcc03f156e208488d5fe7f549c6a7113e975293f65697b9d07d3e5279d9dcd2",
        "block_height": 530862,
        "tx_input_n": -1,
        "tx_output_n": 0,
        "value": 715387,
        "ref_balance": 715387,
        "spent": false,
        "confirmations": 1,
        "confirmed": "2018-07-07T09:41:40Z",
        "double_spend": false
      }
    ]
  }
}
```
