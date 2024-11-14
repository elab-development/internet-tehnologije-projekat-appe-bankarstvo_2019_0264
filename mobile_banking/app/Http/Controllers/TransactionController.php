<?php

namespace App\Http\Controllers;

use App\Exports\TransactionExport;
use App\Http\Resources\Transaction\TransactionCollection;
use App\Http\Resources\Transaction\TransactionResource;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use CSV;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transactions = Transaction::all();
        return response()->json(new TransactionCollection($transactions));
    }

    public function pagination($page)
    {
        $pageSize = 5;
        $transactions = Transaction::paginate($pageSize, ['*'], 'page', $page);
        return response()->json(new TransactionCollection($transactions));
    }

    public function exportCSV()
    {
        return CSV::download(new TransactionExport, 'transactions.csv');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' =>  'required|numeric|min:0.1|max:1000000',
            'description' =>  'required|string|max:255',
            'receiver' =>  'required|string|max:20',
            'account_id' =>  'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $account = Account::find($request->account_id);
        if (is_null($account)) {
            return response()->json('Account not found', 404);
        }

        $account->balance += $request->amount;
        $account->save();

        $transaction = Transaction::create([
            'amount' => $request->amount,
            'description' => $request->description,
            'receiver' => $request->receiver,
            'account_id' => $request->account_id,
        ]);

        return response()->json([
            'Transaction created' => new TransactionResource($transaction)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show($transaction_id)
    {
        $transaction = Transaction::find($transaction_id);
        if (is_null($transaction)) {
            return response()->json('Transaction not found', 404);
        }
        return response()->json(new TransactionResource($transaction));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $transaction)
    {
        $validator = Validator::make($request->all(), [
            'amount' =>  'required|numeric|min:0.1|max:1000000',
            'description' =>  'required|string|max:255',
            'receiver' =>  'required|string|max:20',
            'account_id' =>  'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $account = Account::find($request->account_id);
        if (is_null($account)) {
            return response()->json('Account not found', 404);
        }

        $account->balance += $request->amount;
        $account->save();

        $transaction->amount = $request->amount;
        $transaction->description = $request->description;
        $transaction->receiver = $request->receiver;
        $transaction->account_id = $request->account_id;

        $transaction->save();

        return response()->json([
            'Transaction updated' => new TransactionResource($transaction)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return response()->json('Transaction deleted');
    }
}
