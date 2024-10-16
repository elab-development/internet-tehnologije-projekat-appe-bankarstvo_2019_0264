<?php

namespace App\Http\Resources\Transaction;

use App\Http\Resources\Account\AccountResource;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'amount' => $this->resource->amount,
            'description' => $this->resource->description,
            'receiver' => $this->resource->receiver,
            'account' => new AccountResource($this->resource->account),
        ];
    }
}
