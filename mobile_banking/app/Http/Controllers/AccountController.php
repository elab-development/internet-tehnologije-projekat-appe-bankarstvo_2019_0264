<?php

namespace App\Http\Controllers;

use App\Http\Resources\Account\AccountCollection;
use App\Http\Resources\Account\AccountResource;
use App\Models\Account;
use App\Models\Type;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $accounts = Account::all();
        return response()->json(new AccountCollection($accounts));
    }

    public function pagination($page)
    {
        $pageSize = 5;
        $accounts = Account::paginate($pageSize, ['*'], 'page', $page);
        return response()->json(new AccountCollection($accounts));
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
            'number' =>  'required|string|max:20|unique:accounts',
            'balance' =>  'required|numeric|min:0.1|max:1000000',
            'currency' =>  'required|string|max:3',
            'user_id' =>  'required|integer|max:255',
            'type_id' =>  'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $type = Type::find($request->type_id);
        if (is_null($type)) {
            return response()->json('Type not found', 404);
        }

        $user = User::find($request->user_id);
        if (is_null($user)) {
            return response()->json('User not found', 404);
        }

        $account = Account::create([
            'number' => $request->number,
            'balance' => $request->balance,
            'currency' => $request->currency,
            'user_id' => $request->user_id,
            'type_id' => $request->type_id,
        ]);

        return response()->json([
            'Account created' => new AccountResource($account)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function show($account_id)
    {
        $account = Account::find($account_id);
        if (is_null($account)) {
            return response()->json('Account not found', 404);
        }
        return response()->json(new AccountResource($account));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function edit(Account $account)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Account $account)
    {
        $validator = Validator::make($request->all(), [
            'number' =>  'required|string|max:20',
            'balance' =>  'required|numeric|min:0.1|max:1000000',
            'currency' =>  'required|string|max:3',
            'user_id' =>  'required|integer|max:255',
            'type_id' =>  'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $type = Type::find($request->type_id);
        if (is_null($type)) {
            return response()->json('Type not found', 404);
        }

        $user = User::find($request->user_id);
        if (is_null($user)) {
            return response()->json('User not found', 404);
        }

        $account->number = $request->number;
        $account->balance = $request->balance;
        $account->currency = $request->currency;
        $account->user_id = $request->user_id;
        $account->type_id = $request->type_id;

        $account->save();

        return response()->json([
            'Account updated' => new AccountResource($account)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function destroy(Account $account)
    {
        $account->delete();
        return response()->json('Account deleted');
    }
}
