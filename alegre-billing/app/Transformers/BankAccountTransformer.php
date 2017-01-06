<?php

namespace AlegreBill\Transformers;

use League\Fractal\TransformerAbstract;
use AlegreBill\Models\BankAccount;

/**
 * Class BankAccountTransformer
 * @package namespace AlegreBill\Transformers;
 */
class BankAccountTransformer extends TransformerAbstract
{

    /**
     * Transform the \BankAccount entity
     * @param \BankAccount $model
     *
     * @return array
     */
    public function transform(BankAccount $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
