<?php

namespace AlegreBill\Transformers;

use League\Fractal\TransformerAbstract;
use AlegreBill\Models\Bank;

/**
 * Class BankTransformer
 * @package namespace AlegreBill\Transformers;
 */
class BankTransformer extends TransformerAbstract
{

    /**
     * Transform the \Bank entity
     * @param \Bank $model
     *
     * @return array
     */
    public function transform(Bank $model)
    {
        return [
            'id'         => (int) $model->id,
            'name'         =>  $model->name,
            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
