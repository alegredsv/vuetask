<?php

namespace AlegreBill\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class BankAccount extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'name','account','agency','bank_id'
    ];

    /**
     *
     */
    public function bank(){
        $this->belongsTo(Bank::class);
    }

}
