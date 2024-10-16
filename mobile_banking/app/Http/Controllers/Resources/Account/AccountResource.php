<?php

namespace App\Http\Resources\Account;

use App\Http\Resources\Type\TypeResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
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
            'number' => $this->resource->number,
            'balance' => $this->resource->balance,
            'currency' => $this->resource->currency,
            'type' => new TypeResource($this->resource->type),
            'user' => new UserResource($this->resource->user),
        ];
    }
}
