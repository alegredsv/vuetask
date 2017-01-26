<?php

namespace AlegreBill\Presenters;

use AlegreBill\Transformers\BankTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class BankPresenter
 *
 * @package namespace AlegreBill\Presenters;
 */
class BankPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new BankTransformer();
    }
}
