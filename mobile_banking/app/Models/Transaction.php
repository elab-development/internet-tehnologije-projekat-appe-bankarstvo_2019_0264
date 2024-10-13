<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'description',
        'receiver',
        'account_id',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public static function getAllTransactions()
    {
        $result = DB::table('transactions')
            ->select('id', 'amount', 'description', 'receiver', 'account_id')
            ->get()->toArray();
        return $result;
    }
}
